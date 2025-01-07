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

    const isSameDate = (date, date2 = new Date()) => {
        const date1 = new Date(date);
        return (
            date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate()
        );
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
        playerBasePrice: "",
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
                    .required(),
                totalTeams: Yup.string()
                    .matches(/^\d+$/, "Must be a number")
                    .required("Total teams is required."),
                hasUnsold: Yup.string().oneOf(["yes", "no"], "Invalid value"),
                leagueStartDate: Yup.date().required(),
                leagueEndDate: Yup.date().required(),
                registrationFee: Yup.string()
                    .matches(/^\d*$/, "Must be a number")
                    .required(),
                registrationEndDate: Yup.date().required(
                    "Registration end date is required."
                ),
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
                                required
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
                        <Col md={6}>
                            <FormikControl
                                control="input"
                                label="Total Players"
                                name="totalPlayers"
                                type="number"
                                required
                            />
                        </Col>
                        <Col md={6}>
                            <FormikControl
                                control="input"
                                label="Player Base Price"
                                name="playerBasePrice"
                                type="number"
                                required
                            />
                        </Col>
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
                                required
                            />
                        </Col>
                        <Col md={6}>
                            <FormikControl
                                control="input"
                                type="date"
                                label="League End Date"
                                name="leagueEndDate"
                                required
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
                                required
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
                        <Col md={6}>
                            <FormikControl
                                control="input"
                                type="date"
                                label="Auction Start Date"
                                name="auctionStartDate"
                                required
                            />
                        </Col>
                        <Col md={6}>
                            <FormikControl
                                control="input"
                                required
                                label="Total Bid Amount Per Team"
                                name="bidAmountPerTeam"
                                type="number"
                                disabled={isSameDate(
                                    updateValues?.auctionStartDate
                                )}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <div
                            style={{
                                textAlign: 'center',
                                color: 'white',
                                backgroundColor: 'darkred',
                                padding: '10px',
                                borderRadius: '8px',
                                fontSize: '18px',
                                fontWeight: 'bold',
                                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)'
                            }}
                        >
                            Data Needed For Auction - Handle With Care
                        </div>

                        <div
                            style={{
                                textAlign: 'left',
                                color: 'darkred',
                                marginTop: '10px',
                                fontSize: '16px',
                                fontWeight: 'bold',
                                borderLeft: '4px solid darkred',
                                paddingLeft: '8px',
                            }}
                        >
                            Hint : use comma separated in the input fields
                        </div>

                        <div
                            style={{
                                textAlign: 'left',
                                color: 'black',
                                marginTop: '5px',
                                fontSize: '14px',
                                padding: '8px',
                                backgroundColor: '#f8d7da',
                                borderRadius: '6px',
                                border: '1px solid #f5c2c7',
                            }}
                        >
                            Eg: Auction Break Points: 500, 1000, 1500
                        </div>

                        <div
                            style={{
                                textAlign: 'left',
                                color: 'black',
                                marginTop: '5px',
                                fontSize: '14px',
                                padding: '8px',
                                backgroundColor: '#f8d7da',
                                borderRadius: '6px',
                                border: '1px solid #f5c2c7',
                            }}
                        >
                            Eg: Auction Increment Points: 100, 200, 500
                        </div>



                        <Col md={6}>
                            <FormikControl
                                control="input"
                                label="Auction Break Points"
                                name="breakPoints"
                                required
                            />
                        </Col>
                        <Col md={6}>
                            <FormikControl
                                control="input"
                                required
                                label="Auction Increments"
                                name="increments"
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
