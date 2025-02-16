import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { auth } from "@/firebase/firebase";
import { useSetRecoilState } from "recoil";
import { useAuthState } from "react-firebase-hooks/auth";
import { FaFacebook } from "react-icons/fa";
import { authModalState } from "@/atoms/authModalAtom";
import { FaTwitter } from "react-icons/fa";
import { useRouter } from "next/router";
import { AiFillInstagram } from "react-icons/ai";
const Footer: React.FC = () => {
  const [user] = useAuthState(auth);
	const setAuthModalState = useSetRecoilState(authModalState);
	const router = useRouter();
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between">
          {/* Navigation Links */}
          <div className="mb-6 md:mb-0">
            <h3 className="font-bold text-lg mb-2">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="hover:text-teal-500">
                  About
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-teal-500">
                  Problems
                </Link>
              </li>
              <li>
                <Link href={user ? '/contest' : '/auth'} className="hover:text-teal-500">
                  Contest
                </Link>
              </li>
              <li>
                <Link href={user ? '/discuss' : '/auth'} className="hover:text-teal-500">
                  Discuss
                </Link>
              </li>
              <li>
                <Link href={user ? '/profile' : '/auth'} className="hover:text-teal-500">
                  Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div className="mb-6 md:mb-0">
            <h3 className="font-bold text-lg mb-2">Follow Us</h3>
            <div className="flex space-x-4">
              <Link href="#" className="hover:text-teal-500">
              <FaFacebook />
              </Link>
              <Link href="#" className="hover:text-teal-500">
              <FaTwitter />
              </Link>
              <Link href="#" className="hover:text-teal-500">
              <AiFillInstagram />
              </Link>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="font-bold text-lg mb-2">Contact Us</h3>
            <p>Thapar Institute of Engineering & Technology</p>
            <p>Bhadson Rd, Adarsh Nagar, Prem Nagar</p>
            <p>Patiala, Punjab 147004</p>
            <p>Email: contact@algoarena.com</p>
            <p>Phone: +91 7838610837</p>
          </div>
        </div>
      </div>
      {/* Copyright Notice */}
      <div className="mt-8 border-t border-gray-700 pt-4 text-center">
        <p className="text-sm text-gray-400">
          &copy; {new Date().getFullYear()} AlgoArena. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
