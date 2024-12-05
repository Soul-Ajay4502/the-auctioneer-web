import React, { Suspense, lazy } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Dashboard from "../layout/Dashboard";
import allRoutes from "./routes";
import Loader from "../components/Loader";
import { Toaster } from "react-hot-toast";
import { useAuthenticationState } from "../context/Auth.context";

// Lazy load the Login component
const Login = lazy(() => import("../views/login/Login"));

function GenerateRoutes() {
    const location = useLocation();

    const routes = allRoutes;

    return (
        <Suspense fallback={<Loader />}>
            <Routes>
                <Route exact path="/login" element={<Login />} />

                <Route
                    path={"/"}
                    element={
                        <Suspense fallback={<Loader />}>
                            <Dashboard routes={routes} />
                        </Suspense>
                    }
                >
                    {routes.map((route) => (
                        <Route
                            key={route.path}
                            path={route.path}
                            element={
                                <Suspense fallback={<Loader />}>
                                    <ProtectedRoute>
                                        <route.page />
                                    </ProtectedRoute>
                                </Suspense>
                            }
                        />
                    ))}
                </Route>

                <Route
                    path="*"
                    element={
                        <Navigate
                            to={"/login"}
                            state={{ from: location }}
                            replace
                        />
                    }
                />
            </Routes>
            <Toaster />
        </Suspense>
    );
}

function ProtectedRoute({ children }) {
    const { user } = useAuthenticationState();

    if (!user?.user_id) {
        return <Navigate to="/login" replace />;
    }
    return children;
}

export default GenerateRoutes;
