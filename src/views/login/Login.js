import { useEffect, useState } from "react";
import LeftScreen from "./LeftScreen";
import LoginForm from "./LoginForm";
import SplashScreen from "./SplashScreen";

const Login = () => {
    const [isSplashVisible, setIsSplashVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsSplashVisible(false);
        }, 3000); // Splash screen duration in milliseconds

        return () => clearTimeout(timer); // Cleanup timer
    }, []);
    return (
        <>
            {isSplashVisible ? (
                <SplashScreen />
            ) : (
                <div
                    style={{
                        display: "flex",
                        padding: 30,
                        justifyContent: "center",
                        background: "#ebeae8",
                        position: "fixed",
                        top: 0,
                        width: "100%",
                    }}
                >
                    <LeftScreen />
                    <LoginForm />
                </div>
            )}
        </>
    );
};

export default Login;
