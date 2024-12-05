import { Field, ErrorMessage, getIn } from 'formik';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import moment from 'moment';
import React from 'react';
import { Form as BSForm } from 'react-bootstrap';

function Time({
    name,
    onChange,
    label,
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
            className={className}
            controlId={name}
        >
            <Field name={name}>
                {({ form: { errors, touched, values, setFieldValue } }) => (
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
                        <TimePicker
                            showSecond={false}
                            value={
                                values[name] ? moment(values[name]) : moment()
                            }
                            className='form-control'
                            required
                            onChange={(date) => {
                                if (onChange) {
                                    onChange(date);
                                } else {
                                    if (date) {
                                        setFieldValue(name, date._d);
                                    } else {
                                        setFieldValue(name, moment()._d);
                                    }
                                }
                            }}
                            format={'h:mm a'}
                            use12Hours
                            {...props}
                        />
                    </>
                )}
            </Field>

            <ErrorMessage name={name} component={ErrorFeedback} />
        </BSForm.Group>
    );
}
export default Time;
