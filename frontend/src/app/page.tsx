"use client";
import { useState, useLayoutEffect, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Data } from "@/type";
import { socket } from "@/socketio";
import { MdPhoneAndroid } from "react-icons/md";
import { CiDesktop } from "react-icons/ci";



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
              <div className="flex flex-col gap-auto">
                <h1>{data.id === localStorage.getItem("id") ? <div className="bg-blue-200 text-black inline-block mb-2 ">current Device</div> : <button className="border border-black rounded-lg mb-2">Signout</button>}</h1>
                <span>
                  {data.Device === "Desktop" ? <CiDesktop /> : <MdPhoneAndroid />}
                </span>
              </div>
              <h1 className="mb-2">OS: {data.OS}</h1>
              <h1 className="mb-2">BROWSER:{data.Browser}</h1>
              <h1 className="mb-2">{data.Device}</h1>
              <h1 className="mb-2">{data.loginTime.slice(0, 10)}</h1>
            </div>
          )
        })
      }
    </div>
  );
}
export default Home;