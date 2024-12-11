import { Button, Collapse } from 'react-bootstrap';
import { ReactComponent as DownloadIcon } from '../assets/icons/downloadIcon.svg';
import { ReactComponent as CloseIcon } from '../assets/icons/BulkUploadCloseIcon.svg';
import UploadSelector from './UploadSelector';

const DisplaySelectedFile = ({ selectedFile, onclose }) => {
    return (
        <div
            style={{
                display: 'flex',
                border: '1px solid #E7E7E7',
                borderRadius: '10px',
                padding: '16px',
                marginBottom: '10px',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}
        >
            <div style={{ textAlign: 'left' }}>
                <div
                    style={{
                        color: '#0B0B0B',
                        fontWeight: 600,
                        fontSize: '12px',
                    }}
                >
                    {selectedFile?.name}
                </div>
                <div
                    style={{
                        color: '#6D6D6D',
                        fontWeight: 400,
                        fontSize: '12px',
                    }}
                >
                    {byteConverter(selectedFile?.size).mb}
                </div>
            </div>
            <CloseIcon role="button" onClick={onclose} />
        </div>
    );
};

const UploadModal = ({
    closeModal,
    setFileError,
    setSelectedFile,
    upload,
    downloadTemplate,
    fileError,
    selectedFile,
}) => {
    return (
        <div>
            <div style={{ background: '#3d9be3', width: 60, borderRadius: 3 }} onClick={downloadTemplate} type="button">
                <span
                    className="text-primary"
                >
                    <DownloadIcon />
                </span>
                <span
                    style={{
                        color: '#FFF',
                        fontWeight: 500,
                        fontSize: '13px',
                        paddingLeft: '4px',
                    }}
                >
                    Excel
                </span>
            </div>
            <UploadSelector
                onChange={(e) => {
                    if (e.target.files[0] !== undefined) {
                        setFileError(false);
                        setSelectedFile(e.target.files[0]);
                    }
                }}
                label="Browse your file"
                id="media-upload"
                inputAttrs={{ multiple: false }}
            />
            <Collapse in={fileError}>
                <div className="text-danger text-center small">
                    Only supported .xlsx file formats
                </div>
            </Collapse>
            <div
                style={{
                    color: '#6D6D6D',
                    fontSize: '10px',
                    fontWeight: 700,
                    paddingTop: '5px',
                    paddingBottom: '5px',
                }}
            >
                Note: only support .xlsx files
            </div>
            <Collapse in={selectedFile != undefined}>
                <div className="text-center">
                    <DisplaySelectedFile
                        selectedFile={selectedFile}
                        onclose={() => {
                            setSelectedFile(null);
                            setFileError(false);
                        }}
                    />
                    <div
                        style={{
                            background: '#107BFF',
                            color: '#EFEFEF',
                            fontSize: '16px',
                            fontWeight: 600,
                            borderRadius: '8px',
                            padding: '10px 18px 10px 18px',
                            textAlign: 'center',
                        }}
                        role="button"
                        className="btnAnime"
                        disabled={!selectedFile}
                        onClick={() => {
                            upload(closeModal);
                        }}
                    >
                        Upload and Continue
                    </div>

                    <div
                        style={{
                            background: '#FFF',
                            color: '##344054',
                            fontSize: '16px',
                            fontWeight: 600,
                            borderRadius: '8px',
                            border: '1px solid #D0D5DD',
                            padding: '10px 18px 10px 18px',
                            textAlign: 'center',
                            marginTop: '10px',
                        }}
                        role="button"
                        onClick={() => {
                            setSelectedFile(null);
                            closeModal();
                        }}
                    >
                        Cancel
                    </div>
                </div>
            </Collapse>
        </div>
    );
};

export default UploadModal;

function byteConverter(bytes) {
    const kb = bytes / 1024;
    const mb = kb / 1024;
    return { kb: Math.round(kb) + 'kb', mb: mb.toFixed(2) + 'mb' };
}
