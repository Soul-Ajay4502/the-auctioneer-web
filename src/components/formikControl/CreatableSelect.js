import { Field, ErrorMessage, getIn } from 'formik';
import React from 'react';
import { Form as BSForm } from 'react-bootstrap';
import Creatable from 'react-select/creatable';

function CreatableSelect({
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
                    onChange(isMulti ? [] : {}, action);
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
                    if (action.action === 'create-option') {
                        setFieldValue(name,selected.value)
                        return;
                    }
                    setFieldValue(name, selected ? selected[optionValue] : '');
                }
            }
        }
    };

    return (
        <BSForm.Group className={className} controlId={name}>
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
                                    ${
                                        isMulti
                                            ? validityClass(
                                                  getIn(errors, name),
                                                  values[name][0],
                                                  getIn(touched, name)
                                              )
                                            : validityClass(
                                                  getIn(errors, name),
                                                  getIn(values, name),
                                                  //   values[name],
                                                  getIn(touched, name)
                                              )
                                    }
                                    
                                `}
                                >
                                    *
                                </span>
                            )}
                        </BSForm.Label>

                        <Creatable
                            isClearable
                            isMulti={isMulti}
                            isSearchable
                            name={name}
                            isDisabled={disabled}
                            className='border-0'
                            onChange={(selected, action) =>
                                onChangeHandler(selected, action, setFieldValue)
                            }
                            theme={(theme) => {
                                return {
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
                                };
                            }}
                            styles={{
                                menu: (provided) => ({
                                    ...provided,
                                    zIndex: 10,
                                    fontSize: '.7em',
                                    boxShadow: 'none',
                                    border: '1px solid lightgray',
                                    borderRadius: '0',
                                }),

                                control: (provided, state) => {
                                    return {
                                        ...provided,
                                        fontSize: '.75em',
                                        borderRadius: '0px',
                                        border: 'none',
                                        boxShadow: 'inset 0px -1px 0px #9b9b9b',
                                        marginBottom: '10px',
                                        paddingBottom: '1px',
                                    };
                                },
                            }}
                            getOptionValue={(option) => option[optionValue]}
                            onBlur={() => {
                                setFieldTouched(name, true);
                            }}
                            options={options}
                            getOptionLabel={(option) =>{
                                if(option.__isNew__){
                                    return option.value  
                                }
                                return option[optionLabel]
                            }}
                            {...props}
                        />
                    </>
                )}
            </Field>

            <ErrorMessage name={name} component={ErrorFeedback} />
        </BSForm.Group>
    );
}
export default CreatableSelect;
