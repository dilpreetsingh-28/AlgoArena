import React, { useState, useEffect } from "react";
import Topbar from "@/components/topbar/topbar";
import Footer from "@/components/footer/footer";
import { FaChevronUp, FaChevronDown } from "react-icons/fa"; // Voting icons
import { firestore, auth } from "@/firebase/firebase"; // Firebase setup
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  onSnapshot,
  orderBy,
  updateDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth"; // For Firebase Auth

// Define the user type
interface User {
  uid: string;
  displayName: string;
  email: string;
}

// Define the comment type
interface Comment {
  id: string;
  content: string;
  authorId: string;
  authorName: string;
  timestamp: { seconds: number };
  votes: number;
  upvotedBy: string[]; // Track users who upvoted
  downvotedBy: string[]; // Track users who downvoted
  replies?: Reply[]; // Optional replies array
}

// Define the reply type
interface Reply {
  id: string;
  content: string;
  authorId: string;
  authorName: string;
  parentCommentId: string;
  timestamp: { seconds: number };
}

const Discuss: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]); // Define the state with Comment[] type
  const [newComment, setNewComment] = useState(""); // New comment input
  const [replyContent, setReplyContent] = useState(""); // New reply input
  const [activeReplyCommentId, setActiveReplyCommentId] = useState<
    string | null
  >(null); // For showing reply box
  const [user, setUser] = useState<User | null>(null); // User data from Firebase Auth
  const [replies, setReplies] = useState<{ [key: string]: Reply[] }>({}); // Store replies by comment ID
  const [loading, setLoading] = useState(true); // For tracking loading state

  // Fetch the user info automatically when the component mounts
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // If the user is logged in, update the state with their information
        setUser({
          uid: user.uid,
          displayName: user.displayName || "Anonymous", // Use "Anonymous" if no displayName
          email: user.email || "Unknown",
        });
      } else {
        // If no user is logged in, set user to null
        setUser(null);
      }
    });
    return () => unsubscribe(); // Cleanup the listener on unmount
  }, []);

  // Fetch comments and listen for real-time updates
  useEffect(() => {
    const q = query(
      collection(firestore, "comments"),
      orderBy("timestamp", "desc")
    );

    const unsubscribe = onSnapshot(q, async (snapshot) => {
      // Fetch comments and their authors
      const fetchedComments = await Promise.all(
        snapshot.docs.map(async (doc) => {
          const data = doc.data();
          const authorName = await fetchUserDisplayName(data.authorId); // Get the displayName
          return {
            id: doc.id,
            ...data,
            authorName, // Include the resolved authorName
          } as Comment;
        })
      );

      setComments(fetchedComments); // Ensure state updates with the new comments
      setLoading(false); // Stop loading once data is fetched
    });

    return unsubscribe; // Cleanup listener on unmount
  }, []);

  // Fetch user display name by uid
  const fetchUserDisplayName = async (uid: string) => {
    try {
      const userQuerySnapshot = await getDocs(
        query(collection(firestore, "users"), where("uid", "==", uid))
      );

      if (!userQuerySnapshot.empty) {
        const userDoc = userQuerySnapshot.docs[0].data();
        return userDoc.displayName;
      } else {
        console.warn(`No user found with uid: ${uid}`);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
    return "Anonymous"; // Default value
  };

  // Fetch replies for a comment
  const fetchReplies = async (commentId: string) => {
    const q = query(
      collection(firestore, "replies"),
      where("parentCommentId", "==", commentId),
      orderBy("timestamp", "asc")
    );

    const querySnapshot = await getDocs(q);

    // Resolve `authorName` for each reply
    const fetchedReplies = await Promise.all(
      querySnapshot.docs.map(async (doc) => {
        const data = doc.data();
        const authorName = await fetchUserDisplayName(data.authorId); // Fetch the displayName
        return {
          id: doc.id,
          ...data,
          authorName, // Include the resolved authorName
        } as Reply;
      })
    );

    // Update the replies state with the fetched replies
    setReplies((prevReplies) => ({
      ...prevReplies,
      [commentId]: fetchedReplies,
    }));
  };

  // Add a new comment
  const postComment = async () => {
    if (!newComment || !user) return;

    const newCommentData = {
      content: newComment,
      authorId: user.uid,
      authorName: user.displayName || "Anonymous", // Store displayName
      timestamp: serverTimestamp(),
      votes: 0,
      upvotedBy: [],
      downvotedBy: [],
    };

    await addDoc(collection(firestore, "comments"), newCommentData);
    setNewComment(""); // Clear input
  };

  // Post a reply to a specific comment
  const postReply = async (parentCommentId: string) => {
    if (!replyContent || !user) return;

    const newReply = {
      content: replyContent,
      authorId: user.uid,
      authorName: user.displayName || "Anonymous", // Store displayName
      parentCommentId,
      timestamp: serverTimestamp(),
    };

    await addDoc(collection(firestore, "replies"), newReply);
    setReplyContent(""); // Clear reply input
    setActiveReplyCommentId(null); // Close reply box
    fetchReplies(parentCommentId); // Fetch the updated replies for the comment
  };

  // Handle voting
  const handleVote = async (id: string, voteType: "up" | "down") => {
    if (!user) return; // Ensure user is logged in before voting

    const commentRef = doc(firestore, "comments", id);
    const comment = comments.find((c) => c.id === id);
    if (!comment) return;

    let updatedVotes = comment.votes;
    const updatedUpvotedBy = comment.upvotedBy ? [...comment.upvotedBy] : []; // Ensure upvotedBy is an array
    const updatedDownvotedBy = comment.downvotedBy
      ? [...comment.downvotedBy]
      : []; // Ensure downvotedBy is an array

    if (voteType === "up") {
      // If the user has already downvoted, cancel the downvote first
      if (updatedDownvotedBy.includes(user.uid)) {
        updatedDownvotedBy.splice(updatedDownvotedBy.indexOf(user.uid), 1);
        updatedVotes += 1; // Revert downvote
      }
      // If the user hasn't upvoted yet, add an upvote
      if (!updatedUpvotedBy.includes(user.uid)) {
        updatedUpvotedBy.push(user.uid);
        updatedVotes += 1;
      }
    } else if (voteType === "down") {
      // If the user has already upvoted, cancel the upvote first
      if (updatedUpvotedBy.includes(user.uid)) {
        updatedUpvotedBy.splice(updatedUpvotedBy.indexOf(user.uid), 1);
        updatedVotes -= 1; // Revert upvote
      }
      // If the user hasn't downvoted yet, add a downvote
      if (!updatedDownvotedBy.includes(user.uid)) {
        updatedDownvotedBy.push(user.uid);
        updatedVotes -= 1;
      }
    }

    await updateDoc(commentRef, {
      votes: updatedVotes,
      upvotedBy: updatedUpvotedBy,
      downvotedBy: updatedDownvotedBy,
    });
  };

  return (
    <>
      <Topbar />
      <div className="bg-gradient-to-b from-white to-teal-100 min-h-screen">
        <div className="max-w-4xl mx-auto py-12 px-4">
          {/* Page Title */}
          <h1 className="text-4xl font-extrabold text-center text-teal-600 mb-10">
            Join the Discussion
          </h1>

          {/* New comment input */}
          <div className="flex flex-col space-y-4 mb-8">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Share your thoughts..."
              rows={5}
              className="border-2 border-gray-300 p-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <button
              onClick={postComment}
              disabled={!newComment || !user}
              className="bg-teal-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-white hover:text-turquoise hover:border-turquoise bg-turquoise"
            >
              Post Comment
            </button>
          </div>

          {/* Loading state */}
          {loading ? (
            <div className="text-center text-lg text-teal-500">Loading...</div>
          ) : (
            <div className="space-y-8">
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold">{comment.content}</h3>
                    <div className="text-sm text-gray-500">
                      {comment.timestamp
                        ? new Date(
                            comment.timestamp.seconds * 1000
                          ).toLocaleString()
                        : "Timestamp not available"}
                    </div>
                  </div>
                  <p className="mt-2 text-gray-700">{comment.authorName}</p>

                  {/* Voting Section */}
                  <div className="flex items-center space-x-4 mt-4">
                    <button
                      onClick={() => handleVote(comment.id, "up")}
                      className="text-teal-500 hover:text-teal-700 transition-colors"
                    >
                      <FaChevronUp />
                    </button>
                    <span className="text-lg">{comment.votes}</span>
                    <button
                      onClick={() => handleVote(comment.id, "down")}
                      className="text-teal-500 hover:text-teal-700 transition-colors"
                    >
                      <FaChevronDown />
                    </button>
                  </div>

                  {/* Replies Section */}
                  {replies[comment.id]?.map((reply) => (
                    <div
                      key={reply.id}
                      className="mt-4 pl-6 border-l-2 border-gray-300"
                    >
                      <div className="text-sm font-semibold">
                        {reply.authorName}
                      </div>
                      <p className="text-gray-600">{reply.content}</p>
                    </div>
                  ))}

                  {/* Reply Input */}
                  {activeReplyCommentId === comment.id && (
                    <div className="flex flex-col space-y-4 mt-4">
                      <textarea
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        placeholder="Write a reply..."
                        rows={3}
                        className="border-2 border-gray-300 p-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                      <button
                        onClick={() => postReply(comment.id)}
                        disabled={!replyContent || !user}
                        className="bg-teal-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-white hover:text-turquoise hover:border-turquoise bg-turquoise"
                      >
                        Post Reply
                      </button>
                    </div>
                  )}

                  {/* Show Reply Input */}
                  {!activeReplyCommentId && (
                    <button
                      onClick={() => {
                        setActiveReplyCommentId(comment.id);
                        fetchReplies(comment.id); // Fetch replies when user wants to reply
                      }}
                      className="text-teal-500 hover:text-teal-700 mt-4"
                    >
                      Reply
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Discuss;
