import React from 'react';
import { useState, useEffect } from "react";
import PreferenceNav from './PreferenceNav/PreferenceNav';
import Split from 'react-split';
import CodeMirror from '@uiw/react-codemirror';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { javascript } from '@codemirror/lang-javascript';
import EditorFooter from "./EditorFooter";
import styles from "./index.module.css";
import { Problem } from "@/utils/types/problem";
import { toast } from "react-hot-toast";
import { problems } from "@/utils/problems";
import useLocalStorage from '@/utils/hooks/useLocalStorage';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore } from '@/firebase/firebase';
import { useRouter } from 'next/router';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
type PlaygroundProps = {
  problem: Problem;
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
	setSolved: React.Dispatch<React.SetStateAction<boolean>>;
};
export interface ISettings {
	fontSize: string;
	settingsModalIsOpen: boolean;
	dropdownIsOpen: boolean;
}
const Playground: React.FC<PlaygroundProps> = ({ problem, setSuccess, setSolved }) => {
  const [activeTestCaseId, setActiveTestCaseId] = useState<number>(0);
	// eslint-disable-next-line prefer-const
	let [userCode, setUserCode] = useState<string>(problem.startercode);

	const [fontSize] = useLocalStorage("lcc-fontSize", "16px");

	const [settings, setSettings] = useState<ISettings>({
		fontSize: fontSize,
		settingsModalIsOpen: false,
		dropdownIsOpen: false,
	});

	const [user] = useAuthState(auth);
	const {
		query: { pid },
	} = useRouter();
  const handleSubmit = async () => {
		if (!user) {
			toast.error("Please login to submit your code");
			return;
		}
		try {
			userCode = userCode.slice(userCode.indexOf(problem.starterFunctionName));
			const cb = new Function(`return ${userCode}`)();
			const handler = problems[pid as string].handlerFunction;

			if (typeof handler === "function") {
				const success = handler(cb);
				if (success) {
					toast.success("Congrats! All tests passed!");
					setSuccess(true);
					setTimeout(() => {
						setSuccess(false);
					}, 4000);

					const userRef = doc(firestore, "users", user.uid);
					await updateDoc(userRef, {
						solvedProblems: arrayUnion(pid),
					});
					setSolved(true);
				}
			}
		} catch (error: any) {
			console.log(error.message);
			if (
				error.message.startsWith("AssertionError [ERR_ASSERTION]: Expected values to be strictly deep-equal:")
			) {
				toast.error("Oops! One or more test cases failed");
			} else {
				toast.error(error.message);
			}
		}
	};
  useEffect(() => {
		const code = localStorage.getItem(`code-${pid}`);
		if (user) {
			setUserCode(code ? JSON.parse(code) : problem.startercode);
		} else {
			setUserCode(problem.startercode);
		}
	}, [pid, user, problem.startercode]);

	const onChange = (value: string) => {
		setUserCode(value);
		localStorage.setItem(`code-${pid}`, JSON.stringify(value));
	};
  return (
    <div className="flex flex-col bg-white relative">
      <PreferenceNav settings={settings} setSettings={setSettings}/>
      <Split
        className="h-[calc(100vh-94px)]"
        direction="vertical"
        sizes={[60, 40]}
        minSize={60}
      >
        {/* CodeMirror Section */}
        <div className="w-full overflow-auto bg-white">
          <CodeMirror
            value={problem.startercode}
            theme={vscodeDark}
            onChange={onChange}
            extensions={[javascript()]}
            style={{ fontSize: 16, backgroundColor: "white" }} 
            className={styles.cmTheme} 
          />
        </div>

        {/* Test Cases Section */}
        <div className="w-full px-5 overflow-auto" style={{ maxHeight: 'calc(100% - 50px)', overflowY: 'auto' }}>
          {/* Testcase Heading */}
          <div className="flex h-10 items-center space-x-6">
            <div className="relative flex h-full flex-col justify-center cursor-pointer">
              <div className="text-sm font-medium leading-5 text-black">
                Testcases
              </div>
              <hr className="absolute bottom-0 h-0.5 w-full rounded-full border-none bg-black" />
            </div>
          </div>

          {/* Test Cases */}
          <div className="flex">
            {/* Case 1 */}
            {problem.examples.map((example, index) => (
							<div
								className='mr-2 items-start mt-2 text-white'
								key={example.id}
								onClick={() => setActiveTestCaseId(index)}
							>
								<div className='flex flex-wrap items-center gap-y-4'>
									<div
										className={`font-medium items-center transition-all focus:outline-none inline-flex hover:bg-dark-fill-2 hover:text-turquoise hover:border-2  hover:border-turquoise relative rounded-lg px-4 py-1 cursor-pointer whitespace-nowrap bg-turquoise
                      border-2 border-transparent ${activeTestCaseId === index ? "text-turquoise bg-white border-turquoise" : "text-white bg-turquoise"}
                    `}
									>
										Case {index + 1}
									</div>
								</div>
							</div>
						))}
          </div>

          {/* Input and Output Section */}
          <div className="font-semibold mt-4">
            {/* Input */}
            <p className="text-sm font-medium mt-4 text-black">Input:</p>
            <div className="w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-turquoise text-black mt-2">
            {problem.examples[activeTestCaseId].inputText}
            </div>

            {/* Output */}
            <p className="text-sm font-medium mt-4 text-black">Output:</p>
            <div className="w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-turquoise text-black mt-2">
            {problem.examples[activeTestCaseId].outputText}
            </div>
          </div>
        </div>
      </Split>
      <EditorFooter handleSubmit={handleSubmit}/>
    </div>
  );
};

export default Playground;