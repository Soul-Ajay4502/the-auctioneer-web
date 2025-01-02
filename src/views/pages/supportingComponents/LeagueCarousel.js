import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Badge } from "react-bootstrap";
import endpoints from "../../../services/endpoints";
import "./carousel.css";
import cricketEquipmentDigitalArt from '../../../assets/img/cricket-equipment-digital-art.jpg'
import shotGreen from '../../../assets/img/shot_green.jpg'
import withKeeper from '../../../assets/img/shot_with_keeper.jpg'
import withPlayerAndBat from '../../../assets/img/cricket-match-with-player_and_bat.jpg'



import { ReactComponent as Rupee } from "../../../assets/icons/Rupee.svg";

const LeagueCarousel = () => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const IMG_OBJ = {
        0: cricketEquipmentDigitalArt,
        1: withKeeper,
        2: shotGreen,
        3: withPlayerAndBat,
    }

    // Fetch data from the API
    const fetchData = async (page) => {
        try {
            const response = await axios.get(
                `${endpoints.dashboard.leagues}?page=${page}`
            );
            setData(response?.data?.responseData?.data);
            setTotalPages(response?.data?.responseData?.pagination?.totalPages);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData(currentPage);
    }, [currentPage]);

    // Handle pagination
    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="carousel-container" style={{ marginBottom: 30 }}>
            {/* Bootstrap Carousel */}
            <div style={{ display: "flex", gap: 10, width: "100%" }}>
                {data.map((item, index) => (
                    <div
                        key={item.id}
                        className="dynamic-item"
                        style={{
                            background:
                                "linear-gradient(90deg, rgba(0,6,36,1) 0%, rgba(190,14,205,1) 22%, rgba(255,0,219,0.9809173669467787) 100%)",
                            marginBottom: "20px",
                            padding: "10px",
                            width: "25%",
                            boxShadow: '3px 3px 10px rgba(0, 0, 0, 0.4)'
                        }}
                    >
                        <div
                            className="dynamic-caption"
                            style={{ overflow: "hidden" }}
                        >
                            <div>
                                <img src={IMG_OBJ[index]} alt="caption icons" />
                            </div>
                            <Badge
                                className="ellipsis-badge"
                                bg="light" text="dark"
                                title={item.leagueLocations}
                            >
                                {item.leagueLocations}
                            </Badge>
                            <table>
                                <tr>
                                    <td style={{ textAlign: "left" }}>
                                        <strong>LEAGUE</strong>
                                    </td>
                                    <td style={{ textAlign: "center" }}>
                                        {item.leagueName}
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ textAlign: "left" }}>
                                        <strong>PLAYERS</strong>
                                    </td>
                                    <td style={{ textAlign: "center" }}>
                                        {item.totalPlayers}
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ textAlign: "left" }}>
                                        <strong>REG FEE</strong>
                                    </td>
                                    <td style={{ textAlign: "center" }}>
                                        {item.registrationFee}
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ textAlign: "left" }}>
                                        <strong>TOTAL REG AMOUNT</strong>
                                    </td>
                                    <td
                                        style={{
                                            textAlign: "center",
                                            fontSize: 28,
                                            justifyContent: "center",
                                            alignItems: "center",
                                            display: "flex",
                                        }}
                                    >
                                        <Rupee />
                                        {Number(item.registrationFee) *
                                            Number(item.totalPlayers)}
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                ))}
            </div>
            {/* Pagination Controls */}
            <div className="pagination-controls text-center mt-3">
                <Button
                    style={{
                        background: "blue",
                        borderTopLeftRadius: 30,
                        borderBottomLeftRadius: 30,
                        width: 80
                    }}
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                >
                    Previous
                </Button>
                <span className="mx-3">
                    {" "}
                    {currentPage} of {totalPages}
                </span>
                <Button
                    style={{
                        background: "blue",
                        borderTopRightRadius: 30,
                        borderBottomRightRadius: 30,
                        width: 80
                    }}
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                >
                    Next
                </Button>
            </div>
        </div>
    );
};

export default LeagueCarousel;
