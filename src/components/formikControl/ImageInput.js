import { Field, ErrorMessage, getIn } from 'formik';
import React from 'react';
import { Form as BSForm } from 'react-bootstrap';

function ImageInput({
    name,
    label,
    className = 'mb-3',
    size = 'md',
    required = false,
    ErrorFeedback,
    validityClass,
    fontSize,
    labelMap,
    onChange,
    ...props
}) {
    return (
        <BSForm.Group className={className} controlId={name}>
            <Field name={name}>
                {({ field, form: { errors, values, touched } }) => (
                    <>
                        <BSForm.Label>
                            {label || labelMap[name] || name}
                            {required && (
                                <span
                                    className={`small ${validityClass(
                                        getIn(errors, name),
                                        getIn(values, name),
                                        getIn(touched, name)
                                    )}`}> *
                                </span>
                            )}
                        </BSForm.Label>

                        <BSForm.Control
                            {...field}
                            {...props}
                            required={required}
                            type="file"
                            size={size}
                            style={{ fontSize: fontSize }}
                            onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                    if (onChange) {
                                        onChange(e); // Call the provided onChange function
                                    }
                                    // Manually set the field value to the file object
                                    field.onChange(e);
                                }
                            }}
                            autoComplete="off"
                        />
                    </>
                )}
            </Field>

            <ErrorMessage name={name} component={ErrorFeedback} />
        </BSForm.Group>
    );
}

export default ImageInput;
