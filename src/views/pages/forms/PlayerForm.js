import React from "react";
import { Formik, Form } from "formik";
import axios from "axios";
import Loader from "../../../components/Loader";
import FormSubmissionBtn from "../../../components/FormSubmissionBtn";
import { Col } from "react-bootstrap"; // Import Row and Col from React-Bootstrap
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is imported
import "./LeagueForm.css"; // Import any additional CSS
import * as Yup from "yup";
import { useLeagueState } from "../../../context/League.context";

function PlayerForm({ endpoint, onCancel, onAfterSubmit, updateValues }) {
    const { selectedLeague } = useLeagueState();
    const { leagueDetails } = selectedLeague;
    const submitHandler = (values, { setSubmitting }) => {
        const formData = new FormData();
        const prevDp = updateValues.playerPhoto;
        const parts = prevDp.split("/");
        const filenameWithExtension = parts[parts.length - 1]; // "uploaded_file_1734013875338.jpg"
        const filename = filenameWithExtension.split(".")[0];
        const body = {
            playerId: updateValues.playerId,
            prevDpFile: filename,
            folderName: `${leagueDetails.leagueId}-${leagueDetails?.leagueName}`,
            fileName: `${updateValues.playerName}-${updateValues.whatsappNo}`,
        };

        if (values.playerDp instanceof File) {
            formData.append("playerDp", values.playerDp);
        }
        const queryString = new URLSearchParams(body).toString();
        axios
            .post(`${endpoint}?${queryString}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then(() => {
                onAfterSubmit();
            })
            .catch((err) => {
                console.error("Error submitting form:", err);
            })
            .finally(() => setSubmitting(false));
    };

    const initialFormValues = { playerDp: "" };
    const validationSchema = Yup.object({
        playerDp: Yup.mixed()
            .required("Player DP is required")
            .test("fileSize", "File size is too large", (value) => {
                return value ? value.size <= 5 * 1024 * 1024 : true; // Max file size 5MB
            })
            .test("fileFormat", "Unsupported file format", (value) => {
                return value
                    ? [
                        "image/jpeg",
                        "image/png",
                        "image/jpg",
                        "image/gif",
                    ].includes(value.type)
                    : true;
            }),
    });

    return (
        <Formik
            initialValues={initialFormValues}
            onSubmit={submitHandler}
            validationSchema={validationSchema}
        >
            {({ isSubmitting, setFieldValue, errors }) => (
                <Form>
                    <div
                        style={{
                            fontSize: 12,
                            color: "red",
                            textAlign: "center",
                            fontWeight: 700,
                        }}
                    >
                        Be careful when updating the player DP, as it cannot be
                        updated again.
                    </div>
                    <div>
                        <label htmlFor="playerDp">Player Dp </label>
                        <input
                            name="playerDp"
                            type="file"
                            accept="image/jpeg, image/jpg, image/png, image/gif"
                            onChange={(event) => {
                                setFieldValue(
                                    "playerDp",
                                    event.currentTarget.files[0]
                                );
                            }}
                            className="form-control"
                        />
                    </div>
                    {errors.playerDp && (
                        <div
                            style={{
                                fontSize: 12,
                                color: "red",
                                textAlign: "center",
                                fontWeight: 700,
                            }}
                        >
                            {errors.playerDp}
                        </div>
                    )}
                    <Col className="text-center">
                        <div className="form-actions">
                            <FormSubmissionBtn onCancel={onCancel} />
                            {isSubmitting && <Loader />}
                        </div>
                    </Col>
                </Form>
            )}
        </Formik>
    );
}

export default PlayerForm;
