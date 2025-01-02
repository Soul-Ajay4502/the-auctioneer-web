import React, { useState } from "react";
import toast from "react-hot-toast";
import { Spinner } from "react-bootstrap";

const ForgotPasswordForm = () => {
    const [formData, setFormData] = useState({
        email: "",
        otp: "",
        newPassword: "",
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
            // Replace with your API call to send OTP
            await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated API call
            toast.success("OTP sent to your email!");
            setOtpSent(true);
        } catch (error) {
            toast.error("Failed to send OTP. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Replace with your API call to reset the password
            const payload = { ...formData };
            await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated API call
            toast.success("Password reset successfully!");
        } catch (error) {
            toast.error("Failed to reset password. Please try again.");
        } finally {
            setLoading(false);
        }
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
            <form onSubmit={handleResetPassword} style={{ width: "90%" }}>
                <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
                    FORGOT THE SECRET SPELL?
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
                {otpSent && (
                    <>
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
                        <div style={{ marginBottom: "15px" }}>
                            <label
                                htmlFor="newPassword"
                                style={{ display: "block", marginBottom: "5px" }}
                            >
                                New Password:
                            </label>
                            <input
                                type="password"
                                id="newPassword"
                                name="newPassword"
                                value={formData.newPassword}
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
                    </>
                )}
                {!otpSent ? (
                    <button
                        type="button"
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
                        disabled={loading}
                    >
                        {loading ? <Spinner animation="border" variant="light" /> : "Get OTP"}
                    </button>
                ) : (
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
                        disabled={loading || !formData.otp || !formData.newPassword}
                    >
                        {loading ? <Spinner animation="border" variant="light" /> : "Reset Password"}
                    </button>
                )}
            </form>
        </div>
    );
};

export default ForgotPasswordForm;
