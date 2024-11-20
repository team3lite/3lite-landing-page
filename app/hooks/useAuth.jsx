"use client";

import { useGoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import {
  loginWithEmail,
  loginWithGoogle,
} from "@/lib/db/authUtils/authFunctions";
export default function useAuth() {
  const [loggingIn, setLoggingIn] = useState(false);
  const router = useRouter();
  // log out function to log the user out of google and set the profile array to null
  const loginWithG = useGoogleLogin({
    onSuccess: (codeResponse) => {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${codeResponse.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${codeResponse.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then(async (res) => {
          setLoggingIn(true);
          const resp = await loginWithGoogle({
            email: res.data.email,
            name: res.data.name,
            id: res.data.id,
          });

          setLoggingIn(false);
          toast.success("Logged in successfully", {
            //success toast style
            position: "top-right",
            style: {
              background: "#038654",
              color: "#fff",
            },
          });
          router.push("/chat");
          console.log({ resp });
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.message, {
            //error toast style
            position: "top-right",
            style: {
              background: "#C8497F",
              color: "#fff",
            },
          });
        });
    },
    onError: (error) => console.log("Login Failed:", error),
  });
  // log in function to log the user in with email and password
  const loginWithE = async (e) => {
    e.preventDefault();
    setLoggingIn(true);
    const email = e.target.email_signin.value;
    const password = e.target.password_signin.value;
    console.log({ email, password });
    try {
      const resp = await loginWithEmail({ email, password });
      console.log({ resp });
      toast.success("Logged in successfully", {
        //success toast style
        position: "top-right",
        style: {
          background: "#038654",
          color: "#fff",
        },
      });
      router.push("/chat");
    } catch (err) {
      toast.error(err.message, {
        //error toast style
        position: "top-right",
        style: {
          background: "#C8497F",
          color: "#fff",
        },
      });
    } finally {
      setLoggingIn(false);
    }
  };
  return { loginWithG, loginWithE, loggingIn };
}
