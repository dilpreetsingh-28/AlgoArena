import React, { useEffect, useState } from "react";
import CircleSkeleton from "@/components/Skeletons/CircleSkeleton";
import RectangleSkeleton from "@/components/Skeletons/RectangleSkeleton";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  AiFillLike,
  AiFillDislike,
  AiFillStar,
} from "react-icons/ai";
import { BsCheck2Circle } from "react-icons/bs";
import { TiStarOutline } from "react-icons/ti";
import { DBProblem, Problem } from "@/utils/types/problem";
import { auth, firestore } from "@/firebase/firebase";
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  runTransaction,
  updateDoc,
} from "firebase/firestore";
import toast from "react-hot-toast";
type ProblemDescriptionProps = {
  problem: Problem;
  _solved: boolean;
};

const ProblemDescription: React.FC<ProblemDescriptionProps> = ({ problem, _solved }) => {
  const [user] = useAuthState(auth);
  const { currentProblem, loading, problemDifficultyClass, setCurrentProblem } =
    useGetCurrentProblem(problem.id);
  const { liked, disliked, solved, setData, starred } =
    useGetUsersDataOnProblem(problem.id);
  const [updating, setUpdating] = useState(false);
  const returnUserDataAndProblemData = async (transaction: any) => {
    const userRef = doc(firestore, "users", user!.uid);
    const problemRef = doc(firestore, "problems", problem.id);
    const userDoc = await transaction.get(userRef);
    const problemDoc = await transaction.get(problemRef);
    return { userDoc, problemDoc, userRef, problemRef };
  };

  const handleLike = async () => {
    if (!user) {
      toast.error("You must be logged in to like a problem");
      return;
    }
    if (updating) return;
    setUpdating(true);
    await runTransaction(firestore, async (transaction) => {
      const { problemDoc, userDoc, problemRef, userRef } =
        await returnUserDataAndProblemData(transaction);

      if (userDoc.exists() && problemDoc.exists()) {
        if (liked) {
          // remove problem id from likedProblems on user document, decrement likes on problem document
          transaction.update(userRef, {
            likedProblems: userDoc
              .data()
              .likedProblems.filter((id: string) => id !== problem.id),
          });
          transaction.update(problemRef, {
            likes: problemDoc.data().likes - 1,
          });

          setCurrentProblem((prev) =>
            prev ? { ...prev, likes: prev.likes - 1 } : null
          );
          setData((prev) => ({ ...prev, liked: false }));
        } else if (disliked) {
          transaction.update(userRef, {
            likedProblems: [...userDoc.data().likedProblems, problem.id],
            dislikedProblems: userDoc
              .data()
              .dislikedProblems.filter((id: string) => id !== problem.id),
          });
          transaction.update(problemRef, {
            likes: problemDoc.data().likes + 1,
            dislikes: problemDoc.data().dislikes - 1,
          });

          setCurrentProblem((prev) =>
            prev
              ? { ...prev, likes: prev.likes + 1, dislikes: prev.dislikes - 1 }
              : null
          );
          setData((prev) => ({ ...prev, liked: true, disliked: false }));
        } else {
          transaction.update(userRef, {
            likedProblems: [...userDoc.data().likedProblems, problem.id],
          });
          transaction.update(problemRef, {
            likes: problemDoc.data().likes + 1,
          });
          setCurrentProblem((prev) =>
            prev ? { ...prev, likes: prev.likes + 1 } : null
          );
          setData((prev) => ({ ...prev, liked: true }));
        }
      }
    });
    setUpdating(false);
  };

  const handleDislike = async () => {
    if (!user) {
      toast.error("You must be logged in to dislike a problem");
      return;
    }
    if (updating) return;
    setUpdating(true);
    await runTransaction(firestore, async (transaction) => {
      const { problemDoc, userDoc, problemRef, userRef } =
        await returnUserDataAndProblemData(transaction);
      if (userDoc.exists() && problemDoc.exists()) {
        // already disliked, already liked, not disliked or liked
        if (disliked) {
          transaction.update(userRef, {
            dislikedProblems: userDoc
              .data()
              .dislikedProblems.filter((id: string) => id !== problem.id),
          });
          transaction.update(problemRef, {
            dislikes: problemDoc.data().dislikes - 1,
          });
          setCurrentProblem((prev) =>
            prev ? { ...prev, dislikes: prev.dislikes - 1 } : null
          );
          setData((prev) => ({ ...prev, disliked: false }));
        } else if (liked) {
          transaction.update(userRef, {
            dislikedProblems: [...userDoc.data().dislikedProblems, problem.id],
            likedProblems: userDoc
              .data()
              .likedProblems.filter((id: string) => id !== problem.id),
          });
          transaction.update(problemRef, {
            dislikes: problemDoc.data().dislikes + 1,
            likes: problemDoc.data().likes - 1,
          });
          setCurrentProblem((prev) =>
            prev
              ? { ...prev, dislikes: prev.dislikes + 1, likes: prev.likes - 1 }
              : null
          );
          setData((prev) => ({ ...prev, disliked: true, liked: false }));
        } else {
          transaction.update(userRef, {
            dislikedProblems: [...userDoc.data().dislikedProblems, problem.id],
          });
          transaction.update(problemRef, {
            dislikes: problemDoc.data().dislikes + 1,
          });
          setCurrentProblem((prev) =>
            prev ? { ...prev, dislikes: prev.dislikes + 1 } : null
          );
          setData((prev) => ({ ...prev, disliked: true }));
        }
      }
    });
    setUpdating(false);
  };

  const handleStar = async () => {
    if (!user) {
      toast.error("You must be logged in to star a problem");
      return;
    }
    if (updating) return;
    setUpdating(true);

    if (!starred) {
      const userRef = doc(firestore, "users", user.uid);
      await updateDoc(userRef, {
        starredProblems: arrayUnion(problem.id),
      });
      setData((prev) => ({ ...prev, starred: true }));
    } else {
      const userRef = doc(firestore, "users", user.uid);
      await updateDoc(userRef, {
        starredProblems: arrayRemove(problem.id),
      });
      setData((prev) => ({ ...prev, starred: false }));
    }

    setUpdating(false);
  };

  return (
    <div className="bg-white min-h-screen text-teal-800">
      {/* Tabs */}
      <div className="flex h-12 items-center border-b-2 border-teal-200 bg-white text-teal-600">
        <div className="rounded-t-md px-5 py-2 text-sm font-xl font-bold cursor-pointer border-teal-500">
          Description
        </div>
      </div>

      <div className="flex px-6 py-6 overflow-y-auto mb-4">
        <div className="w-full">
          {/* Problem Heading */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold">{problem.title}</h1>
          </div>
          {!loading && currentProblem && (
            <div className="flex items-center mt-3">
              <div
                className={`${problemDifficultyClass} inline-block rounded-[21px] bg-opacity-[.15] px-2.5 py-1 text-xs font-medium capitalize `}
              >
                {currentProblem.difficulty}
              </div>
              {(solved || _solved) && (
                <div className="rounded p-[3px] ml-4 text-lg transition-colors duration-200 text-green-s text-dark-green-s">
                  <BsCheck2Circle />
                </div>
              )}
              <div
                className="flex items-center cursor-pointer hover:bg-dark-fill-3 space-x-1 rounded p-[3px]  ml-4 text-lg transition-colors duration-200 text-dark-gray-6"
                onClick={handleLike}
              >
                {liked && !updating && 
                <div className='text-dark-blue-s'><AiFillLike />
                </div>}
                {!liked && !updating && 
                <AiFillLike />}
                {updating && (
                  <div
                    style={{
                      width: "20px",
                      height: "20px",
                      border: "2px solid #ccc",
                      borderTop: "2px solid #000",
                      borderRadius: "50%",
                      animation: "spin 1s linear infinite",
                    }}
                  ></div>
                )}

                <span className="text-xs">{currentProblem.likes}</span>
              </div>
              <div
                className="flex items-center cursor-pointer hover:bg-dark-fill-3 space-x-1 rounded p-[3px]  ml-4 text-lg transition-colors duration-200 text-green-s text-dark-gray-6"
                onClick={handleDislike}
              >
                {disliked && !updating && <div className='text-dark-blue-s'><AiFillDislike /></div>}
                {!disliked && !updating && <AiFillDislike />}
                {updating && (
                  <div
                    style={{
                      width: "20px",
                      height: "20px",
                      border: "2px solid #ccc",
                      borderTop: "2px solid #000",
                      borderRadius: "50%",
                      animation: "spin 1s linear infinite",
                    }}
                  ></div>
                )}

                <span className="text-xs">{currentProblem.dislikes}</span>
              </div>
              <div
                className="cursor-pointer hover:bg-dark-fill-3  rounded p-[3px]  ml-4 text-xl transition-colors duration-200 text-green-s text-dark-gray-6 "
                onClick={handleStar}
              >
                {starred && !updating && <div className='text-dark-yellow'><AiFillStar /></div>}
                {!starred && !updating && <TiStarOutline />}
                {updating && (
                  <div
                    style={{
                      width: "20px",
                      height: "20px",
                      border: "2px solid #ccc",
                      borderTop: "2px solid #000",
                      borderRadius: "50%",
                      animation: "spin 1s linear infinite",
                    }}
                  ></div>
                )}
              </div>
            </div>
          )}
          {loading && (
            <div className="mt-3 flex space-x-2">
              <RectangleSkeleton />
              <CircleSkeleton />
              <RectangleSkeleton />
              <RectangleSkeleton />
              <CircleSkeleton />
            </div>
          )}
          {/* Problem Statement */}
          <div className="text-teal-900 text-base leading-relaxed">
            <div
              dangerouslySetInnerHTML={{ __html: problem.problemStatement }}
            />
          </div>

          {/* Examples */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Examples</h2>
            {/* Example 1 */}
            {problem.examples.map((example, index) => (
              <div key={example.id}>
                <p className="font-medium mb-2">Example {index + 1}: </p>
                {example.img && (
                  <img src={example.img} alt="" className="mt-3 mb-3" />
                )}
                <div className="example-card p-4 rounded-lg bg-teal-50 border border-teal-200">
                  <pre className="text-sm sm:text-base whitespace-normal break-words">
                    <span className="text-turquoise font-bold">Input:</span>
                    <span className="text-turquoise">{example.inputText}</span>
                    <br />
                    <span className="text-turquoise font-bold">Output:</span>
                    <span className="text-turquoise">{example.outputText}</span>
                    <br />
                    {example.explanation && (
                      <>
                        <span className="text-turquoise font-bold">
                          Explanation:
                        </span>
                        <span className="text-turquoise">
                          {example.explanation}
                        </span>
                      </>
                    )}
                  </pre>
                </div>
              </div>
            ))}
          </div>

          {/* Constraints */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4">Constraints</h2>
            <div dangerouslySetInnerHTML={{ __html: problem.constraints }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemDescription;

function useGetCurrentProblem(problemId: string) {
  const [currentProblem, setCurrentProblem] = useState<DBProblem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [problemDifficultyClass, setProblemDifficultyClass] =
    useState<string>("");

  useEffect(() => {
    // Get problem from DB
    const getCurrentProblem = async () => {
      setLoading(true);
      const docRef = doc(firestore, "problems", problemId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const problem = docSnap.data();
        setCurrentProblem({ id: docSnap.id, ...problem } as DBProblem);
        // easy, medium, hard
        setProblemDifficultyClass(
          problem.difficulty === "Easy"
            ? "bg-olive text-olive"
            : problem.difficulty === "Medium"
            ? "bg-dark-yellow text-dark-yellow"
            : " bg-dark-pink text-dark-pink"
        );
      }
      setLoading(false);
    };
    getCurrentProblem();
  }, [problemId]);

  return { currentProblem, loading, problemDifficultyClass, setCurrentProblem };
}

function useGetUsersDataOnProblem(problemId: string) {
  const [data, setData] = useState({
    liked: false,
    disliked: false,
    starred: false,
    solved: false,
  });
  const [user] = useAuthState(auth);

  useEffect(() => {
    const getUsersDataOnProblem = async () => {
      const userRef = doc(firestore, "users", user!.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const data = userSnap.data();
        const {
          solvedProblems,
          likedProblems,
          dislikedProblems,
          starredProblems,
        } = data;
        setData({
          liked: likedProblems.includes(problemId), // likedProblems["two-sum","jump-game"]
          disliked: dislikedProblems.includes(problemId),
          starred: starredProblems.includes(problemId),
          solved: solvedProblems.includes(problemId),
        });
      }
    };

    if (user) getUsersDataOnProblem();
    return () =>
      setData({ liked: false, disliked: false, starred: false, solved: false });
  }, [problemId, user]);

  return { ...data, setData };
}
