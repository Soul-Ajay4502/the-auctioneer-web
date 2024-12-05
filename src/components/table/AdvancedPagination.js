import React from "react";
import { Pagination, Form, Button, Row, Col } from "react-bootstrap";
import {
    ChevronLeft,
    ChevronRight,
} from "react-bootstrap-icons";

function AdvancedPagination({
    currentPage,
    totalPages,
    totalRecords,
    recordsPerPage,
    handlePrevious,
    handleNext,
    handleFirst,
    handleLast,
    handlePageJump,
}) {
    const startRecord = (currentPage - 1) * recordsPerPage + 1;
    const endRecord = Math.min(currentPage * recordsPerPage, totalRecords);

    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <Row className="align-items-center gap-2">
            {/* First Page Button */}
            <Col xs="auto">
                <Button
                    variant="outline-primary"
                    disabled={currentPage === 1}
                    onClick={handleFirst}
                >
                    First
                </Button>
            </Col>

            {/* Previous Page Button */}
            <Col xs="auto">
                <Button
                    variant="outline-primary"
                    disabled={currentPage === 1}
                    onClick={() => handlePrevious(currentPage - 1)}
                >
                    <ChevronLeft /> Previous
                </Button>
            </Col>

            {/* Page Info */}
            <Col xs="auto" className="d-flex align-items-center gap-2">
                <Form.Select
                    size="sm"
                    value={currentPage || 1}
                    onChange={(e) =>
                        handlePageJump(Number(e.target.value), totalPages)
                    }
                >
                    {pageNumbers.map((page) => (
                        <option key={page} value={page}>
                            {page}
                        </option>
                    ))}
                </Form.Select>
                <span>of {totalPages}</span>
            </Col>

            {/* Next Page Button */}
            <Col xs="auto">
                <Button
                    variant="outline-primary"
                    disabled={currentPage === totalPages}
                    onClick={() => handleNext(currentPage + 1)}
                >
                    Next <ChevronRight />
                </Button>
            </Col>

            {/* Last Page Button */}
            <Col xs="auto">
                <Button
                    variant="outline-primary"
                    disabled={currentPage === totalPages}
                    onClick={handleLast}
                >
                    Last
                </Button>
            </Col>

            {/* Records Info */}
            <Col className="text-end">
                <span>
                    Showing {startRecord} to {endRecord} of {totalRecords}{" "}
                    records
                </span>
            </Col>
        </Row>
    );
}

export default AdvancedPagination;
