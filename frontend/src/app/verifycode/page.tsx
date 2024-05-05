"use client";
import React, { FormEvent, useState, useEffect } from 'react';
import "./verifyEmail.css"
import axios from 'axios';
import { useRouter } from 'next/navigation'
import { Loader2 } from "lucide-react"
import { socket } from '@/socketio';
const VerifyEmail = () => {

    const router = useRouter();
    const [code, setCode] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("none");

    const FetchData = (user: string): void => {
        axios.get("/api/user/getalluser")
            .then(res => {
                console.log(res.data)
                socket.emit("getData", { room: user, data: res.data.allUsers });
                return
            }).catch(err => {
                console.log(err)
            })
    }

    const handleVerify = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true)
        axios.post("api/user/verifyemail", { code })
            .then((res) => {
                localStorage.setItem("user", res.data.user);
                localStorage.setItem("id", res.data.id);
                socket.emit("joinRoom", res.data.user);

                socket.on("notification", (data) => {
                    console.log(data);
                });

                try {
                    FetchData(res.data.user);
                    router.push("/");
                    setLoading(false);
                } catch (error) {
                    console.error("Error fetching data:", error);
                    setError("block");
                    setMessage("Error fetching data. Please try again.");
                    setLoading(false);
                }
            })
            .catch(err => {
                console.error("Error verifying email:", err);
                setMessage(err.response.data.error);
                setError("block");
                setLoading(false);
            });
    }

    useEffect(() => {
        axios.get("/api/user/VerifyEmailRoute")
            .then(res => {
                console.log(res.data)

            }).catch(err => {
                router.push("/")
                console.log(err)
            })
    }, [])



    const handleResend = () => {
        axios.get("api/user/resendcode")
            .then(res => {
                console.log(res.data)
                setMessage(res.data.message)
                setError("block")
            }).catch(err => {
                console.log(err)
                setMessage(err.response.data.error)
                setError("block")
            })
    }
    return (
        <div className="alik">
            <section> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span>

                <div className="signin">

                    <div className="content">

                        <h2>Verify</h2>

                        <form className="form" onSubmit={handleVerify}>

                            <div className="inputBox">
                                <div>
                                    <input type="text" value={code} onChange={(e) => setCode(e.target.value)} required /><i>Email</i>
                                </div>
                            </div>
                            <div className="inputBox">
                                <div className="links"> <p onClick={handleResend} className='text-white cursor-pointer'>Resend Code</p></div>
                                <button className="bg-green-600 w-full">{loading ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                    <div>Submit</div>
                                )}</button>
                                <p style={{ display: error, color: "red", textAlign: "center" }}>{message}</p>
                            </div>

                        </form>

                    </div>

                </div>

            </section >
        </div>
    );
}

export default VerifyEmail;