import { Field, ErrorMessage, getIn } from 'formik';
import React, { useState } from 'react';
import { Collapse } from 'react-bootstrap';
import TagsInput from 'react-tagsinput';

function Tags(props) {
    const {
        label,
        name,
        required = false,
        renderImage = false,
        ErrorFeedback,
        validityClass,
        fontSize,
        keyProp,
        labelMap,
        ...rest
    } = props;

    const [showTooltip, setShowTooltip] = useState(false);

    return (
        <>
            <Field name={name}>
                {({
                    field,
                    form: { errors, values, touched, setFieldValue },
                }) => (
                    <>
                        <label>
                            {label || labelMap[name] || name}
                            {required && (
                                <span
                                    className={`small ${validityClass(
                                        errors[name],
                                        values[name][0],
                                        touched[name]
                                    )}`}
                                >
                                    *
                                </span>
                            )}
                        </label>

                        <TagsInput
                            className='mb-2 rounded'
                            inputProps={{
                                className: 'form-control',
                                placeholder: 'Add',
                                onFocus: () => {
                                    setShowTooltip(true);
                                },
                                onBlur: (e) => {
                                    field.onBlur(e);
                                    setShowTooltip(false);
                                },
                                name: name,
                            }}
                            renderTag={(props) => {
                                let {
                                    tag,
                                    key,
                                    disabled,
                                    onRemove,
                                    classNameRemove,
                                    getTagDisplayValue,
                                    ...other
                                } = props;
                                return (
                                    <div
                                        key={key}
                                        {...other}
                                        className=' bg-light text-primary me-2 mb-1 px-1 d-inline-flex rounded border shadow-sm'
                                    >
                                        {getTagDisplayValue(tag)}

                                        {!disabled && (
                                            <span
                                                className='ps-1 text-danger'
                                                type='button'
                                                aria-hidden='true'
                                                onClick={(e) => onRemove(key)}
                                            >
                                                {' '}
                                                ×
                                            </span>
                                        )}
                                    </div>
                                );
                            }}
                            onlyUnique
                            addOnBlur
                            value={field.value}
                            name={name}
                            onChange={(tags) => {
                                setFieldValue(name, tags);
                            }}
                            tagDisplayProp={keyProp}
                            {...rest}
                        />
                    </>
                )}
            </Field>

            <Collapse in={showTooltip}>
                <div className='small text-muted mb-1 ms-1'>
                    Type and press enter to add
                </div>
            </Collapse>

            <ErrorMessage name={name} component={ErrorFeedback} />
        </>
    );
}

export default Tags;