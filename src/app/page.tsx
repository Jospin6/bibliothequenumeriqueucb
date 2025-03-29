"use client"
import { useCurrentUser } from "@/hooks/useCurrentUser";
import Home from "./home/page";

export default function App() {
  const user = useCurrentUser()
  console.log("putain: ",user)

  return (
    <>
      <Home />
    </>
  );
}
