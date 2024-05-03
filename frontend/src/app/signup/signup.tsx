"use client";
import React from 'react'
import "./signup.css"
import Link from "next/link"
import { FormEvent, useState } from "react"
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { useRouter } from 'next/navigation'
import { Loader2 } from "lucide-react"

function Signup() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
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

    const handleSignUp = async (e: FormEvent<HTMLElement>) => {
        e.preventDefault();
        setLoading(true)
        axios.post("/api/user/signup", { name, email, password: pass, confirmPass })
            .then(res => {
                console.log(res.data)
                setLoading(false)
                router.push("/verifycode")
            }
            ).catch(err => {
                setMessage(err.response.data.error)
                setError("block")
                setLoading(false)
            })
    }
    return (
        <form className="form" onSubmit={handleSignUp}>
            <div className="inputBox">

                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required /><i>User Name</i>

            </div>

            <div className="inputBox">

                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} /><i>Email</i>

            </div>

            <div className="inputBox">
                <div style={{ display: "flex", alignItems: "center" }}>
                    <input type={format} value={pass} onChange={(e) => setPass(e.target.value)} required />
                    <div style={{ color: "white", }} onClick={handlePassShow}>{show ? <FaEyeSlash /> : <FaEye className="eye" />}</div>
                </div>
                <i>Password</i>

            </div>
            <div className="inputBox">
                <input type="password" value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} required /> <i>Confirm Password</i>

            </div>

            <div className="links"> <a href="#">Forgot Password</a> <Link href="/login">Login</Link>

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

export default Signup
