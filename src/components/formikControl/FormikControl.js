import React from "react";
import { Form as BSForm } from "react-bootstrap";
import Input from "./Input";
import Textarea from "./Textarea";
import BuiltInSelect from "./BuiltInSelect";
import AdvancedSelect from "./AdvancedSelect";
import Check from "./Check";
import SelectWithAdd from "./SelectWithAdd";
// import Time from './Time';
// import { useLabelProvider } from "../../context/LabelProvider";
import CreatableSelect from "./CreatableSelect";
// import PhoneNumberInput from "./PhoneNumberInput";
import SelectWithFixedOptions from "./SelectWithFixedOptions";
import PaginatedSelect from "./PaginatedSelect";
import ImageInput from "./ImageInput";

function FormikControl({ control, children, viewProp, ...rest }) {
    const { labelMap } = {};

    const fontSize = ".8em";

    switch (control) {
        case "input":
            return (
                <Input
                    fontSize={fontSize}
                    {...rest}
                    ErrorFeedback={ErrorFeedback}
                    validityClass={validityClass}
                    labelMap={labelMap}
                />
            );
        case "image":
            return (
                <ImageInput
                    fontSize={fontSize}
                    {...rest}
                    ErrorFeedback={ErrorFeedback}
                    validityClass={validityClass}
                    labelMap={labelMap}
                />
            );
        case "textarea":
            return (
                <Textarea
                    fontSize={fontSize}
                    {...rest}
                    ErrorFeedback={ErrorFeedback}
                    validityClass={validityClass}
                    labelMap={labelMap}
                />
            );
        case "select":
            return (
                <BuiltInSelect
                    fontSize={fontSize}
                    {...rest}
                    ErrorFeedback={ErrorFeedback}
                    validityClass={validityClass}
                    labelMap={labelMap}
                >
                    {children}
                </BuiltInSelect>
            );
        case "select-advanced":
            return (
                <AdvancedSelect
                    fontSize={fontSize}
                    {...rest}
                    ErrorFeedback={ErrorFeedback}
                    validityClass={validityClass}
                    labelMap={labelMap}
                />
            );
        case "creatable-select":
            return (
                <CreatableSelect
                    fontSize={fontSize}
                    {...rest}
                    ErrorFeedback={ErrorFeedback}
                    validityClass={validityClass}
                    labelMap={labelMap}
                />
            );
        case "select-add":
            return (
                <SelectWithAdd
                    fontSize={fontSize}
                    {...rest}
                    ErrorFeedback={ErrorFeedback}
                    validityClass={validityClass}
                    labelMap={labelMap}
                />
            );
        case "check":
            return (
                <Check
                    fontSize={fontSize}
                    {...rest}
                    ErrorFeedback={ErrorFeedback}
                    validityClass={validityClass}
                    labelMap={labelMap}
                />
            );
        // case 'time':
        //     return (
        //         <Time
        //             fontSize={fontSize}
        //             {...rest}
        //             ErrorFeedback={ErrorFeedback}
        //             validityClass={validityClass}
        //             labelMap={labelMap}
        //         />
        //     );
        case "SelectWithFixedOptions":
            return (
                <SelectWithFixedOptions
                    fontSize={fontSize}
                    {...rest}
                    ErrorFeedback={ErrorFeedback}
                    validityClass={validityClass}
                    labelMap={labelMap}
                />
            );
        case "PaginatedSelect":
            return (
                <PaginatedSelect
                    fontSize={fontSize}
                    {...rest}
                    ErrorFeedback={ErrorFeedback}
                    validityClass={validityClass}
                    labelMap={labelMap}
                />
            );
        default:
            return (
                <Input
                    fontSize={fontSize}
                    {...rest}
                    ErrorFeedback={ErrorFeedback}
                    validityClass={validityClass}
                    labelMap={labelMap}
                />
            );
    }
}

const validityClass = (error, value, touched) => {
    if (!error && value === 0) {
        return "text-success";
    }
    if (!touched && !value) {
        return "text-danger";
    }
    if (!!error || !value) {
        return "text-danger";
    } else {
        return "text-success";
    }
};
const ErrorFeedback = ({ children }) => (
    <BSForm.Control.Feedback
        type="invalid"
        style={{
            top: "auto",
            left: "auto",
            border: "1px solid tomato",
            fontSize: ".7em",
        }}
        className="bg-white text-danger rounded-0 d-block py-0 mt--0"
        tooltip
    >
        {children}
    </BSForm.Control.Feedback>
);

export default FormikControl;
