import React from 'react';
import { Col, Row } from 'react-bootstrap';
import ModalWrapper from '../ModalWrapper';
import AdvancedSelect from './AdvancedSelect';

const DefaultModalBody = () => <div>Please provide Form</div>;

function SelectWithAdd(props) {
    const {
        name,
        options,
        label = '',
        Form = DefaultModalBody,
        formProps = {
            onAfterSubmit,
            endpoint,
            formSize,
            title,
        },
        ...rest
    } = props;

    const {
        onAfterSubmit = () => {},
        endpoint = '',
        formSize = 'md',
        title = '',
        ...restFormProps
    } = formProps;

    return (
        <div className='mb-1'>
            <Row className='align-items-end mb-1'>
                <Col lg={10} className='pe-0'>
                    <AdvancedSelect
                        options={options}
                        name={name}
                        label={label}
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
                                    // marginBottom: '10px',
                                    paddingBottom: '1px',
                                };
                            },
                        }}
                        className='mb-0'
                        {...rest}
                    />
                </Col>

                <Col
                    lg={2}
                    className='ps-0 mb-0' //this margin must equals to the form-group margin
                >
                    <ModalWrapper
                        modalTitle={'Add ' + title}
                        modalAttrs={{ size: formSize }}
                        renderModalBody={(closeModal) => (
                            <Form
                                onCancel={closeModal}
                                onAfterSubmit={() => {
                                    closeModal();
                                    onAfterSubmit();
                                }}
                                endpoint={endpoint}
                                {...restFormProps}
                            />
                        )}
                    >
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                minHeight: '36px',
                                background: 'white',
                                fontSize: '1.1em',
                                fontWeight: '600',
                                color: '#cccccc',
                                boxShadow: 'inset 0px -1px 0px #9b9b9b',
                                padding: '2px 4px 0 0',
                                padding: '0 10px'
                            }}
                        >
                            +
                        </div>
                    </ModalWrapper>
                </Col>
            </Row>

            <div className='d-flex px-1 small'>
                <span className='text-muted small'>Could'nt find ?</span>
                <span className='text-muted small ms-auto'>Add</span>
            </div>
        </div>
    );
}

export default SelectWithAdd;
