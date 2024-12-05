import { Field, ErrorMessage, getIn } from 'formik';
import React from 'react';
import { Form as BSForm } from 'react-bootstrap';

function Check({
    type = 'checkbox',
    label,
    options = [{ key: 'Provide options', value: '1' }],
    name,
    className = 'mb-3',
    required = false,
    onChange,
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
                {({ field, form: { values, errors, touched } }) => (
                    <>
                        <label>
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
                        </label>

                        <div className='d-flex '>
                            {options.map((option) => (
                                <BSForm.Check
                                    {...field}
                                    {...props}
                                    key={option.value}
                                    name={name}
                                    value={option.value}
                                    type={type}
                                    required={required}
                                    onChange={(e) => {
                                        
                                        if (onChange) {
                                            onChange(e);
                                            return;
                                        }
                                        field.onChange(e);
                                    }}
                                    style={{ fontSize: fontSize }}
                                    checked={
                                        type === 'radio'
                                            ? String(field.value) ===
                                              String(option.value)
                                            : String(field.value).includes(
                                                  String(option.value)
                                              )
                                    }
                                    label={option.key}
                                    className='px-4'
                                    id={name + option.key}
                                />
                            ))}
                        </div>
                    </>
                )}
            </Field>

            <ErrorMessage name={name} component={ErrorFeedback} />
        </BSForm.Group>
    );
}

export default Check;