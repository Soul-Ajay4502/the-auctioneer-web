import axios from 'axios';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import Loader from './Loader';
import ModalWrapper from './WithModal';
import { ReactComponent as Upload } from '../assets/icons/Upload.svg';
import InitialBody from './UploadModal';
import toast from 'react-hot-toast';
import endpoints from '../services/endpoints';
import { useLeagueState } from '../context/League.context';

function BulkUpload({
    filename = 'PLAYER_UPLOAD_TEMPLATE',
    templateExtension = '.xlsx',
    afterUpload,
    onAfterAction = () => { },
    templateUrl,
    fileUpload
}) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [fileError, setFileError] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0); // Track upload progress
    const { selectedLeague } = useLeagueState();
    const { leagueDetails } = selectedLeague;

    const downloadTemplate = () => {
        setLoading(true);
        axios({
            url: templateUrl,
            method: 'GET',
            responseType: 'blob',
        })
            .then((response) => {
                const url = window.URL.createObjectURL(
                    new Blob([response.data])
                );

                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', filename + templateExtension);
                document.body.appendChild(link);
                link.click();
            })
            .catch((err) => {
                toast.error(err.response.data.statusText);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const simulateProgress = (start, end, interval) => {
        let currentProgress = start;
        const progressInterval = setInterval(() => {
            if (currentProgress < end) {
                currentProgress += 1; // Increment progress by 1
                setUploadProgress(currentProgress);
            } else {
                clearInterval(progressInterval); // Stop when progress reaches 100
            }
        }, interval); // Update progress every 'interval' ms
    };

    const upload = (closeModal) => {
        setLoading(true);
        const formData = new FormData();
        formData.append('csv_file', selectedFile);
        simulateProgress(1, 100, 800);
        if (
            selectedFile.type ===
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        ) {
            axios
                .post(`${endpoints.playerList.upload}?leagueId=${leagueDetails.leagueId}&leagueName=${leagueDetails.leagueName}`, formData, {
                    timeout: 90000,
                    // onUploadProgress: (progressEvent) => {
                    //     // Calculate upload progress
                    //     console.log('progressEvent', progressEvent)
                    //     const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    //     setUploadProgress(percent); // Update progress
                    // }
                })
                .then((res) => {
                    setUploadProgress(100);
                    setLoading(false);
                    toast.success('Players added');
                    setUploadProgress(0)
                    closeModal();
                    afterUpload();
                })
                .catch((error) => {
                    console.log(error);
                    toast.error(error?.response?.data?.statusText || 'error on upload');
                    setLoading(false);
                    setUploadProgress(0)
                });
        } else {
            setFileError(true);
            setLoading(false);
            setUploadProgress(0)
            return;
        }
    };

    const modalTitle = (
        <div style={{ width: '120%' }}>
            <div
                style={{
                    color: '#0B0B0B',
                    fontWeight: 700,
                    fontSize: '18px',
                }}
            >
                Bulk Upload
            </div>
            <div
                style={{
                    color: '#6D6D6D',
                    fontSize: '13px',
                    fontWeight: 400,
                    paddingTop: '10px',
                }}
            >
                Add your template here, and you can upload up to 1 document max
            </div>
        </div>
    );

    return (
        <>
            <ModalWrapper
                disableHeader={true}
                modalTitle={modalTitle}
                setFileError={setFileError}
                modalAttrs={{
                    size: 'xs',
                    className: 'p-0',
                    onExiting: () => {
                        setSelectedFile(null);
                        setFileError(false);
                        // afterUpload();
                    },
                }}
                renderModalBody={(closeModal) => {
                    return (<InitialBody
                        closeModal={() => {
                            closeModal();
                            // afterUpload();
                            setSelectedFile(null);
                            setFileError(false);
                        }}
                        setFileError={setFileError}
                        setSelectedFile={setSelectedFile}
                        upload={upload}
                        downloadTemplate={downloadTemplate}
                        fileError={fileError}
                        selectedFile={selectedFile}
                    />)
                }}
            >
                <Button
                    className=" btnAnime ms-4 px-3 py-1"
                    title="Player upload"
                    style={{ background: 'transparent' }}
                >
                    <Upload />
                </Button>
            </ModalWrapper>
            {loading &&
                <Loader type='progress' progress={uploadProgress} />
            }
        </>
    );
}

export default BulkUpload;
