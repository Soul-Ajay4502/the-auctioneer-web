import { Field, ErrorMessage, getIn } from 'formik';
import React from 'react';
import { Form as BSForm } from 'react-bootstrap';

function FormikInput({
    type = 'text',
    name,
    onChange,
    label,
    className = 'mb-3',
    size = 'md',
    required = false,
    ErrorFeedback,
    validityClass,
    fontSize,
    labelMap,
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
                                    )}`}
                                >
                                    *
                                </span>
                            )}
                        </BSForm.Label>

                        <BSForm.Control
                            {...field}
                            {...props}
                            required={required}
                            type={type}
                            size={size}
                            style={{ fontSize: fontSize }}
                            onChange={(e) => {
                                if(e.target.value === ' '){
                                    return
                                }
                                if (onChange) {
                                    onChange(e);
                                    return
                                }
                                field.onChange(e);
                            }}
                            autoComplete='off'
                        />
                    </>
                )}
            </Field>

            <ErrorMessage name={name} component={ErrorFeedback} />
        </BSForm.Group>
    );
}

export default FormikInput;
