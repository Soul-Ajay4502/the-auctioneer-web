import { Field, ErrorMessage, getIn } from 'formik';
import React from 'react';
import { Form as BSForm } from 'react-bootstrap';
import Select from 'react-select';

const defaultStyles = {
    multiValue: (base, state) => ({
        ...base,
        backgroundColor: state.data.isFixed ? '#d2cad9' : base.backgroundColor,
    }),
    multiValueLabel: (base, state) => ({
        ...base,
        fontWeight: state.data.isFixed ? base.fontWeight : base.fontWeight,
        color: state.data.isFixed ? '#656366' : base.color,
        paddingRight: state.data.isFixed ? 6 : base.paddingRight,
    }),
    multiValueRemove: (base, state) => ({
        ...base,
        display: state.data.isFixed ? 'none' : base.display,
    }),
};

function SelectWithFixedOptions({
    name,
    options = [{ name: 'provide options' }],
    optionValue = 'name',
    optionLabel = 'name',
    label,
    onChange,
    isMulti = false,
    className = 'mb-3',
    disabled = false,
    size = 'md',
    required = false,
    ErrorFeedback,
    validityClass,
    fontSize,
    keyProp = '',
    labelMap,
    hideOptionProperty = '',
    ...props
}) {
    const onChangeHandler = (selected, action, setFieldValue) => {
        if (!!keyProp) {
            if (isMulti) {
                const temp = [];
                selected.forEach((item) => {
                    temp.push({
                        [keyProp]: item[optionValue],
                    });
                });
                setFieldValue(name, temp);
            } else {
                setFieldValue(
                    name,
                    selected ? { [keyProp]: selected[optionValue] } : ''
                );
            }
        } else {
            if (onChange) {
                if (action.action === 'clear') {
                    // Handle clear action while keeping fixed options selected
                    const fixedValues = options.filter((opt) => opt.isFixed);
                    onChange(fixedValues, action);
                    return;
                }
                onChange(selected, action);
            } else {
                if (isMulti) {
                    setFieldValue(
                        name,
                        selected.map((obj) => obj[optionValue])
                    );
                } else {
                    setFieldValue(name, selected ? selected[optionValue] : '');
                }
            }
        }
    };

    // Filter options based on hideOptionProperty
    const filteredOptions = options.filter((option) => {
        return !option[hideOptionProperty];
    });

    const styles = {
        ...defaultStyles,
        ...props.styles,
    };

    return (
        <BSForm.Group
            className={className}
            controlId={name}
        >
            <Field name={name}>
                {({
                    form: {
                        errors,
                        touched,
                        values,
                        setFieldValue,
                        setFieldTouched,
                    },
                }) => (
                    <>
                        <BSForm.Label>
                            {label || labelMap[name] || name || 'Provide Label'}
                            {required && (
                                <span
                                    className={`
                                        ${isMulti
                                            ? validityClass(
                                                getIn(errors, name),
                                                values[name][0],
                                                getIn(touched, name)
                                            )
                                            : validityClass(
                                                getIn(errors, name),
                                                getIn(values, name),
                                                getIn(touched, name)
                                            )
                                        }
                                    `}
                                >
                                    *
                                </span>
                            )}
                        </BSForm.Label>

                        <Select
                            isClearable={false}
                            isMulti={isMulti}
                            isSearchable
                            name={name}
                            isDisabled={disabled}
                            className='border-0'
                            onChange={(selected, action) =>
                                onChangeHandler(selected, action, setFieldValue)
                            }
                            theme={(theme) => ({
                                ...theme,
                                colors: {
                                    ...theme.colors,
                                    primary: '#5FB3F6',
                                },
                                spacing: {
                                    ...theme.spacing,
                                    controlHeight: 10,
                                    baseUnit: 3,
                                },
                            })}
                            styles={styles}
                            getOptionValue={(option) => option[optionValue]}
                            onBlur={() => {
                                setFieldTouched(name, true);
                            }}
                            onKeyDown={(e) => {
                                if (e.key === 'Backspace') {
                                    e.preventDefault();
                                }
                            }}
                            options={filteredOptions}
                            getOptionLabel={(option) => option[optionLabel]}
                            {...props}
                        />
                    </>
                )}
            </Field>

            <ErrorMessage
                name={name}
                component={ErrorFeedback}
            />
        </BSForm.Group>
    );
}

export default SelectWithFixedOptions;
