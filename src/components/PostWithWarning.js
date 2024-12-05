import axios from "axios";
import React, { useState } from "react";
// Importing MUI Button
import Loader from "./Loader";
import { Button } from "react-bootstrap";

function PostWithWarning({
    endpoint,
    onCancel,
    configBody,
    onSuccess = () => { },
    onError = () => { },
    successVarient,
    dangerVarient,
}) {
    const [loading, setLoading] = useState(false);

    const onAction = () => {
        setLoading(true);
        axios
            .post(endpoint, configBody)
            .then((res) => {
                onSuccess(res);
                onClose();
            })
            .catch((err) => {
                setLoading(false);
                onError(err);
            });
    };
    const onClose = () => {
        onCancel();
        setLoading(false);
    };

    return (
        <>
            <div className="text-center" style={{ width: "100%" }}>
                <Button
                    variant="contained" // MUI variant
                    color={successVarient || "success"} // Using MUI's color prop, e.g., error = red
                    className="mx-2"
                    disabled={loading}
                    onClick={onAction}
                    sx={{ borderRadius: 10, px: 6, width: "45%" }}
                >
                    Yes
                </Button>
                <Button
                    variant="outlined" // MUI variant
                    color={dangerVarient || "error"} // Using MUI's color prop, e.g., success = green
                    // className="mx-2"
                    disabled={loading}
                    onClick={onClose}
                    sx={{ borderRadius: 10, px: 6, width: "45%" }}
                >
                    No
                </Button>
            </div>

            {loading && <Loader />}
        </>
    );
}

export default PostWithWarning;
