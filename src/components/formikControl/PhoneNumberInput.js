import { Field, ErrorMessage, getIn } from 'formik';
import React, { useState } from 'react';
import { Form as BSForm } from 'react-bootstrap';
import 'react-phone-number-input/style.css';
import '../../index.css';
import PhoneInputWithCountrySelect from 'react-phone-number-input';

function PhoneNumberInput({
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
                {({
                    field,
                    form: { errors, values, touched, setFieldValue },
                }) => (
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
                        <PhoneInputWithCountrySelect
                            {...props}
                            {...field}
                            placeholder='Enter phone number'
                            value={field.value}
                            initialValueFormat='national'
                            onChange={(value) => {
                                if (onChange) {
                                    onChange(value);
                                    return;
                                }
                                if (value) {
                                    setFieldValue(name, value);
                                    return;
                                }
                            }}
                        />
                    </>
                )}
            </Field>

            <ErrorMessage name={name} component={ErrorFeedback} />
        </BSForm.Group>
    );
}

export default PhoneNumberInput;
