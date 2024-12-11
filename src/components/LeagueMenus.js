import { NavLink } from "react-router-dom";
import "./DashBoardMenus.css"; // Import custom styles for tabs
import { ReactComponent as Home } from "../assets/icons/Home.svg";


const LeagueMenus = ({ routes }) => {
    return (
        <div className="tabs-container">
            <div
                style={{
                    display: "flex",
                    margin: 8,
                    borderRadius: 25,
                    overflow: "hidden",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)", // Adds a subtle shadow
                    border: "2px solid #fff",
                }}
            >
                {routes
                    .filter((route) => !route.showOnTab && !route.notShowOnMenu)
                    .map((route) => (
                        <NavLink
                            key={route.path}
                            to={route.path}
                            className={({ isActive }) =>
                                isActive ? "tab active-tab" : "tab"
                            }
                        >
                            {route.name}
                        </NavLink>
                    ))}
            </div>
            <div className="home-tab"
                style={{
                    borderRadius: 50,
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)", // Adds a subtle shadow
                    border: "2px solid #fff",
                    paddingBottom: 5
                }}
            >
                <NavLink
                    to='/league-list'
                >
                    <Home style={{ color: '#000' }} />
                </NavLink>
            </div>
        </div>
    );
};

export default LeagueMenus;
