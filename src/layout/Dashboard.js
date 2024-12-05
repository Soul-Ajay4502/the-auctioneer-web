import React, { useEffect, useState } from "react";
import { useLocation, Outlet } from "react-router-dom";
// import AdminNavbar from "../components/navbar/AdminNavbar.js";
// import Sidebar from "../components/Sidebar/Sidebar.js";
import DashBoardMenus from "../components/DashBoardMenus.js";

import { setLocale } from "yup";
import { useAuthenticationState } from "../context/Auth.context.js";
// import Loader from "../components/Loader.js";

const Dashboard = (props) => {
    const mainContent = React.useRef(null);
    const location = useLocation();
    const showTabsOn = ["/league-list", "/"];
    const isTabVisible = showTabsOn.includes(location.pathname);
    const { user } = useAuthenticationState();

    useEffect(() => {
        document.body.style.backgroundColor = "#FAFAFE";

        return () => {
            document.body.style.backgroundColor = "white";
        };
    }, []);

    useEffect(() => {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
        mainContent.current.scrollTop = 0;
    }, [location]);

    // setting yup default validation message

    setLocale({
        mixed: {
            required: "Required",
            notType: ({ type, path }) => {
                switch (type) {
                    case "number":
                        return `Must be a number`;
                    case "string":
                        return `Must be a string`;
                    case "date":
                        return `Given date type is improper`;
                    default:
                        return `Invalid value`;
                }
            },
        },
        string: {
            email: "Provide valid email",
            url: "Provide valid url",
        },
        number: {
            min: ({ min, path }) => `Must be minimum ${min}`,
        },
    });

    return (
        <>
            <div
                style={{
                    position: "fixed",
                    zIndex: 1000,
                    background: "#f0eded",
                    width: "100%",
                }}
            >
                {isTabVisible && (
                    <div
                        style={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            paddingRight: 50,
                        }}
                    >
                        <DashBoardMenus {...props} />
                        <div
                            style={{
                                padding: 4,
                                fontWeight: 700,
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            WELCOME{" "}
                            <div
                                style={{
                                    color: "#2d50fc",
                                    paddingLeft: 2,
                                }}
                            >
                                {user.displayName?.toUpperCase()}
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div
                style={{
                    // marginLeft: `${showSidebar ? '230px' : '0px'}`,
                    // marginLeft: "230px",
                    position: "relative",
                    transition: "margin .25s",
                    height: "100vh",
                    overflow: "auto",
                    // padding: "0 40px",
                }}
                ref={mainContent}
            >
                {/* <AdminNavbar
                    notifications={notifications}
                    refetchNotification={getNotification}
                /> */}
                <div style={{ marginTop: 30 }}>
                    <Outlet />
                </div>

                <footer className="py-4" />
            </div>
        </>
    );
};

export default Dashboard;
