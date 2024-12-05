import React, { useMemo, useState, useEffect } from "react";
import { Button, InputGroup, FormControl, FormSelect } from "react-bootstrap";
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
        reFetch = () => {},
        addBtnLabel = "",
        headerExtras = <></>,
        pinnedFieldRelevant = "leagueName",
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
                          row: params.data,
                          reFetch: fetchData,
                      })
                    : params.value;
            },
        }));
    }, [relevants, columnHeads, cellModifier]);

    // Fetch data from the API
    const fetchData = async (page = 1) => {
        try {
            setLoading(true);
            const response = await axios.get(getDataUrl, {
                params: { page, limit: recordsPerPage },
            });
            const { data } = response.data.responseData;
            setRowData(data);
            setPagination(response.data.responseData.pagination);
        } catch (error) {
            console.error("Error fetching data:", error);
            toast.error("Failed to fetch data!");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(currentPage);
    }, [currentPage]);

    const handleNext = () => {
        if (paginate.currentPage < paginate.totalPages) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    const handlePrevious = () => {
        if (paginate.currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
        }
    };

    const handleFirst = () => {
        setCurrentPage(1);
    };

    const handleLast = () => {
        setCurrentPage(paginate.totalPages);
    };

    let errorMessage = !loading && rowData.length === 0 ? "Table is Empty" : "";

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
                    {name?.toUpperCase()}
                </span>

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
                            {addBtnLabel || "Add " + name}
                        </Button>
                    </ModalWrapper>
                )}

                {headerExtras}
            </div>

            <div className="p-0">
                {!!errorMessage ? (
                    <div className="text-center h1 py-4 text-muted">
                        {errorMessage}
                    </div>
                ) : (
                    <div
                        className="ag-theme-alpine"
                        style={{ height: "490px", width: "100%" }}
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
            <div
                style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "right",
                    paddingRight: 20,
                    background: "#fff",
                    border: "1px solid #000",
                }}
            >
                <div
                    className="d-flex justify-content-between align-items-center py-3"
                    style={{ width: 500 }}
                >
                    <PrevDouble
                        onClick={handleFirst}
                        cursor={
                            paginate.currentPage === 1
                                ? "not-allowed"
                                : "pointer"
                        }
                    />
                    <Prev
                        onClick={handlePrevious}
                        cursor={
                            paginate.currentPage === 1
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
                            paginate.currentPage == paginate.totalPages
                                ? "not-allowed"
                                : "pointer"
                        }
                    />
                    <NextDouble
                        onClick={handleLast}
                        cursor={
                            paginate.currentPage == paginate.totalPages
                                ? "not-allowed"
                                : "pointer"
                        }
                    />
                </div>
            </div>
            {loading && <Loader />}
        </div>
    );
};

export default PaginatedTable;
