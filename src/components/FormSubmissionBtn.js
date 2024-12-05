import React from "react";
import { Button } from "react-bootstrap";

function FormSubmissionBtn({ onCancel }) {
    return (
        <>
            <div className="text-center py-4" style={{ width: "100%" }}>
                <Button
                    variant="light"
                    onClick={onCancel}
                    style={{
                        borderTopRightRadius: 0,
                        borderBottomRightRadius: 0,
                        width: "40%",
                        background: "#bababf",
                    }}
                >
                    <span>Cancel</span>
                </Button>
                <Button
                    type="submit"
                    style={{
                        borderTopLeftRadius: 0,
                        borderBottomLeftRadius: 0,
                        width: "40%",
                        background: "#0d30db",
                        border: "none",
                    }}
                >
                    <span>Submit</span>
                </Button>
            </div>
        </>
    );
}

export default FormSubmissionBtn;
