import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';

function WithOffcanvas({ children, offcanvasBody, isButton = true, childStyle = {}, ...props }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            {isButton ? <Button variant="danger" onClick={handleShow} className="me-2" style={childStyle}>
                {children}
            </Button> : <div onClick={handleShow} className="me-2" style={childStyle}>
                {children}
            </div>}
            <Offcanvas show={show} onHide={handleClose}  {...props} >
                <Offcanvas.Header closeButton>
                    {/* <Offcanvas.Title>Offcanvas</Offcanvas.Title> */}
                </Offcanvas.Header>
                <Offcanvas.Body style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {offcanvasBody(handleClose)}
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default WithOffcanvas;