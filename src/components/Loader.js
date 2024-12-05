import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { createPortal } from 'react-dom';

function Loader() {
    const [el] = useState(document.createElement('div'));

    useEffect(() => {
        document.body.appendChild(el);
        return () => {
            document.body.removeChild(el);
        };
    }, [el]);

    return (
        <>
            {createPortal(
                <div
                    style={{
                        position: 'absolute',
                        top: '0',
                        left: '0',
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(0, 0, 0, 0.25)',
                        zIndex: '10011',
                    }}
                >
                    <Spinner animation="border" />
                </div>,
                el
            )}
        </>
    );
}

export default Loader;
