import React from "react";
import Login from "./login"; // Import Login component
import Image from "next/image";
import Signup from "./signup";
import { authModalState } from "@/atoms/authModalAtom";
import ResetModal from "./resetModal";
type AuthModalProps = Record<string, never>;
import { useRecoilValue} from "recoil";
const AuthModal:React.FC<AuthModalProps>  = () => {
    const authModal = useRecoilValue(authModalState);
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-grey shadow relative">
        <div className="flex items-center justify-center">
        <Image src='/logo-short.png' alt='AlgoArena' height={100} width={100}/>
        </div>
      <div className="flex flex-col items-start">
      {authModal.type === "login" ? <Login /> : authModal.type === "register" ? <Signup /> : <ResetModal />}
      </div>
    </div>
  );
};

export default AuthModal;