import React, { useState } from 'react';
import { CloseButton, Modal } from 'react-bootstrap';

function WithModal({
    renderModalBody = () => { },
    onHiding = () => { },
    modalTitle,
    modalAttrs,
    children,
    disabled,
    disableHeader = false,
}) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <div
                type={`${disabled ? '' : 'button'}`}
                className="d-inline-block"
                style={{ opacity: disabled ? '.5' : '1' }}
                onClick={() => {
                    if (disabled) return;
                    setIsModalOpen(true);
                }}
            >
                {children}
            </div>

            <Modal
                centered
                show={isModalOpen}
                onHide={() => {
                    onHiding();
                    closeModal();
                }}
                backdrop="static"
                {...modalAttrs}
            >
                {!disableHeader && (
                    <div
                        className="pb-2 pt-4 px-4 text-center"
                        style={{ display: 'flex' }}
                    >
                        <span
                            className="m-0 h5"
                            style={{ textAlign: 'start', width: '80%' }}
                        >
                            {modalTitle}
                        </span>
                    </div>
                )}
                <CloseButton
                    onClick={closeModal}
                    style={{
                        marginTop: 8,
                        width: '6%',
                        marginLeft: 'auto',
                    }}
                />

                <Modal.Body className="p-4 p-md-4">
                    {renderModalBody(closeModal)}
                </Modal.Body>
            </Modal>
        </>
    );
}

export default WithModal;
