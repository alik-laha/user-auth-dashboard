"use client";
import { useState, useLayoutEffect, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import io from "socket.io-client";
import { Data } from "@/type";
import { socket } from "@/socketio";

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
  // const roomD = localStorage.getItem("id");
  let Data: Data
  useEffect(() => {
    Data = {
      room: localStorage.id,
      message: "Welcome"
    }
    socket.emit("joinRoom", localStorage.id)
    socket.emit("getData", Data)

  }, [])
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