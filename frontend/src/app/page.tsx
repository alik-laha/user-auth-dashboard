"use client";
import { useState, useLayoutEffect, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Data } from "@/type";
import { socket } from "@/socketio";

function Home() {
  const [Data, setData] = useState([]);
  const router = useRouter();
  const [verified, setVerified] = useState(false);
  useLayoutEffect(() => {
    axios.get("/api/user/verifyuser").then((res) => {
      setVerified(true);
    }).catch((err) => {
      setVerified(false);
      router.push("/login");

    });

    axios.get("/api/user/getalluser").then((res) => {
      setData(res.data.allUsers);
    }).catch((err) => {
      console.log(err);
    });

  }, [])
  // const roomD = localStorage.getItem("id");

  useEffect(() => {
    socket.emit("joinRoom", localStorage.user)
    // socket.emit("getData", { room: localStorage.user, message: "Email Verified" })

  }, [])
  socket.on("notification", (data) => {
    console.log(data)
    setData(data.data)
  })



  return (
    <div className="grid grid-cols-3 gap-4 p-4" >
      {
        Data.map((data: any) => {
          return (
            <div key={data.id} className="bg-gray-200 p-4 rounded-lg">
              <h1>{data.id}</h1>
              <h1>{data.userid}</h1>
              <h1>{data.OS}</h1>
              <h1>{data.Browser}</h1>
              <h1>{data.Device}</h1>
              <h1>{data.loginTime}</h1>
            </div>
          )
        })
      }
    </div>
  );
}
export default Home;