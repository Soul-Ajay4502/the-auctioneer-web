import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import FormikControl from "../../../components/formikControl/FormikControl";
import Loader from "../../../components/Loader";
import FormSubmissionBtn from "../../../components/FormSubmissionBtn";
import { Row, Col } from "react-bootstrap"; // Import Row and Col from React-Bootstrap
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is imported
import "./LeagueForm.css"; // Import any additional CSS
import { useLeagueState } from "../../../context/League.context";

function TeamForm({ endpoint, onCancel, onAfterSubmit, updateValues }) {
    const { selectedLeague } = useLeagueState();
    const { leagueDetails } = selectedLeague;

    const submitHandler = (values, { setSubmitting }) => {
        const formData = new FormData();
        const body = {
            ...values,
            leagueId: leagueDetails?.leagueId,
            playerBasePrice: leagueDetails?.playerBasePrice,
            folderName: leagueDetails?.leagueName,
            minimumPlayerCount: leagueDetails?.minimumPlayerCount,
        };

        if (body.teamLogo instanceof File) {
            formData.append("teamLogo", body.teamLogo);
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

    const initialFormValues = updateValues || {
        teamName: "",
        teamOwner: "",
        teamOwnerPhone: "",
        leagueId: "",
        jerseyColor: "",
        teamLogo: "",
        maxAmountForBid: leagueDetails?.bidAmountPerTeam,
    };

    return (
        <Formik
            initialValues={initialFormValues}
            validationSchema={Yup.object({
                teamName: Yup.string().required("Team name is required."),
                teamOwner: Yup.string().nullable(),
                teamOwnerPhone: Yup.string()
                    .nullable()
                    .matches(/^\d+$/, "Phone number must be a number"),
                jerseyColor: Yup.string().nullable(),
            })}
            onSubmit={submitHandler}
        >
            {({ isSubmitting, setFieldValue }) => (
                <Form>
                    {!updateValues && (
                        <div
                            style={{
                                fontSize: 12,
                                color: "red",
                                textAlign: "center",
                                fontWeight: 700,
                            }}
                        >
                            Be careful when uploading the team logo, as it
                            cannot be updated or edited.
                        </div>
                    )}
                    <Row>
                        <Col md={6}>
                            <FormikControl
                                control="input"
                                required
                                label="Team Name"
                                name="teamName"
                            />
                        </Col>
                        <Col md={6}>
                            <FormikControl
                                control="input"
                                label="Team Owner"
                                name="teamOwner"
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <FormikControl
                                control="input"
                                label="Team Owner Phone"
                                name="teamOwnerPhone"
                            />
                        </Col>

                        <Col md={6}>
                            <FormikControl
                                control="input"
                                label="Jersey Color"
                                name="jerseyColor"
                            />
                        </Col>

                        {!updateValues && (
                            <div>
                                <label htmlFor="teamLogo">Team Logo</label>
                                <input
                                    name="teamLogo"
                                    type="file"
                                    accept="image/jpeg, image/jpg, image/png, image/gif"
                                    onChange={(event) => {
                                        setFieldValue(
                                            "teamLogo",
                                            event.currentTarget.files[0]
                                        );
                                    }}
                                    className="form-control"
                                />
                            </div>
                        )}
                    </Row>
                    <Row>
                        <FormikControl
                            control="input"
                            required
                            label="Total Bid Amount"
                            name="maxAmountForBid"
                            type="number"
                            disabled
                        />
                    </Row>
                    <Row>
                        <Col className="text-center">
                            <div className="form-actions">
                                <FormSubmissionBtn onCancel={onCancel} />
                                {isSubmitting && <Loader />}
                            </div>
                        </Col>
                    </Row>
                </Form>
            )}
        </Formik>
    );
}

export default TeamForm;
