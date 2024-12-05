import { Field, ErrorMessage, getIn } from 'formik';
import React from 'react';
import { Form as BSForm } from 'react-bootstrap';

function BuiltInSelect({
    name,
    label,
    children,
    onChange,
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
                {({ field, form: { errors, touched, values } }) => (
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
                            as='select'
                            style={{ fontSize: fontSize }}
                            {...field}
                            size={size}
                            {...props}
                            required={required}
                            onChange={(e) => {
                                if (onChange) {
                                    onChange(e);
                                    return;
                                }
                                field.onChange(e);
                            }}
                        >
                            {children}
                        </BSForm.Control>
                    </>
                )}
            </Field>

            <ErrorMessage name={name} component={ErrorFeedback} />
        </BSForm.Group>
    );
}
export default BuiltInSelect