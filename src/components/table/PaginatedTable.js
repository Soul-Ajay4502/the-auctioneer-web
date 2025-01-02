import React, { useMemo, useState, useEffect } from "react";
import {
    Button,
    InputGroup,
    FormControl,
    FormSelect,
    Alert,
} from "react-bootstrap";
import { AgGridReact } from "ag-grid-react";
import ModalWrapper from "../ModalWrapper";
import Loader from "../Loader";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import toast from "react-hot-toast";
import axios from "axios";
import { ReactComponent as Prev } from "../../assets/icons/chevron-left.svg";
import { ReactComponent as Next } from "../../assets/icons/chevron-right.svg";
import { ReactComponent as PrevDouble } from "../../assets/icons/chevron-double-left.svg";
import { ReactComponent as NextDouble } from "../../assets/icons/chevron-double-right.svg";
import BulkUpload from "../BulkUserUpload";
import endpointsForDownload from "../../services/endpoints";

const PaginatedTable = (props) => {
    const {
        getDataUrl = "",
        endpoints = {},
        columnHeads = [],
        name = "Table",
        relevants = [],
        Form = () => <div></div>,
        insertable = true,
        cellModifier = {},
        addFormProps = {},
        addBtnLabel = "",
        headerExtras = <></>,
        pinnedFieldRelevant = "leagueName",
        isUploadEnable = false,
        headname,
    } = props;

    const [paginate, setPagination] = useState({});
    const [rowData, setRowData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);
    const [loading, setLoading] = useState(false);

    const pageNumbers = Array.from(
        { length: paginate.totalPages },
        (_, i) => i + 1
    );

    const handleDropdownChange = (e) => {
        setCurrentPage(Number(e.target.value));
        // handlePageJump(e.target.value);
    };

    // Define column definitions for ag-grid
    const columnDefs = useMemo(() => {
        return relevants.map((field, i) => ({
            headerName: columnHeads[i] || "Missing Column Head",
            field: field,
            pinned: field === pinnedFieldRelevant ? "left" : undefined,
            // cellStyle: { textAlign: "center" },
            // headerStyle: { textAlign: "center" },
            cellRenderer: (params) => {
                // Pass the entire row data to the cellModifier function if it exists
                return cellModifier[field]
                    ? cellModifier[field]({
                        value: params.value,
                        row: params?.data || [],
                        reFetch: () => { fetchData(); setCurrentPage(1) },
                    })
                    : params.value;
            },
        }));
    }, [relevants, columnHeads, cellModifier]);

    // Fetch data from the API
    const fetchData = async () => {

        try {
            setLoading(true);
            const response = await axios.get(getDataUrl, {
                params: { page: currentPage, limit: recordsPerPage },
            });
            const { data } = response?.data?.responseData;
            setRowData(data || []);
            setPagination(response?.data?.responseData?.pagination || []);
        } catch (error) {
            console.error("Error fetching data:", error);
            // toast.error("Failed to fetch data!");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [currentPage]);

    const handleNext = () => {
        if (Number(paginate.currentPage) < Number(paginate.totalPages)) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    const handlePrevious = () => {
        if (Number(paginate.currentPage) > 1) {
            setCurrentPage((prev) => prev - 1);
        }
    };

    const handleFirst = () => {
        setCurrentPage(1);
    };

    const handleLast = () => {
        setCurrentPage(Number(paginate.totalPages));
    };

    let errorMessage = !loading && rowData?.length === 0 ? `List is Empty` : "";

    return (
        <div className="crudCard">
            <div className="pe-2 py-4 pe-md-4 d-flex justify-content-between align-items-center cardHead">
                <span
                    style={{
                        fontSize: "20px",
                        color: "#000",
                        fontWeight: 700,
                    }}
                >
                    {headname
                        ? headname
                        : typeof name === "string"
                            ? name.toUpperCase()
                            : name}
                </span>
                {isUploadEnable && (
                    <BulkUpload
                        afterUpload={() => fetchData()}
                        templateUrl={
                            endpointsForDownload.playerList
                                .downloadUploadTemplate
                        }
                    />
                )}

                {insertable && (
                    <ModalWrapper
                        modalTitle={addBtnLabel || "Add " + name}
                        modalAttrs={{ size: "md" }}
                        renderModalBody={(closeModal) => (
                            <Form
                                onAfterSubmit={() => {
                                    closeModal();
                                    fetchData();
                                }}
                                onCancel={closeModal}
                                endpoint={endpoints.add}
                                {...addFormProps}
                            />
                        )}
                    >
                        <Button
                            className="primaryBtn btnAnime ms-4"
                            style={{ fontSize: "13px" }}
                        >
                            {addBtnLabel.toUpperCase() || "Add " + name}
                        </Button>
                    </ModalWrapper>
                )}

                {headerExtras}
            </div>

            <div className="p-0">
                {!!errorMessage ? (
                    <div
                        className="ag-theme-alpine"
                        style={{ height: "486px", width: "100%" }}
                    >
                        <Alert
                            variant="danger"
                            style={{ height: "100%", justifyContent: "center", alignItems: 'center', display: 'flex', }}
                            className="text-center h1 py-4 text-muted"
                        >
                            {errorMessage?.toUpperCase()}
                        </Alert>
                    </div>
                ) : (
                    <div
                        className="ag-theme-alpine"
                        style={{ height: "486px", width: "100%" }}
                    >
                        <AgGridReact
                            rowData={rowData}
                            columnDefs={columnDefs}
                            pagination={true}
                            suppressPaginationPanel={true}
                        />
                    </div>
                )}
            </div>
            {rowData?.length > 0 && (
                <div
                    style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "right",
                        paddingRight: 20,
                        background: "#fff",
                        border: "1px solid #c7c8c9",
                        marginTop: 15,
                        // borderRadius: 20,
                        // boxShadow: '5px 5px 15px grey',
                        backgroundColor: "#e4e6eb",
                    }}
                >
                    <div
                        className="d-flex justify-content-between align-items-center py-2"
                        style={{ width: 500 }}
                    >
                        <PrevDouble
                            onClick={handleFirst}
                            cursor={
                                Number(paginate.currentPage) === 1
                                    ? "not-allowed"
                                    : "pointer"
                            }
                        />
                        <Prev
                            onClick={handlePrevious}
                            cursor={
                                Number(paginate.currentPage) === 1
                                    ? "not-allowed"
                                    : "pointer"
                            }
                        />
                        <span>
                            Page {currentPage} of {paginate.totalPages || 1}
                        </span>
                        <InputGroup style={{ maxWidth: "100px" }}>
                            {/* Page Dropdown */}
                            <FormSelect
                                value={currentPage}
                                onChange={handleDropdownChange}
                                style={{ width: "50%" }}
                            >
                                {pageNumbers.map((page) => (
                                    <option
                                        key={page}
                                        value={page}
                                        onClick={() => setCurrentPage(page)}
                                    >
                                        {page}
                                    </option>
                                ))}
                            </FormSelect>
                            {/* <Button onClick={() => handlePageJump(customPageInput)}>Go</Button> */}
                        </InputGroup>
                        <Next
                            onClick={handleNext}
                            cursor={
                                Number(paginate.currentPage) === Number(paginate.totalPages)
                                    ? "not-allowed"
                                    : "pointer"
                            }
                        />
                        <NextDouble
                            onClick={handleLast}
                            cursor={
                                Number(paginate.currentPage) === paginate.totalPages
                                    ? "not-allowed"
                                    : "pointer"
                            }
                        />
                    </div>
                </div>
            )}
            {loading && <Loader />}
        </div>
    );
};

export default PaginatedTable;
