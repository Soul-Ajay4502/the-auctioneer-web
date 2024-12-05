import { NavLink } from "react-router-dom";
import "./DashBoardMenus.css"; // Import custom styles for tabs

const DashBoardMenus = ({ routes }) => {
    return (
        <div className="tabs-container">
            <div
                style={{
                    display: "flex",
                    margin: 8,
                    borderRadius: 20,
                    overflow: "hidden",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)", // Adds a subtle shadow
                }}
            >
                {routes
                    .filter((route) => route.showOnTab)
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
        </div>
    );
};

export default DashBoardMenus;
