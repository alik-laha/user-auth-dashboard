"use client";
import { useState, useLayoutEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import io from "socket.io-client";

function Home() {
  const socket = io("http://localhost:4000");
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
  // const roomD = localStorage.getItem("id");
  const Data = {
    room: "alik",
    message: "Welcome"
  }
  socket.emit("joinRoom", "alik")
  socket.emit("getData", Data)
  socket.on("notification", (data) => {
    console.log(data)
  })

  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}
export default Home;