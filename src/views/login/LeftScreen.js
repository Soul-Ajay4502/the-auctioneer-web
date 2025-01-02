import leftImage from "../../assets/img/loginLeft.png"; // Adjust the path based on your folder structure

const LeftScreen = () => {
    return (
        <div
            style={{
                width: "38%",
                overflow: "hidden",
                position: "relative",
            }}
        >
            <div
                style={{
                    position: "absolute",
                    top: "28%",
                    left: "4%",
                    color: "#FFFFFF",
                }}
            >
                <p style={{ fontSize: 22, fontWeight: 600, marginBottom: 60 }}>
                    Experience the Thrill of Building Your Dream Team!
                </p>
                <div
                    style={{
                        fontSize: 18,
                        textAlign: "justify",
                        paddingLeft: 90,
                        paddingRight: 25,
                        marginRight: 90,
                    }}
                >
                    “ Unleash your strategic skills and bid for the best cricket
                    talent. Shape your ultimate team, track live auctions, and
                    experience cricket like never before.
                </div>
            </div>
            <img
                src={leftImage}
                width={"100%"}
                style={{
                    borderTopLeftRadius: 10,
                    borderBottomLeftRadius: 10,
                    height: "100%",
                }}
            />
        </div>
    );
};

export default LeftScreen;
