import React, { useEffect, useState } from 'react'
import { ProgressBar, Spinner } from 'react-bootstrap'
import { createPortal } from 'react-dom'


function Loader({ type, progress, description = "Don't go back or refresh while uploading" }) {

    const [el] = useState(document.createElement('div'))

    useEffect(() => {
        document.body.appendChild(el)
        return () => {
            document.body.removeChild(el)
        }
    }, [el])

    return (
        <>
            {createPortal(
                <div
                    style={{
                        top: '0%',
                        left: '0%',
                        zIndex: '10011',
                    }}
                    className={`
                        position-absolute w-100 h-100 d-flex 
                        justify-content-center align-items-center 
                        bg-dark bg-opacity-25`
                    }
                >
                    {type === 'progress' ? (
                        <div className='bg- rounded-smooth bg-light shadow-lg p-4 w-25'>
                            <ProgressBar
                                animated
                                now={progress}
                                min={0}
                                max={100}
                                variant="info"
                            // label={progress + ' %'}
                            />
                            <div className='text-center text-muted small mt-2'>
                                <p className='mb-1'>{progress}% completed</p>
                                {description}
                            </div>
                        </div>
                    ) : (
                        <Spinner animation='border' />
                    )}
                </div>,
                el
            )}
        </>
    );
}

export default Loader
