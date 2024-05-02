"use client";
import "./login.css"
import React, { FormEvent, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Link from 'next/link'
import axios from "axios";
import { redirect } from 'next/navigation'

const Login = () => {


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [show, setShow] = useState(false);
    const [format, setFormat] = useState("password");
    const [error, setError] = useState("none");

    const handlePassShow = () => {
        setShow(!show);
        if (show) {
            setFormat("password");
        } else {
            setFormat("text");
        }
    }

    const handleLogin = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        axios.put("/api/user/login", { email, password })
            .then(res => {
                console.log(res.data)
                redirect("/verifycode")

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

                        <h2>Log In</h2>

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

                                <input type="submit" value="Login" />
                                <p style={{ display: error, color: "red", textAlign: "center" }}>{message}</p>
                            </div>

                        </form>

                    </div>

                </div>

            </section >
        </div>
    )
}
export default Login;