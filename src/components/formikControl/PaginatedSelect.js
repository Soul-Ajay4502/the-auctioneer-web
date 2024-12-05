import React, { useEffect, useState, useCallback } from 'react';
import { Field, ErrorMessage, getIn } from 'formik';
import { Form as BSForm } from 'react-bootstrap';
import Select from 'react-select';
import axios from 'axios';

function PaginatedSelect({
    name,
    options = [],
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
    endpoint,
    pageLimit = 20,
    ...props
}) {
    const [dropdownOptions, setDropdownOptions] = useState(options);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [menuIsOpen, setMenuIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    // Debounce function outside the component for reusability
    const debounce = (func, delay) => {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func(...args), delay);
        };
    };

    const fetchOptions = async ({ bottom = false }) => {

        if ((!hasMore && bottom) || loading) return;
        setLoading(true);
        try {
            const url = searchTerm
                ? `${endpoint}?page=${page}&limit=${pageLimit}&searchTerm=${searchTerm}`
                : `${endpoint}?page=${page}&limit=${pageLimit}`;

            const response = await axios.get(url);

            if (bottom || searchTerm) setMenuIsOpen(true);
            const dataToBeListed = response.data.responseData.responseData;
            const paginationResponse = response.data.responseData.pagination;

            const fetchedOptions = dataToBeListed || [];
            const moreDataAvailable = page < paginationResponse.totalPages;

            setDropdownOptions((prevOptions) => {
                const existingIds = new Set(prevOptions.map((item) => item[optionValue]));
                const uniqueOptions = fetchedOptions.filter((item) => !existingIds.has(item[optionValue]));
                return [...prevOptions, ...uniqueOptions];
            });

            setHasMore(moreDataAvailable);
        } catch (error) {
            console.error('Error fetching options:', error);
        } finally {
            setLoading(false);
        }
    };

    const debouncedFetchOptions = useCallback(
        debounce(fetchOptions, 1000),
        [searchTerm, page] // Add searchTerm here to refetch data when it changes
    );

    useEffect(() => {


        if (searchTerm) {

            setDropdownOptions([]); // Clear options when search term changes
            debouncedFetchOptions({ bottom: false });
        } else {
            fetchOptions({ bottom: false });
        }
    }, [searchTerm]);

    const handleInputChange = (newValue) => {
        // if (newValue)
        setSearchTerm(newValue);
    };

    const onChangeHandler = (selected, action, setFieldValue) => {
        if (keyProp) {
            if (isMulti) {
                const temp = selected.map((item) => ({ [keyProp]: item[optionValue] }));
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
                    setFieldValue(name, selected.map((obj) => obj[optionValue]));
                } else {
                    setFieldValue(name, selected ? selected[optionValue] : '');
                }
            }
        }
    };

    return (
        <BSForm.Group className={className} controlId={name}>
            <Field name={name}>
                {({
                    form: { errors, touched, values, setFieldValue, setFieldTouched },
                }) => (
                    <>
                        <BSForm.Label>
                            {label || labelMap[name] || name || 'Provide Label'}
                            {required && (
                                <span className={` ${isMulti ? validityClass(getIn(errors, name), values[name][0], getIn(touched, name)) : validityClass(getIn(errors, name), getIn(values, name), getIn(touched, name))}`}>*</span>
                            )}
                        </BSForm.Label>

                        <Select
                            inputValue={searchTerm}
                            isClearable
                            isMulti={isMulti}
                            isSearchable
                            name={name}
                            isDisabled={disabled}
                            menuIsOpen={menuIsOpen}
                            onFocus={() => setMenuIsOpen(true)}
                            className="border-0"
                            onChange={(selected, action) => {
                                onChangeHandler(selected, action, setFieldValue);
                                if (!isMulti) {
                                    setSearchTerm('');
                                    setMenuIsOpen(false);
                                }
                            }}
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
                            styles={{
                                menu: (provided) => ({

                                    zIndex: 10,
                                    fontSize: '.7em',
                                    boxShadow: 'none',
                                    border: '1px solid lightgray',
                                    borderRadius: '0',
                                    maxHeight: 260,
                                    overflow: 'hidden',
                                    ...provided,
                                }),
                                control: (provided) => ({
                                    ...provided,
                                    fontSize: '.75em',
                                    borderRadius: '0px',
                                    border: 'none',
                                    boxShadow: 'inset 0px -1px 0px #9b9b9b',
                                    paddingBottom: '1px',
                                }),
                            }}
                            getOptionValue={(option) => option[optionValue]}
                            getOptionLabel={(option) => option[optionLabel]}
                            options={dropdownOptions}
                            onBlur={() => {
                                setFieldTouched(name, true);
                                setMenuIsOpen(false);
                                setSearchTerm('')
                            }}
                            onMenuScrollToBottom={() => {
                                if (hasMore) {
                                    setPage((prevPage) => prevPage + 1);
                                    fetchOptions({ bottom: true });
                                }
                            }}
                            onInputChange={handleInputChange}
                            {...props}
                        />
                    </>
                )}
            </Field>
            <ErrorMessage name={name} component={ErrorFeedback} />
        </BSForm.Group>
    );
}

export default PaginatedSelect;
