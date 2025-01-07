import React, { useState } from "react";
import toast from "react-hot-toast";
import { Button, Spinner } from "react-bootstrap";
import axios from "axios";
import endpoints from "../../services/endpoints";
import { ReactComponent as EyeOpen } from "../../assets/icons/EyeOpen.svg";
import { ReactComponent as EyeClose } from "../../assets/icons/EyeClose.svg";

const SignUpForm = ({ handleClose }) => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        displayName: "",
        otp: "",
        confirmPassword: "",
    });
    const [passwordVisible, setPasswordVisible] = useState({
        password: false,
        confirmPassword: false,
    });
    const [otpSent, setOtpSent] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleGetOtp = async () => {
        setLoading(true);
        try {
            // Replace with your API call to get OTP
            // await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated API call
            await axios.post(endpoints.authentication.getOtp, formData);
            toast.success("OTP sent successfully!");
            setOtpSent(true);
        } catch (error) {
            toast.error(
                error.response.data.statusText ||
                "Failed to send OTP. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Replace with your API call to verify OTP and create account
            // const payload = { ...formData };
            // await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated API call
            await axios.post(endpoints.authentication.register, formData);
            toast.success("Account created successfully!");
            handleClose();
        } catch (error) {
            toast.error("Failed to sign up. Please try again.");
        } finally {
            setLoading(false);
        }
    };
    const togglePasswordVisibility = (field) => {
        setPasswordVisible((prevState) => ({
            ...prevState,
            [field]: !prevState[field],
        }));
    };

    return (
        <div
            style={{
                width: "80%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "#fff",
                borderTopRightRadius: 10,
                borderBottomRightRadius: 10,
            }}
        >
            <form onSubmit={handleSignUp} style={{ width: "90%" }}>
                <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
                    GET ON BOARD
                </h1>
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
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        style={{
                            width: "97%",
                            padding: "10px",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                            fontSize: "16px",
                        }}
                        required
                        disabled={otpSent}
                    />
                </div>
                <div style={{ marginBottom: "15px", position: "relative" }}>
                    <label
                        htmlFor="password"
                        style={{ display: "block", marginBottom: "5px" }}
                    >
                        Password:
                    </label>
                    <input
                        type={passwordVisible.password ? "text" : "password"}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        style={{
                            width: "97%",
                            padding: "10px",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                            fontSize: "16px",
                        }}
                        required
                        disabled={otpSent}
                    />
                    <span
                        onClick={() => togglePasswordVisibility("password")}
                        style={{
                            position: "absolute",
                            top: "40%",
                            right: "20px",
                            cursor: "pointer",
                            color: "#555",
                            fontSize: "16px",
                        }}
                        title={
                            passwordVisible.password
                                ? "Hide Password"
                                : "Show Password"
                        }
                    >
                        {passwordVisible.password ? <EyeOpen /> : <EyeClose />}
                    </span>
                </div>
                <div style={{ marginBottom: "15px", position: "relative" }}>
                    <label
                        htmlFor="confirm-password"
                        style={{ display: "block", marginBottom: "5px" }}
                    >
                        Confirm Password:
                    </label>
                    <input
                        type={
                            passwordVisible.confirmPassword
                                ? "text"
                                : "password"
                        }
                        id="confirm-password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        style={{
                            width: "97%",
                            padding: "10px",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                            fontSize: "16px",
                        }}
                        required
                        disabled={!formData.password || otpSent}
                    />
                    <span
                        onClick={() =>
                            togglePasswordVisibility("confirmPassword")
                        }
                        style={{
                            position: "absolute",
                            top: "40%",
                            right: "25px",
                            cursor: "pointer",
                            color: "#555",
                            fontSize: "16px",
                        }}
                        title={
                            passwordVisible.confirmPassword
                                ? "Hide Password"
                                : "Show Password"
                        }
                    >
                        {passwordVisible.confirmPassword ? (
                            <EyeOpen />
                        ) : (
                            <EyeClose />
                        )}
                    </span>
                </div>
                <div style={{ marginBottom: "15px" }}>
                    <label
                        htmlFor="displayName"
                        style={{ display: "block", marginBottom: "5px" }}
                    >
                        Display Name:
                    </label>
                    <input
                        type="text"
                        id="displayName"
                        name="displayName"
                        value={formData.displayName}
                        onChange={handleChange}
                        style={{
                            width: "97%",
                            padding: "10px",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                            fontSize: "16px",
                        }}
                        required
                        disabled={otpSent}
                    />
                </div>
                {otpSent && (
                    <div style={{ marginBottom: "15px" }}>
                        <label
                            htmlFor="otp"
                            style={{ display: "block", marginBottom: "5px" }}
                        >
                            OTP:
                        </label>
                        <input
                            type="text"
                            id="otp"
                            name="otp"
                            value={formData.otp}
                            onChange={handleChange}
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
                )}
                {!otpSent ? (
                    <>
                        {formData.password &&
                            formData.confirmPassword &&
                            formData.password !== formData.confirmPassword && (
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        color: "red",
                                        fontSize: 12,
                                        fontWeight: 500,
                                    }}
                                >
                                    Password Miss Match
                                </div>
                            )}
                        <Button
                            onClick={handleGetOtp}
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
                            disabled={
                                loading ||
                                !formData.email ||
                                !formData.displayName ||
                                !formData.password ||
                                formData.password !== formData.confirmPassword
                            }
                        >
                            {loading ? (
                                <Spinner animation="border" variant="light" />
                            ) : (
                                "Get OTP"
                            )}
                        </Button>
                    </>
                ) : (
                    <Button
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
                        disabled={loading || !formData.otp}
                    >
                        {loading ? (
                            <Spinner animation="border" variant="light" />
                        ) : (
                            "Sign Up"
                        )}
                    </Button>
                )}
            </form>
        </div>
    );
};

export default SignUpForm;
