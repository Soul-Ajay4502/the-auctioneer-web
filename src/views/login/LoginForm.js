import React, { useState } from "react";
import { useAuthenticationState } from "../../context/Auth.context";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Spinner } from "react-bootstrap";
import WithOffcanvas from "../../components/WithOffcanvas";
import SignUpForm from "./SignUpForm";
import ForgotPasswordForm from "./ForgotPasswordForm";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loggingIn, setLoggingIn] = useState(false);
    const navigate = useNavigate();

    const { login } = useAuthenticationState();

    const handleSubmit = (e) => {
        e.preventDefault();
        const userCredential = { USERNAME: email, PASSWORD: password };
        setLoggingIn(true);

        login(userCredential)
            .then(() => {
                setLoggingIn(false);
                navigate("/");
                toast.success("Login Success");
            })
            .catch((err) => {
                setLoggingIn(false);
                toast.error(extractErrorFromRes(err));
            });
        // Add your form submission logic here
    };

    return (
        <div
            style={{
                width: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "#fff",
                borderTopRightRadius: 10,
                borderBottomRightRadius: 10,
            }}
        >
            <form onSubmit={handleSubmit} style={{ width: "90%" }}>
                <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
                    Welcome back
                </h1>
                <p
                    style={{
                        textAlign: "center",
                        marginBottom: "20px",
                        color: "#c2bcab",
                    }}
                >
                    Login or create an account to start bidding and managing
                    your team.
                </p>
                <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
                    Login
                </h2>
                <div style={{ marginBottom: "15px" }}>
                    <label
                        htmlFor="email"
                        style={{ display: "block", marginBottom: "5px" }}
                    >
                        Email:
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{
                            width: "97%",
                            padding: "10px",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                            fontSize: "16px",
                        }}
                        required
                    />
                </div>
                <div style={{ marginBottom: "15px" }}>
                    <label
                        htmlFor="password"
                        style={{ display: "block", marginBottom: "5px" }}
                    >
                        Password:
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{
                            width: "97%",
                            padding: "10px",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                            fontSize: "16px",
                        }}
                        required
                    />
                </div>
                <WithOffcanvas
                    backdrop="static"
                    placement="start"
                    isButton={false}
                    childStyle={{ color: "blue", cursor: "pointer" }}
                    offcanvasBody={<ForgotPasswordForm />}
                    style={{ width: "50vw" }}
                >
                    <div style={{ paddingBottom: 5 }}>Lost the Magic Key ?</div>
                </WithOffcanvas>
                <button
                    type="submit"
                    style={{
                        width: "97%",
                        padding: "10px",
                        backgroundColor: "#32529F",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        fontSize: "16px",
                        cursor: "pointer",
                        height: 50,
                    }}
                >
                    {loggingIn ? (
                        <Spinner animation="border" variant="light" />
                    ) : (
                        "Login"
                    )}
                </button>
                <WithOffcanvas
                    isButton={false}
                    backdrop="static"
                    placement="end"
                    offcanvasBody={<SignUpForm />}
                    style={{ width: "50vw" }}
                    childStyle={{ cursor: "pointer" }}
                >
                    <div
                        style={{
                            width: "98%",
                            display: "flex",
                            justifyContent: "end",
                            color: "blue",
                            marginTop: 5
                        }}
                    >
                        <div style={{ color: "#000", paddingRight: 5, }}>Not a member?</div>Swing
                        Into Action
                    </div>
                </WithOffcanvas>
            </form>
        </div>
    );
};

export default LoginForm;

function extractErrorFromRes(error) {
    let errorMessage = "";

    if (!!error.response) {
        errorMessage =
            error.response.data?.statusText || "Something went wrong";
    }

    if (!errorMessage) {
        errorMessage = "Something went wrong :(";
    }

    return errorMessage;
}
