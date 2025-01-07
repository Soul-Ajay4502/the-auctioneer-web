import React, { useState } from "react";
import toast from "react-hot-toast";
import { Button, Spinner } from "react-bootstrap";
import axios from "axios";
import endpoints from "../../services/endpoints";
import { ReactComponent as EyeOpen } from "../../assets/icons/EyeOpen.svg";
import { ReactComponent as EyeClose } from "../../assets/icons/EyeClose.svg";

const ForgotPasswordForm = ({ handleClose }) => {
    const [formData, setFormData] = useState({
        email: "",
        otp: "",
        newPassword: "",
    });
    const [otpSent, setOtpSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

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
            await axios.post(endpoints.authentication.getOtpForReset, formData)
            toast.success("OTP sent to your email!");
            setOtpSent(true);
        } catch (error) {
            toast.error(error.response.data.statusText || "Failed to send OTP. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async () => {
        setLoading(true);
        try {
            // Replace with your API call to reset the password
            await axios.post(endpoints.authentication.resetPassword, formData)
            toast.success("Password reset successfully!");
            handleClose()
        } catch (error) {
            toast.error(error.response.data.statusText || "Failed to reset password. Please try again.");
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
                        <div style={{ marginBottom: "15px", position: 'relative' }}>
                            <label
                                htmlFor="newPassword"
                                style={{ display: "block", marginBottom: "5px" }}
                            >
                                New Password:
                            </label>
                            <input
                                type={showPassword ? "text" : "password"}
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
                            <span
                                onClick={() =>
                                    setShowPassword(!showPassword)
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
                                    showPassword
                                        ? "Hide Password"
                                        : "Show Password"
                                }
                            >
                                {showPassword ? (
                                    <EyeOpen />
                                ) : (
                                    <EyeClose />
                                )}
                            </span>
                        </div>
                    </>
                )}
                {!otpSent ? (
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
                        disabled={loading || !formData.email}
                    >
                        {loading ? <Spinner animation="border" variant="light" /> : "Get OTP"}
                    </Button>
                ) : (
                    <Button
                        onClick={handleResetPassword}
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
                    </Button>
                )}
            </form>
        </div>
    );
};

export default ForgotPasswordForm;
