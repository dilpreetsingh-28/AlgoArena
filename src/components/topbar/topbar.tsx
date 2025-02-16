import { auth } from "@/firebase/firebase";
import Link from "next/link";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Logout from "../Buttons/Logout";
import { useSetRecoilState } from "recoil";
import { authModalState } from "@/atoms/authModalAtom";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { BsList } from "react-icons/bs";
import { useRouter } from "next/router";
import Timer from "../Timer/Timer";
import { problems } from "@/utils/problems";
import { Problem } from "@/utils/types/problem";


type topbarProps = {
  problemPage?: boolean;
};

const Topbar: React.FC<topbarProps> = ({ problemPage }) => {
  const [user] = useAuthState(auth);
  const setAuthModalState = useSetRecoilState(authModalState);
  const router = useRouter();
  const handleProblemChange = (isForward: boolean) => {
		const { order } = problems[router.query.pid as string] as Problem;
		const direction = isForward ? 1 : -1;
		const nextProblemOrder = order + direction;
		const nextProblemKey = Object.keys(problems).find((key) => problems[key].order === nextProblemOrder);

		if (isForward && !nextProblemKey) {
			const firstProblemKey = Object.keys(problems).find((key) => problems[key].order === 1);
			router.push(`/problems/${firstProblemKey}`);
		} else if (!isForward && !nextProblemKey) {
			const lastProblemKey = Object.keys(problems).find(
				(key) => problems[key].order === Object.keys(problems).length
			);
			router.push(`/problems/${lastProblemKey}`);
		} else {
			router.push(`/problems/${nextProblemKey}`);
		}
	};
  return (
    <nav className='relative flex h-[60px] w-full shrink-0 items-center justify-between px-5 bg-white text-black shadow-md'>
      <div
        className={`flex w-full items-center justify-between ${
          !problemPage ? "max-w-[1200px] mx-auto" : ""
        }`}
      >
        <Link href='/' className='flex items-center'>
          <Image src='/logo.png' alt='Logo' height={100} width={100} />
        </Link>

        {problemPage && (
          <div className='flex items-center gap-4 flex-1 justify-center'>
            <div className='flex items-center justify-center rounded bg-dark-fill-3 hover:bg-dark-fill-2 h-8 w-8 cursor-pointer' onClick={() => handleProblemChange(false)}>
              <FaChevronLeft />
            </div>
            <Link
              href='/'
              className='flex items-center gap-2 font-medium max-w-[170px] text-dark-gray-8 cursor-pointer'
            >
              <div>
                <span className='text-turquoise'>
                  <BsList />
                </span>
              </div>
              <p className='text-turquoise'>Problem List</p>
            </Link>
            <div className='flex items-center justify-center rounded bg-dark-fill-3 hover:bg-dark-fill-2 h-8 w-8 cursor-pointer' onClick={() => handleProblemChange(true)}>
              <FaChevronRight />
            </div>
          </div>
        )}
        {problemPage && <Timer />}

        {!problemPage && (
          <div className='flex items-center'>
            <Link href='/about'>
              <button className='bg-white text-black px-2 py-1 sm:px-4 rounded-md text-l font-bold border-transparent'>
                About
              </button>
            </Link>
            <Link href='/'>
              <button className='bg-white text-black px-2 py-1 sm:px-4 rounded-md text-l font-bold border-transparent'>
                Problems
              </button>
            </Link>
            <Link href={user ? '/contest' : '/auth'}>
              <button className='bg-white text-black px-2 py-1 sm:px-4 rounded-md text-l font-bold border-transparent'>
                Contest
              </button>
            </Link>
            <Link href={user ? '/discuss' : '/auth'}>
              <button className='bg-white text-black px-2 py-1 sm:px-4 rounded-md text-l font-bold border-transparent'>
                Discuss
              </button>
            </Link>

            {!user && (
              <Link
                href='/auth'
                onClick={() =>
                  setAuthModalState((prev) => ({
                    ...prev,
                    isOpen: true,
                    type: "login",
                  }))
                }
              >
                <button
                  className='bg-turquoise text-white px-2 py-1 sm:px-4 rounded-md text-md 
                hover:text-turquoise hover:bg-white hover:border-2 hover:border-turquoise border-2 border-transparent
                transition duration-300 ease-in-out'
                >
                  Sign In
                </button>
              </Link>
            )}
            {user && (
              <Link
                href='/'
                className='cursor-pointer group relative'
              >
                <Image
                  src='/avatar.png'
                  alt='Avatar'
                  width={30}
                  height={30}
                  className='rounded-full'
                />
                <div
                  className='absolute top-10 left-2/4 -translate-x-2/4 mx-auto bg-white text-turquoise p-2 rounded shadow-lg 
								z-40 group-hover:scale-100 scale-0 
								transition-all duration-300 ease-in-out border border-gray-200'
                >
                  <p className='text-sm'>{user.email}</p>
                </div>
              </Link>
            )}
            {user && <Logout className='ml-4' />}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Topbar;
