import React, { useEffect, useState } from "react";
import { auth, firestore } from "@/firebase/firebase"; // Make sure firestore is initialized
import { useSetRecoilState } from "recoil";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-hot-toast";
import { authModalState } from "@/atoms/authModalAtom";
import { FaSpinner } from "react-icons/fa6";

const Signup: React.FC = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const handleClick = () => {
    setAuthModalState((prev) => ({ ...prev, type: "login" }));
  };
  const [inputs, setInputs] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const router = useRouter();

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));

    // Handle password validation directly here
    if (name === "password") {
      if (value.length < 6) {
        setPasswordError("Password must be at least 6 characters long");
      } else {
        setPasswordError(null); // Clear the error if the password is valid
      }
    }
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputs.email || !inputs.password || !inputs.username) {
      toast.error("Please fill all fields");
      return;
    }

    if (passwordError) {
      toast.error(passwordError);
      return;
    }

    try {
      toast("Creating Account", {
        duration: 1500,
        position: "top-center",
        // Styling
        style: {},
        className: "",
        // Custom Icon: Spinner
        icon: (
          <div
            style={{
              width: "20px",
              height: "20px",
              border: "2px solid #ccc",
              borderTop: "2px solid #000",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
            }}
          ></div>
        ),
        // Change colors of success/error/loading icon
        iconTheme: {
          primary: "#000",
          secondary: "#fff",
        },
        // Aria
        ariaProps: {
          role: "status",
          "aria-live": "polite",
        },
      });
      const newUser = await createUserWithEmailAndPassword(
        inputs.email,
        inputs.password
      );
      if (!newUser) return;
      if (newUser) {
        toast.success("Signup successful!");
      }
      // Save user data to Firestore
      await setDoc(doc(firestore, "users", newUser.user.uid), {
        username: inputs.username,
        email: inputs.email,
      });
      const userData = {
        uid: newUser.user.uid,
        email: newUser.user.email,
        displayName: inputs.username,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        likedProblems: [],
        dislikedProblems: [],
        solvedProblems: [],
        starredProblems: [],
      };
      await setDoc(doc(firestore, "users", newUser.user.uid), userData);
      router.push("/");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (error) toast.error("User Already Exists");
  }, [error]);

  return (
    <form
      className="flex flex-col items-start w-full"
      onSubmit={handleRegister}
    >
      <div className="text-center w-full">
        <h2 className="text-lg font-bold text-black mb-4">
          Register to AlgoArena
        </h2>
      </div>
      <div className="w-full mb-4">
        <label
          htmlFor="email"
          className="text-sm font-medium block mb-2 text-black text-left"
        >
          Email
        </label>
        <input
          onChange={handleChangeInput}
          type="email"
          name="email"
          id="email"
          className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-white border-turquoise placeholder-gray-400 text-black"
          placeholder="name@company.com"
        />
      </div>
      <div className="w-full mb-4">
        <label
          htmlFor="username"
          className="text-sm font-medium block mb-2 text-black text-left"
        >
          Username
        </label>
        <input
          onChange={handleChangeInput}
          type="text"
          name="username"
          id="username"
          className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-white border-turquoise placeholder-gray-400 text-black"
          placeholder="johndoe"
        />
      </div>
      <div className="w-full mb-4">
        <label
          htmlFor="password"
          className="text-sm font-medium block mb-2 text-black text-left"
        >
          Password
        </label>
        <input
          onChange={handleChangeInput}
          type="password"
          name="password"
          id="password"
          className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-white border-turquoise placeholder-gray-400 text-black"
          placeholder="*******"
        />
      </div>

      <button
        type="submit"
        className="w-full text-white focus:ring-blue-300 font-medium text-sm px-5 py-2.5 text-center bg-turquoise border border-turquoise hover:bg-white hover:text-turquoise rounded-md transition duration-300 ease-in-out"
        disabled={loading}
      >
        {loading ? "Registering..." : "Sign Up"}
      </button>
      <div className="text-sm font-medium text-black text-left mt-2">
        Already have an account?{" "}
        <a
          href="#"
          className="text-blue-700 hover:underline"
          onClick={handleClick}
        >
          Log In
        </a>
      </div>
    </form>
  );
};

export default Signup;
