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

function LeagueForm({ endpoint, onCancel, onAfterSubmit, updateValues }) {
    const submitHandler = (values, { setSubmitting }) => {
        const body = { ...values, leagueId: updateValues?.leagueId };
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
        leagueName: "",
        leagueFullName: "",
        leagueLocations: "",
        totalPlayers: "",
        totalTeams: "",
        hasUnsold: "no",
        leagueStartDate: "",
        leagueEndDate: "",
        registrationFee: "",
        createdBy: "",
        registrationEndDate: "",
    };

    return (
        <Formik
            initialValues={initialFormValues}
            validationSchema={Yup.object({
                leagueName: Yup.string().required("League name is required."),
                leagueFullName: Yup.string().nullable(),
                leagueLocations: Yup.string()
                    .required("Locations are required.")
                    .matches(
                        /^(\w+(,\w+)*|)$/,
                        "Please use a comma-separated format."
                    ),
                totalPlayers: Yup.string()
                    .matches(/^\d*$/, "Must be a number")
                    .nullable(),
                totalTeams: Yup.string()
                    .matches(/^\d+$/, "Must be a number")
                    .required("Total teams is required."),
                hasUnsold: Yup.string().oneOf(["yes", "no"], "Invalid value"),
                leagueStartDate: Yup.date().nullable(),
                leagueEndDate: Yup.date().nullable(),
                registrationFee: Yup.string()
                    .matches(/^\d*$/, "Must be a number")
                    .nullable(),
                registrationEndDate: Yup.date()
                    .nullable()
                    .required("Registration end date is required."),
            })}
            onSubmit={submitHandler}
        >
            {({ isSubmitting }) => (
                <Form>
                    <Row>
                        <Col md={6}>
                            <FormikControl
                                control="input"
                                required
                                label="League Name"
                                name="leagueName"
                            />
                        </Col>
                        <Col md={6}>
                            <FormikControl
                                control="input"
                                label="League Full Name"
                                name="leagueFullName"
                            />
                        </Col>
                    </Row>
                    <Row>
                        {/* <Col md={6}> */}
                        <FormikControl
                            control="textarea"
                            required
                            label="Locations (comma-separated)"
                            name="leagueLocations"
                        />
                        {/* </Col> */}
                    </Row>
                    <Row>
                        <FormikControl
                            control="input"
                            label="Total Players"
                            name="totalPlayers"
                            type="number"
                        />
                    </Row>
                    <Row>
                        <Col md={6}>
                            <FormikControl
                                control="input"
                                required
                                label="Total Teams"
                                name="totalTeams"
                                type="number"
                            />
                        </Col>
                        <Col md={6}>
                            <FormikControl
                                control="check"
                                type="radio"
                                required
                                label="Has Unsold"
                                name="hasUnsold"
                                options={[
                                    { key: "Yes", value: "yes" },
                                    { key: "No", value: "no" },
                                ]}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <FormikControl
                                control="input"
                                type="date"
                                label="League Start Date"
                                name="leagueStartDate"
                            />
                        </Col>
                        <Col md={6}>
                            <FormikControl
                                control="input"
                                type="date"
                                label="League End Date"
                                name="leagueEndDate"
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <FormikControl
                                control="input"
                                label="Registration Fee"
                                name="registrationFee"
                                type="number"
                            />
                        </Col>
                        <Col md={6}>
                            <FormikControl
                                control="input"
                                required
                                type="date"
                                label="Registration End Date"
                                name="registrationEndDate"
                            />
                        </Col>
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

export default LeagueForm;
