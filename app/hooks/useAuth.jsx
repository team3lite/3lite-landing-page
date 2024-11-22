"use client";

import { AuthContext } from "@/providers/AuthContext";
import { useContext } from "react";


export default function useAuth() {
 
const {activeUser,setUser}= useContext(AuthContext);

  return { activeUser,setUser};
}
