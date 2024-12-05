import React from "react";
// import { ReactComponent as Edit } from "../../asset/icons/Edit.svg";
import DeleteWithWarning from "../DeleteWithWarning";
import ModalWrapper from "../ModalWrapper";

function TableTemplate(props) {
    const {
        name,
        irremovable,
        immutable,
        updateFormProps,
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        endpoints,
        reFetch,
        formType,
        modalSize,
        showAlert,
        getIncompleteDataCount,
        DisplayForm,
        showFullDetails,
        isComplete,
    } = props;

    return (
        <div className="table-responsive">
            <div className="table" {...getTableProps()} id="table-to-xls">
                <div className="thead">
                    {headerGroups.map((headerGroup, index) => (
                        <div
                            key={index}
                            className="tr"
                            {...headerGroup.getHeaderGroupProps()}
                        >
                            {headerGroup.headers.map((column, index) => (
                                <div
                                    key={index}
                                    className="th"
                                    style={{ background: "#92b6f0" }}
                                    {...column.getHeaderProps()}
                                >
                                    {column.render("Header")}
                                    {/* <span
                                        className=" px-2"
                                        {...column.getSortByToggleProps()}
                                    >
                                        {column.isSorted ? (
                                            column.isSortedDesc ? (
                                                <SortUp />
                                            ) : (
                                                <SortDown />
                                            )
                                        ) : (
                                            <Sort />
                                        )}
                                    </span> */}
                                </div>
                            ))}

                            {!immutable && (
                                <div
                                    className="th text-center"
                                    style={{ background: "#92b6f0" }}
                                >
                                    Edit
                                </div>
                            )}
                            {!irremovable && (
                                <div
                                    className="th text-center"
                                    style={{ background: "#92b6f0" }}
                                >
                                    Delete
                                </div>
                            )}
                            {showFullDetails && (
                                <div
                                    className="th text-center"
                                    style={{ background: "#92b6f0" }}
                                >
                                    Details
                                </div>
                            )}
                        </div>
                    ))}
                </div>


                <div className="tbody pt-2" {...getTableBodyProps()}>
                    {page.map((row) => {
                        prepareRow(row);
                        return (
                            <div className="tr" {...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                    return (
                                        <div
                                            className="td"
                                            {...cell.getCellProps()}
                                        >
                                            {cell.render("Cell")}
                                        </div>
                                    );
                                })}

                                {!immutable && (
                                    <div className="td text-center">
                                        <ModalWrapper
                                            modalTitle={"Edit " + name}
                                            modalAttrs={{
                                                size: modalSize.update,
                                            }}
                                            renderModalBody={(closeModal) => (
                                                <formType.update
                                                    onAfterSubmit={() => {
                                                        closeModal();
                                                        // showAlert(
                                                        //     "success",
                                                        //     `The Record has been updated successfully`
                                                        // );
                                                        reFetch();
                                                    }}
                                                    onCancel={closeModal}
                                                    endpoint={endpoints.update}
                                                    getIncompleteDataCount={
                                                        getIncompleteDataCount
                                                    }
                                                    updateValues={{
                                                        ...row.original,
                                                    }}
                                                    {...updateFormProps}
                                                />
                                            )}
                                        >
                                            EDIT
                                        </ModalWrapper>
                                    </div>
                                )}

                                {!irremovable && (
                                    <div className="td text-center">
                                        <DeleteWithWarning
                                            title={
                                                <>
                                                    Delete Details{" "}
                                                    {row.original.fullName && (
                                                        <>
                                                            of{" "}
                                                            <span
                                                                style={{
                                                                    color: "red",
                                                                }}
                                                            >
                                                                {
                                                                    row.original
                                                                        .fullName
                                                                }
                                                            </span>
                                                        </>
                                                    )}
                                                </>
                                            }
                                            configBody={{
                                                ...row.original,
                                            }}
                                            className="mx-auto"
                                            onAfterDelete={() => {
                                                showAlert(
                                                    "success",
                                                    `The Record has been removed successfully`
                                                );
                                                reFetch();
                                            }}
                                            endpoint={endpoints.delete}
                                        />
                                    </div>
                                )}

                                {showFullDetails && (
                                    <div className="td text-center">
                                        <ModalWrapper
                                            showFooter={showFullDetails}
                                            modalTitle={
                                                <>
                                                    Full Details{" "}
                                                    {row.original.fullName ? (
                                                        <>
                                                            of{" "}
                                                            <span
                                                                style={{
                                                                    color: "violet",
                                                                }}
                                                            >
                                                                {
                                                                    row.original
                                                                        .fullName
                                                                }
                                                            </span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            of Family{" "}
                                                            <span
                                                                style={{
                                                                    color: "violet",
                                                                }}
                                                            >
                                                                {
                                                                    row.original
                                                                        .familyName
                                                                }
                                                            </span>
                                                        </>
                                                    )}
                                                </>
                                            }
                                            modalAttrs={{
                                                size: modalSize.update,
                                            }}
                                            renderModalBody={(closeModal) => (
                                                <DisplayForm
                                                    onAfterSubmit={() => {
                                                        closeModal();
                                                        reFetch();
                                                    }}
                                                    onCancel={closeModal}
                                                    endpoint={endpoints.update}
                                                    getIncompleteDataCount={
                                                        getIncompleteDataCount
                                                    }
                                                    updateValues={{
                                                        ...row.original,
                                                    }}
                                                    {...updateFormProps}
                                                />
                                            )}
                                        >
                                        </ModalWrapper>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default TableTemplate;
