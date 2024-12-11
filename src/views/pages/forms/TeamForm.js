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

        const body = { ...values, leagueId: leagueDetails.leagueId };
        axios
            .post(endpoint, body)
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
    };

    return (
        <Formik
            initialValues={initialFormValues}
            validationSchema={Yup.object({
                teamName: Yup.string().required("Team name is required."),
                teamOwner: Yup.string().nullable(),
                teamOwnerPhone: Yup.string().nullable().matches(/^\d+$/, "Phone number must be a number"),
                jerseyColor: Yup.string().nullable(),

            })}
            onSubmit={submitHandler}
        >
            {({ isSubmitting, setFieldValue }) => (
                <Form>
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

                        <div>
                            <label htmlFor="teamLogo">Team Logo</label>
                            <input
                                name="teamLogo"
                                type="file"
                                accept="image/jpeg, image/jpg, image/png, image/gif"
                                onChange={(event) => {
                                    setFieldValue("teamLogo", event.currentTarget.files[0].name);
                                }}
                                className="form-control"
                            />
                        </div>

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
