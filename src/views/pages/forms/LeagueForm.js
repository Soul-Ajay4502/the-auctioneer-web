import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import FormikControl from "../../../components/formikControl/FormikControl";
import Loader from "../../../components/Loader";
import FormSubmissionBtn from "../../../components/FormSubmissionBtn";
import "./LeagueForm.css"; // Import CSS for grid styling

function LeagueForm({ endpoint, onCancel, onAfterSubmit, updateValues }) {
    const submitHandler = (values, { setSubmitting }) => {
        axios
            .post(endpoint, values)
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
                // leagueEndDate: Yup.date()
                //     .nullable()
                //     .required("League end date is required.")
                //     .when("leagueStartDate", (leagueStartDate, schema) => {
                //         return leagueStartDate
                //             ? schema.min(
                //                   new Date(leagueStartDate),
                //                   "End date must be after the start date"
                //               )
                //             : schema;
                //     }),

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
                <Form className="league-form-grid">
                    <FormikControl
                        control="input"
                        required
                        label="League Name"
                        name="leagueName"
                    />
                    <FormikControl
                        control="input"
                        label="League Full Name"
                        name="leagueFullName"
                    />

                    <FormikControl
                        control="textarea"
                        required
                        label="Locations (comma-separated)"
                        name="leagueLocations"
                    />
                    <FormikControl
                        control="input"
                        label="Total Players"
                        name="totalPlayers"
                        type="number"
                    />

                    <FormikControl
                        control="input"
                        required
                        label="Total Teams"
                        name="totalTeams"
                        type="number"
                    />
                    <FormikControl
                        control="check"
                        required
                        label="Has Unsold"
                        name="hasUnsold"
                        options={[
                            { key: "Yes", value: "yes" },
                            { key: "No", value: "no" },
                        ]}
                    />

                    <FormikControl
                        control="input"
                        type="date"
                        label="League Start Date"
                        name="leagueStartDate"
                    />
                    <FormikControl
                        control="input"
                        type="date"
                        label="League End Date"
                        name="leagueEndDate"
                    />

                    <FormikControl
                        control="input"
                        label="Registration Fee"
                        name="registrationFee"
                        type="number"
                    />

                    <FormikControl
                        control="input"
                        required
                        type="date"
                        label="Registration End Date"
                        name="registrationEndDate"
                    />

                    <div className="form-actions">
                        <FormSubmissionBtn onCancel={onCancel} />
                        {isSubmitting && <Loader />}
                    </div>
                </Form>
            )}
        </Formik>
    );
}

export default LeagueForm;
