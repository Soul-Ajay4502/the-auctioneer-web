import React, { useState, useEffect } from "react";
import Splash from "../../assets/img/Splash-webp.webp";
import "./SplashScreen.css";

const SplashScreen = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const img = new Image();
        img.src = Splash;
        img.onload = () => setIsLoaded(true);
    }, []);

    return (
        <div className="splash-screen">
            {isLoaded ? (
                <img src={Splash} alt="Splash" width="100%" loading="lazy" />
            ) : (
                <div className="loader">Loading...</div> // Optional loading indicator
            )}
        </div>
    );
};

export default SplashScreen;

