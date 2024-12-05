import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const useAxiosGet = (url, { preventCall = false, ...restConfig } = {}) => {
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [response, setResponse] = useState([]);
    const [reloadToken, setReloadToken] = useState(false);

    const reFetch = () => {
        setReloadToken((token) => !token);
    };

    useEffect(() => {
        let unmounted = false;
        setLoading(true);

        const controller = new AbortController();

        if (preventCall !== true) {
            axios
                .get(url, {
                    signal: controller.signal,
                    ...restConfig,
                })
                .then((res) => {
                    if (!unmounted) {
                        setError(false);
                        setResponse(res.data.responseData);
                        setLoading(false);
                    }
                })
                .catch((err) => {
                    if (!unmounted) {
                        setError(err);
                        setResponse([]);
                        setLoading(false);

                        // if (axios.isCancel(err)) {
                        //     console.log(`request cancelled:${err.message}`);
                        // } else {
                        //     console.log(
                        //         'another error happened:' + err.message
                        //     );
                        // }
                    }
                });
        } else {
            if (!unmounted) {
                setLoading(false);
            }
        }

        return () => {
            unmounted = true;
            controller.abort();
        };
    }, [url, reloadToken, preventCall]);

    return { response, loading, error, reFetch };
};

const useAxiosGetMultiple = (
    urls,
    { batch = true, preventCall = false } = {}
) => {
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    const [response, setResponse] = useState(() => {
        const temp = {};
        Object.keys(urls).forEach((key) => (temp[key] = []));
        return temp;
    });

    const [reloadToken, setReloadToken] = useState(false);

    const urlObj = useRef({ ...urls });
    const unmountedOnReload = useRef(false);

    useEffect(() => {
        let unmounted = false;
        setLoading(true);

        const controller = new AbortController();
        if (preventCall !== true) {
            const result = {};
            const errors = {};

            async function loadData() {
                for (let i = 0; i < Object.values(urlObj.current).length; i++) {
                    const urlKey = Object.keys(urlObj.current)[i];

                    await axios
                        .get(Object.values(urlObj.current)[i], {
                            signal: controller.signal,
                        })
                        .then((res) => {
                            if (batch) {
                                result[urlKey] = res.data.responseData;
                            } else {
                                setResponse((prev) => ({
                                    ...prev,
                                    [urlKey]: res.data.responseData,
                                }));
                            }
                        })
                        .catch((err) => {
                            if (batch) {
                                result[urlKey] = [];
                                errors[urlKey] = err;
                            } else {
                                setResponse((prev) => ({
                                    ...prev,
                                    [urlKey]: [],
                                }));
                                setError((prev) => ({
                                    ...prev,
                                    [urlKey]: err,
                                }));
                            }

                            // if (axios.isCancel(err)) {
                            //     console.log(`request cancelled:${err.message}`);
                            // } else {
                            //     console.log(
                            //         'another error happened:' + err.message
                            //     );
                            // }
                        });
                }
                if (!unmounted) {
                    if (batch) {
                        setError(errors);
                        setResponse(result);
                    }
                    setLoading(false);
                }
            }

            loadData();
        } else {
            if (!unmounted) {
                setLoading(false);
            }
        }

        return () => {
            unmounted = true;
            unmountedOnReload.current = true;
            controller.abort();
        };
    }, [reloadToken, preventCall]);

    const reFetch = () => {
        setReloadToken((token) => !token);
    };

    const reload = (urlKey) => {
        unmountedOnReload.current = false;

        setLoading(true);

        axios
            .get(urls[urlKey])
            .then((res) => {
                if (!unmountedOnReload.current) {
                    setLoading(false);
                    setResponse({
                        ...response,
                        [urlKey]: res.data.responseData,
                    });
                }
            })
            .catch((err) => {
                if (!unmountedOnReload.current) {
                    setError({ ...error, [urlKey]: err });
                    setResponse({ ...response, [urlKey]: [] });
                    setLoading(false);
                }
            });
    };

    return { response, loading, error, reFetch, reload };
};

const useAxiosPost = (
    url,
    data,
    { preventCall = false, ...restConfig } = {}
) => {
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [response, setResponse] = useState([]);
    const [reloadToken, setReloadToken] = useState(false);

    const reFetch = () => {
        setReloadToken((token) => !token);
    };

    const configData = useRef(data);

    useEffect(() => {
        const controller = new AbortController();
        setLoading(true);
        let unmounted = false;

        if (preventCall !== true) {
            axios
                .post(url, configData.current, {
                    signal: controller.signal,
                    ...restConfig,
                })
                .then((res) => {
                    if (!unmounted) {
                        setError(false);
                        setResponse(res.data.responseData);
                        setLoading(false);
                    }
                })
                .catch((err) => {
                    if (!unmounted) {
                        setError(err);
                        setResponse([]);
                        setLoading(false);

                        // if (axios.isCancel(err)) {
                        //     console.log(`request cancelled:${err.message}`);
                        // } else {
                        //     console.log(
                        //         'another error happened:' + err.message
                        //     );
                        // }
                    }
                });
        } else {
            if (!unmounted) {
                setLoading(false);
            }
        }

        return () => {
            unmounted = true;
            controller.abort();
        };
    }, [url, reloadToken, preventCall]);

    return { response, loading, error, reFetch };
};

const useAxiosPostMultiple = (requests, { preventCall = false } = {}) => {
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    const [response, setResponse] = useState(() => {
        const temp = {};
        Object.keys(requests).forEach((key) => (temp[key] = []));
        return temp;
    });

    const [reloadToken, setReloadToken] = useState(false);

    const requestObj = useRef({ ...requests });
    const unmountedOnReload = useRef(false);

    useEffect(() => {
        let unmounted = false;
        const controller = new AbortController();
        setLoading(true);

        if (preventCall !== true) {
            const result = {};
            const errors = {};

            async function loadData() {
                for (const [name, request] of Object.entries(
                    requestObj.current
                )) {
                    await axios({
                        signal: controller.signal,
                        ...request,
                        method: 'post',
                    })
                        .then((res) => {
                            result[name] = res.data.responseData;
                        })
                        .catch((err) => {
                            errors[name] = err;
                            result[name] = [];

                            // if (axios.isCancel(err)) {
                            //     console.log(`request cancelled:${err.message}`);
                            // } else {
                            //     console.log(
                            //         'another error happened:' + err.message
                            //     );
                            // }
                        });
                }
                if (!unmounted) {
                    setError(errors);
                    setResponse(result);
                    setLoading(false);
                }
            }

            loadData();
        } else {
            if (!unmounted) {
                setLoading(false);
            }
        }

        return () => {
            unmounted = true;
            unmountedOnReload.current = true;
            controller.abort();
        };
    }, [reloadToken, preventCall]);

    const reFetch = () => {
        setReloadToken((token) => !token);
    };

    const reload = (urlKey) => {
        unmountedOnReload.current = false;

        setLoading(true);

        axios
            .get(requests[urlKey])
            .then((res) => {
                if (!unmountedOnReload.current) {
                    setLoading(false);
                    setResponse({
                        ...response,
                        [urlKey]: res.data.responseData,
                    });
                }
            })
            .catch((err) => {
                if (!unmountedOnReload.current) {
                    setLoading(false);
                    setError({ ...error, [urlKey]: err });
                    setResponse({ ...response, [urlKey]: [] });
                }
            });
    };

    return { response, loading, error, reFetch, reload };
};

export { useAxiosPost, useAxiosGetMultiple, useAxiosPostMultiple, useAxiosGet };
