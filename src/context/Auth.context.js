import axios from "axios";
import React, {
    createContext,
    useContext,
    useState,
    useMemo,
    useEffect,
    useCallback,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import endpoints from "../services/endpoints";
import Loader from "../components/Loader";
import toast from "react-hot-toast";

const AuthenticationContext = createContext();

const AuthenticationProvider = (props) => {
    const [loadingInitial, setLoadingInitial] = useState(true);

    const location = useLocation();

    const [user, setUser] = useState({});

    const navigate = useNavigate();

    const unrestrcitedRoutes = ["/login", "/terms", "/privacy-policy"];

    const takeToLogin = () => {
        if (!unrestrcitedRoutes.includes(location.pathname)) {
            navigate("/login", "replace");
        }
    };

    useEffect(() => {
        let body = { refreshToken: localStorage.getItem("refreshToken") };

        // Interceptor
        // axios.defaults.baseURL = 'https://api.kobleapp.in/api';
        // axios.defaults.baseURL = 'https://preprodapi.kobleapp.in/api';
        // axios.defaults.baseURL = 'http://134.209.157.187:5050/api'; //test server
        // axios.defaults.baseURL = 'http://20.40.50.105:5050/api'; //staging server
        axios.defaults.baseURL = "http://localhost:8090/api"; //local server
        // axios.defaults.baseURL = 'https://sdapi.kobleapp.in:5050/api'; //Sales demo
        // axios.defaults.baseURL = 'http://192.168.1.41:5050/api';
        // axios.defaults.baseURL = 'https://devapi.kobleapp.in/api';

        const axiosId = axios.interceptors.response.use(
            (res) => {
                return res;
            },
            (err) => {
                switch (err?.response?.status) {
                    case 401:
                        const originalRequest = err.config;

                        if (!originalRequest.retry) {
                            originalRequest.retry = true;
                            let refreshToken =
                                localStorage.getItem("refreshToken");
                            let body = { refreshToken: refreshToken };

                            return axios
                                .post(endpoints.authentication.token, body)
                                .then((response) => {
                                    axios.defaults.headers.common[
                                        "Authorization"
                                    ] = `Bearer ${response.data.token}`;
                                    originalRequest.headers[
                                        "Authorization"
                                    ] = `Bearer ${response.data.token}`;
                                    const user = {
                                        ...response.data.responseData,
                                    };
                                    setUser(user);

                                    return axios(originalRequest);
                                })
                                .catch((err) => {
                                    setUser({});
                                    takeToLogin();
                                });
                        }
                        break;
                    case 403:
                        localStorage.clear();
                        setUser({});
                        takeToLogin();
                        break;
                    default:
                        throw err;
                }
            }
        );

        // authorize on load
        axios
            .post(endpoints.authentication.token, body)
            .then((response) => {
                axios.defaults.headers.common[
                    "Authorization"
                ] = `Bearer ${response.data.token}`;

                const user = { ...response.data.responseData };

                setUser(user);
            })
            .catch((err) => {
                setUser({});
                setLoadingInitial(false);
                takeToLogin();
            })
            .finally(() => {
                setLoadingInitial(false);
            });

        return () => {
            axios.interceptors.response.eject(axiosId);
        };
    }, []);

    const login = useCallback(async (userCredential) => {
        const response = await axios.post(
            endpoints.authentication.login,
            userCredential
        );

        axios.defaults.headers.common[
            "Authorization"
        ] = `Bearer ${response.data.token}`;
        setUser(response.data.responseData);
        localStorage.setItem("refreshToken", response.data.refreshToken);
    }, []);

    const logout = useCallback(async () => {
        try {
            let refreshToken = localStorage.getItem("refreshToken");
            if (!refreshToken) {
                throw new Error("Refresh token not found.");
            }

            await axios.post(endpoints.authentication.logout, { refreshToken });

            setUser({});
            localStorage.clear();
            navigate("login");
            toast.success('Logout Success')
        } catch (error) {
            console.error("Error during logout:", error);
            // Optionally, show an error message to the user
        }
    }, []);

    const value = useMemo(
        () => ({
            user,
            setUser,
            login,
            logout,
        }),
        [user, login, logout]
    );

    return (
        <AuthenticationContext.Provider value={value}>
            {loadingInitial ? <Loader /> : props.children}
        </AuthenticationContext.Provider>
    );
};

const useAuthenticationState = () => {
    let context = useContext(AuthenticationContext);
    if (context === undefined)
        throw new Error(
            "useAuthenticationState must be used within a AuthenticationProvider"
        );
    return context;
};

export { useAuthenticationState, AuthenticationProvider };
