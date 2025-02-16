import React from 'react';
import Topbar from "@/components/topbar/topbar";
import Footer from "@/components/footer/footer";
import Link from "next/link";
const Index: React.FC = () => {
  return (
    <>
      <Topbar />
      <div className="bg-gradient-to-b from-gray-100 to-gray-300 h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
          No Contests Available
        </h1>
        <p className="text-gray-600 text-lg mb-6 text-center">
          Stay tuned! Upcoming contests will be listed here soon.  
        </p>
        <button className="px-6 py-3 bg-turquoise text-white text-lg font-semibold rounded-md shadow-md hover:bg-turquoise-dark transition-all duration-300">
        <Link href="/">Explore Practice Problems</Link>
        </button>
      </div>
      <Footer />
    </>
  );
};

export default Index;
