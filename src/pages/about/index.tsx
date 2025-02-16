import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/topbar/topbar'; // Ensure Navbar is correctly imported
import Footer from '@/components/footer/footer'; // Importing Footer component
import styles from './about.module.css';
import { FaGithub, FaLinkedin ,FaUniversity } from 'react-icons/fa';
import { SiGooglescholar } from "react-icons/si";


// Team Members Data
const teamMembers = [
  {
    name: 'Pratyush Sharma',
    role: 'Developer/Designer',
    github: 'https://github.com/Pratyushs411',
    linkedin: 'https://www.linkedin.com/in/pratyushsharma411/',
    description: 'Pratyush is a creative and innovative developer driving AlgoArena’s growth, blending design and technology to foster coding culture and empower learning.',
    photo: '/pratyush.png', // Ensure this image is in the public/team folder
  },
  {
    name: 'Somil Kumar',
    role: 'Developer/Designer',
    github: 'https://github.com/ksomil2562',
    linkedin: 'https://www.linkedin.com/in/somil-kumar-4307a0258/',
    description: 'Leading Algo Arena development to build a vibrant coding community at Thapar, blending innovation with modern design.',
    photo: '/somill.jpg',
  },
  {
    name: 'Dilpreet Singh',
    role: 'Designer/Documentation',
    github: 'https://github.com/dilpreetsingh-28/dilpreetsingh-28',
    linkedin: 'https://www.linkedin.com/in/dilpreet-singh-4742031b6/',
    description: 'A key contributor to AlgoArena, Dilpreet is a versatile designer and a documentation specialist who combines creativity and clarity.',
    photo: '/dilpreet.png',
  },
  {
    name: 'Ruhani Grover',
    role: 'Documentation',
    github: '#',
    linkedin: 'https://www.linkedin.com/in/ruhani-grover-333583245/',
    description: 'Ruhani is a dedicated documentation specialist who excels in creating clear and concise materials.',
    photo: '/ruhani.jpeg', // Replace with actual path
  },
];

const gifs = [
  { src: '/meta.gif', alt: 'Meta', duration: 3800 },
  { src: '/apple.gif', alt: 'Apple', duration: 3000 },
  { src: '/amazon.gif', alt: 'Amazon', duration: 3000 },
  { src: '/netflix.gif', alt: 'Netflix', duration: 3000 },
  { src: '/google.gif', alt: 'Google', duration: 1800 },
];

const AboutPage: React.FC = () => {
  const [currentGifIndex, setCurrentGifIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const fadeOutDuration = 500;
    const currentGifDuration = gifs[currentGifIndex].duration - fadeOutDuration;

    const fadeTimer = setTimeout(() => setIsFading(true), currentGifDuration);
    const gifTimer = setTimeout(() => {
      setIsFading(false);
      setCurrentGifIndex((prevIndex) => (prevIndex + 1) % gifs.length);
    }, gifs[currentGifIndex].duration);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(gifTimer);
    };
  }, [currentGifIndex]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <section className="container mx-auto px-6 py-8 flex justify-between mt-4">
        {/* Left side - Our Mission Text */}
        <div className="w-1/2">
          <h1 className="text-4xl font-bold text-turquoise mb-6">About Us</h1>
          <p className="text-gray-600 text-lg leading-relaxed text-justify">
            Welcome to AlgoArena, a dynamic and inclusive coding platform built to fuel your passion for programming, hone your skills, and connect you with a vibrant community of learners. AlgoArena is the right place for anybody who wants to start with the world of programming and software development. AlgoArena will provide you with structured content with ample practice problems to solidify your knowledge. Our team is committed to keeping AlgoArena at the forefront of coding education and career development. We regularly update our content, features, and community resources to reflect the latest industry trends and standards.
          </p>
        </div>

        {/* Right side - Image */}
        <div className="w-1/2 flex justify-end rounded-lg">
          <Image
            src="/code1.gif"
            alt="About Us Image"
            width={450}
            height={400}
            className="rounded-lg shadow-lg"
          />
        </div>
      </section>

      {/* Separator */}
      <div className="h-1 bg-turquoise my-16 mx-6 rounded-full" />

      {/* Our Mission Section */}
      <section className="container mx-auto px-6 py-8 flex justify-between">
        <div className="w-1/2 flex justify-start">
          <Image
            src="/eg.gif"
            alt="About Us Image"
            width={500}
            height={500}
            className="rounded-lg shadow-lg"
          />
        </div>
        <div className="w-1/2">
          <h1 className="text-4xl font-bold text-turquoise mb-6">Our Mission</h1>
          <p className="text-gray-600 text-lg leading-relaxed text-justify">
            Our mission is to empower developers at all skill levels by offering an inclusive platform for engaging, real-world coding competitions that foster continuous growth, creativity, and technical excellence. We aim to bring together a global community of coders, creating opportunities to learn, innovate, and collaborate across diverse backgrounds. By providing fair, accessible challenges, we strive to nurture future-ready skills, prepare coders for impactful careers, and inspire a tech landscape that values skill, passion, and potential. Through every contest, we champion diversity, resilience, and a shared commitment to innovation.
          </p>
        </div>
      </section>

      {/* Separator */}
      <div className="h-1 bg-turquoise my-16 mx-6 rounded-full" />

      {/* Our Goal Section */}
      <section className="container mx-auto px-6 py-8 flex items-center justify-between">
        <div className="w-1/2 pl-12">
          <h1 className="text-4xl font-bold text-turquoise mb-6">Our Goal</h1>
          <p className="text-gray-600 text-lg leading-relaxed text-justify">
            At AlgoArena, our primary goal is to democratize coding education and make it accessible to everyone, regardless of their background or experience level. We strive to create a comprehensive learning environment that fosters growth, creativity, and collaboration among aspiring and experienced developers alike. By offering diverse resources, including coding challenges, interactive tutorials, and community support, we aim to enhance problem-solving skills and technical knowledge. In addition to skill development, we are committed to helping individuals land their dream jobs at leading tech companies. We provide tailored resources such as mock interviews, resume building, and career coaching to bridge the gap between education and industry demands. Our vision is to cultivate a global community where knowledge is shared, innovation thrives, and every member feels empowered to pursue their coding journey with confidence, ultimately achieving their professional aspirations.
          </p>
        </div>
        <div className="container mx-auto px-6 flex items-center justify-end w-1/2">
          <div
            className={`${styles.fadeContainer} ${isFading ? styles.fadeOut : styles.fadeIn} rounded-lg`}
          >
            <Image
              src={gifs[currentGifIndex].src}
              alt={gifs[currentGifIndex].alt}
              width={500}
              height={500}
              className={`rounded-lg shadow-lg flex justify-end ${styles.img}`}
            />
          </div>
        </div>
      </section>

      {/* Separator */}
      <div className="h-1 bg-turquoise my-8 mx-6 rounded-full" />

      {/* Meet the Team Section */}
      <section className="container mx-auto px-6 py-8">
        <h1 className="text-4xl font-bold text-turquoise mb-12 text-center">Meet the Team</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <div key={member.name} className="flex flex-col items-center bg-white rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105">
              <div className="w-32 h-32 bg-gray-200 rounded-full overflow-hidden mb-4">
                <Image
                  src={member.photo}
                  alt={`${member.name}'s photo`}
                  width={128}
                  height={128}
                  className="object-cover w-full h-full"
                />
              </div>
              <h2 className="text-xl font-semibold text-turquoise">{member.name}</h2>
              <h3 className="text-l text-turquoise mb-2">{member.role}</h3>
              <section className="flex justify-center items-center mb-2">
                <a
                  className="group flex justify-center p-2 mr-2 rounded-md drop-shadow-xl bg-gradient-to-r from-gray-800 to-black text-white font-semibold hover:rounded-[50%] transition-all duration-500 hover:from-[#331029] hover:to-[#310413]"
                  href={member.github}
                >
                  <FaGithub />
                </a>
                <a
                  className="group flex justify-center p-2 rounded-md drop-shadow-xl bg-[#0077b5] from-gray-800 text-white font-semibold hover:rounded-[50%] transition-all duration-500 hover:from-[#331029] hover:to-[#310413]"
                  href={member.linkedin}
                >
                  <FaLinkedin />
                </a>
              </section>
              <p className="text-gray-600 text-center">{member.description}</p>
            </div>
          ))}
        </div>
      </section>
      <div className="h-1 bg-turquoise my-8 mx-6 rounded-full" />
      <section className="container mx-auto px-6 py-8">
  <h1 className="text-4xl font-bold text-turquoise mb-8 text-center">Our Mentor</h1>
  
  <div className="flex flex-col md:flex-row items-center bg-white rounded-lg shadow-lg p-6 gap-8 mx-auto w-full transition-transform transform hover:scale-105">
    
    {/* Image Container */}
    <div className="flex-shrink-0 w-56 h-56 rounded-full overflow-hidden shadow-md">
      <Image
        src='/mam.jpg'
        alt='Dr. Anamika Sharma photo'
        width={224}
        height={224}
        className="object-cover w-full h-full"
      />
    </div>
    
    {/* Description Container */}
    <div className="flex-grow text-center md:text-left md:w-2/3 lg:w-1/2">
      <h1 className="text-2xl font-bold text-turquoise">Dr. Anamika Sharma</h1>
      <h2 className="text-lg text-gray-600 mb-2 text-turquoise">Assistant Professor, TIET</h2>
      <section className="flex justify-start items-center mb-2">
                <a
                  className="group flex justify-center p-2 mr-2 rounded-md drop-shadow-xl bg-gradient-to-r from-gray-800 to-black text-white font-semibold hover:rounded-[50%] transition-all duration-500 hover:from-[#331029] hover:to-[#310413]"
                  href='/'
                >
                  <FaGithub />
                </a>
                <a
                  className="group flex justify-center p-2 rounded-md drop-shadow-xl bg-[#0077b5] from-gray-800 text-white font-semibold hover:rounded-[50%] transition-all duration-500 hover:from-[#331029] hover:to-[#310413]"
                  href='/'
                >
                  <FaLinkedin />
                </a>
                <a
                  className="group flex justify-center p-2 rounded-md drop-shadow-xl bg-[#ff0000] from-gray-800 text-white font-semibold hover:rounded-[50%] transition-all duration-500 hover:from-[#331029] hover:to-[#310413] ml-2"
                  href='https://csed.thapar.edu/facultydetails/MTUxMg=='
                >
                 <FaUniversity />
                </a>
                <a
                  className="group flex justify-center p-2 rounded-md drop-shadow-xl bg-[#4682B4] from-gray-800 text-white font-semibold hover:rounded-[50%] transition-all duration-500 hover:from-[#331029] hover:to-[#310413] ml-2"
                  href='https://scholar.google.co.in/citations?user=I4OL54oAAAAJ&hl=en'
                >
                 <SiGooglescholar />
                </a>
              </section>
      <p className="text-gray-600">
        Dr. Anamika Sharma, an Assistant Professor at Thapar University, specializes in wireless sensor networks for surveillance and intrusion detection. She has published widely in high-impact journals like IEEE Sensor Journal and Springer’s Wireless Networks, and has contributed a book chapter on mobile intruder detection. She also serves as a reviewer for leading journals in her field.
      </p>
    </div>
  </div>
</section>

      <Footer />
    </div>
  );
};

export default AboutPage;
