"use client";
import { useState, useLayoutEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import io from "socket.io-client";

function Home() {
  const router = useRouter();
  const [verified, setVerified] = useState(false);
  useLayoutEffect(() => {
    axios.get("/api/user/verifyuser").then((res) => {
      setVerified(true);
    }).catch((err) => {
      setVerified(false);
      router.push("/login");

    });
  }, [])
  const socket = io("http://localhost:4000");
  socket.on("connect", () => {
    console.log("connected");
  });
  socket.on("disconnect", () => {
    console.log("disconnected");
  });
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}
export default Home;