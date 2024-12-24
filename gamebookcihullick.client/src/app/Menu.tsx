import React from "react";
import { useNavigate } from "react-router-dom";

const Menu: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div>
            <h2>Welcome to the Game</h2>
            <button onClick={() => navigate("/location/1")} style={{ fontSize: "20px", padding: "10px" }}>
                Start Game
            </button>
        </div>
    );
};

export default Menu;
