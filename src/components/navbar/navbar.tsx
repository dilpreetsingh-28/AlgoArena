//import { authModalState } from "@/atoms/authModalAtom";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useSetRecoilState } from "recoil";
interface NavbarProps {
	style?: React.CSSProperties;
}
const Navbar: React.FC<NavbarProps> = ({ style }) => {
	return (
		<div style={style} className='flex items-center justify-between sm:px-12 px-2 md:px-24'>
			<Link href='/' className='flex items-center justify-center h-20'>
				<Image src='/logo.png' alt='AlgoArena' height={100} width={200} />
			</Link>
			<div className='flex items-center'>
			<Link href="/about"
					className='bg-white text-black px-2 py-1 sm:px-4 rounded-md text-xl font-bold border-transparent'
				>
					About
				</Link>
				<button
					className='bg-white text-black px-2 py-1 sm:px-4 rounded-md text-xl font-bold border-transparent'
				>
					Problems
				</button>
				<button
					className='bg-white text-black px-2 py-1 sm:px-4 rounded-md text-xl font-bold border-transparent'
				>
					Contest
				</button>
				<button
					className='bg-white text-black px-2 py-1 sm:px-4 rounded-md text-xl font-bold border-transparent'
				>
					Discuss
				</button>
			</div>
		</div>
	);
}
export default Navbar;