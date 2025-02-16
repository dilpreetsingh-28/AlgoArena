import React, { useState, useEffect } from "react";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import { toast } from "react-hot-toast";  // Import toast
import { auth } from "@/firebase/firebase";
import { FaArrowLeft } from "react-icons/fa";
import { useSetRecoilState } from "recoil";
import { authModalState } from "@/atoms/authModalAtom";

type resetModalProps = {};

const resetModal: React.FC<resetModalProps> = () => {
    const setAuthModalState = useSetRecoilState(authModalState);
    const handleClick = () => {
        setAuthModalState((prev) => ({ ...prev, type: "login" }));
      }; 
    const [email, setEmail] = useState("");
    const [sendPasswordResetEmail, sending, error] = useSendPasswordResetEmail(auth); 
    
    const handleReset = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const success = await sendPasswordResetEmail(email);
      if (success) {
        toast.success("Reset email sent! Check your inbox.");  // Use toast for success notification
      }
    } 
    
    useEffect(() => {
      if (error) {
        toast.error(`Error: ${error.message}`);  // Use toast for error notification
      }
    }, [error]);

    return (
        <form className="flex flex-col items-start w-full" onSubmit={handleReset}>
            <div className="text-center w-full">
                <h2 className="text-lg font-bold text-black mb-4">Reset Password</h2>
            </div>
            <div className="justify-center w-full">
                <h4 className="text-md text-black mb-4">Forgotten your password? Enter your e-mail address below, and we'll send you an e-mail allowing you to reset it.</h4>
            </div>
            <div className="w-full mb-4">
                <label htmlFor='email' className='text-sm font-medium block mb-2 text-black text-left'>
                    Your Email
                </label>
                <input
                    type='email'
                    name='email'
                    id='email'
                    className='border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-white border-turquoise placeholder-gray-400 text-black'
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='name@company.com'
                />
            </div>
            <button
                type='submit'
                className='w-full text-white focus:ring-blue-300 font-medium text-sm px-5 py-2.5 text-center bg-turquoise hover:bg-white hover:text-turquoise bg-turquoise text-white rounded-md text-sm font-medium hover:border-2 hover:border-turquoise border-2 border-transparent transition duration-300 ease-in-out'
            >
                Reset Password
            </button>
            <div className='flex items-center justify-start w-full mt-4'>
                <a href='#' className='text-sm text-turquoise hover:underline text-left flex items-center' onClick={() => handleClick()}>
                    <FaArrowLeft /> Back to Sign In
                </a>
            </div>
        </form>
    )
}

export default resetModal;
