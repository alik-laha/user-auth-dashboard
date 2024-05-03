"use client"
import "./login.css"
import React, { FormEvent, useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Link from 'next/link'
import axios from "axios";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react"


function Login() {

    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [show, setShow] = useState(false);
    const [format, setFormat] = useState("password");
    const [error, setError] = useState("none");
    const [loading, setLoading] = useState(false);

    const handlePassShow = () => {
        setShow(!show);
        if (show) {
            setFormat("password");
        } else {
            setFormat("text");
        }
    }

    useEffect(() => {
        axios.get("/api/user/VeryifyLogedIN")
            .then(res => {
                console.log(res.data)
            }).catch(err => {
                router.push("/")
                console.log(err)
            })
    }, [])

    const handleLogin = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true)
        axios.put("/api/user/login", { email, password })
            .then(res => {
                console.log(res.data)
                setLoading(false)
                router.push("/verifycode")


            }).catch(err => {
                console.log(err)
                setMessage(err.response.data.error)
                setError("block")
                setLoading(false)
            })
    }
    return (
        <form className="form" onSubmit={handleLogin}>

            <div className="inputBox">
                <div>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /><i>Email</i>
                </div>
            </div>

            <div className="inputBox">
                <div style={{ display: "flex", alignItems: "center" }}>
                    <input type={format} value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <div style={{ color: "white", }} onClick={handlePassShow}>{show ? <FaEyeSlash /> : <FaEye className="eye" />}</div>
                </div>
                <i>Password</i>
            </div>

            <div className="links"> <Link href="/email/verify">Forgot Password</Link> <Link href="/signup">Sign-Up</Link>

            </div>

            <div className="inputBox">

                <button className="bg-green-600 w-full">{loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                    <div>Submit</div>
                )}</button>
                <p style={{ display: error, color: "red", textAlign: "center" }}>{message}</p>
            </div>

        </form>
    )
}

export default Login
