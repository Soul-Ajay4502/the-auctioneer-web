import { Field, ErrorMessage, getIn } from 'formik';
import React from 'react';
import { Form as BSForm } from 'react-bootstrap';

function TextArea({
    name,
    resize = true,
    onChange,
    label,
    height = '105px',
    required = false,
    className = 'mb-3',
    ErrorFeedback,
    validityClass,
    fontSize,
    labelMap,
    ...props
}) {
    return (
        <BSForm.Group
            className={`${className ? className : ''}`}
            controlId={name}
        >
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
                            as='textarea'
                            {...field}
                            onChange={(e) => {
                                if (e.target.value === ' ') {
                                    return;
                                }
                                if (onChange) {
                                    onChange(e);
                                    return;
                                }
                                field.onChange(e);
                            }}
                            {...props}
                            required={required}
                            autoComplete='off'
                            style={{
                                resize: resize ? 'block' : 'none',
                                height: height,
                                fontSize: fontSize,
                                border: '1px solid #9b9b9b',
                                boxShadow: 'none'
                            }}
                        />
                    </>
                )}
            </Field>

            <ErrorMessage name={name} component={ErrorFeedback} />
        </BSForm.Group>
    );
}
export default TextArea