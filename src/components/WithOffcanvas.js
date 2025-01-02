import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';

function WithOffcanvas({ children, offcanvasBody, ...props }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="danger" onClick={handleShow} className="me-2">
                {children}
            </Button>
            <Offcanvas show={show} onHide={handleClose}  {...props} >
                <Offcanvas.Header closeButton>
                    {/* <Offcanvas.Title>Offcanvas</Offcanvas.Title> */}
                </Offcanvas.Header>
                <Offcanvas.Body style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {offcanvasBody}
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default WithOffcanvas;