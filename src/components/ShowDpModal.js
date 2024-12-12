import React, { useState } from "react";
import { CloseButton, Modal } from "react-bootstrap";

function ShowDpModal({
    renderModalBody = () => { },
    onHiding = () => { },
    modalTitle,
    modalAttrs,
    children,
    disabled,
    showFooter = false,
    showTitle = true
}) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <div
                type={`${disabled ? "" : "button"}`}
                className="d-inline-block"
                style={{ opacity: disabled ? ".5" : "1" }}
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
                scrollable={true}
                {...modalAttrs}
            >
                <div className="pb-2 pt-5 px-4 text-center">
                    {showTitle && <div
                        className="m-0 h5 pe-2"
                        style={{
                            borderRadius: 10,
                            padding: "10px",
                            fontSize: "1.5rem", // Customize font size
                            fontWeight: "bold", // Customize font weight
                            color: "#000", // Customize text color
                            textTransform: "uppercase", // Uppercase text
                            letterSpacing: "0.5px", // Customize letter spacing
                            // borderBottom: "4px solid #000",
                            background: "#fff",
                            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                        }}
                    >
                        {modalTitle}
                    </div>}

                    <CloseButton
                        onClick={closeModal}
                        style={{
                            position: "absolute",
                            top: "10px",
                            right: "10px",
                            fontSize: "16px",
                        }}
                    />
                </div>
                <Modal.Body style={{ background: '#c7c6c3' }} >
                    {renderModalBody(closeModal)}
                </Modal.Body>
                {showFooter && (
                    <Modal.Footer
                        style={{
                            color: "whitesmoke",
                            width: "99%",
                            margin: 4,
                            borderRadius: 10,
                            textAlign: "center",
                            justifyContent: "center",
                            background:
                                "linear-gradient(90deg, rgba(238,174,202,1) 0%, rgba(122,5,217,1) 100%)",
                            cursor: "pointer",
                            fontWeight: 700,
                        }}
                        onClick={closeModal}
                    >
                        CLOSE
                        {/* </div> */}
                    </Modal.Footer>
                )}
            </Modal>
        </>
    );
}

export default ShowDpModal;
