import { auth } from "@/firebase/firebase";
import React from "react";
import { useSignOut } from "react-firebase-hooks/auth";
type LogoutProps = {
    className?: string; // Add className as an optional prop
};
const Logout: React.FC<LogoutProps> = ({}) => {
    const [signOut] = useSignOut(auth);

    const handleLogout = () => {
        signOut();
    };
    return (
        <button
            className="group flex items-center justify-start w-8 h-8 bg-turquoise rounded-lg cursor-pointer relative overflow-hidden transition-all duration-500 shadow-lg hover:w-28 active:translate-x-1 active:translate-y-1 ml-4"
            onClick={handleLogout}
        >
            <div
                className="flex items-center justify-center w-full transition-all duration-500 group-hover:justify-start group-hover:px-3"
            >
                <svg className="w-3 h-3" viewBox="0 0 512 512" fill="white">
                    <path
                        d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"
                    ></path>
                </svg>
            </div>
            <div
                className="absolute right-5 transform translate-x-full opacity-0 text-white text-lg font-semibold transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100"
            >
                Logout
            </div>
        </button>
    );
};
export default Logout;
