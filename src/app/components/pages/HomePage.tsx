import { Box, Stack } from "@mui/material";
import Image from "next/image";
import HomePageIamge from "../../assets/images/homePage.jpg";

const HomePage = () => {
    return (
        <Box sx={{ width: "100%" }}>
            <Box
                sx={{ minWidth: "37.5rem", width: "100%", overflow: "hidden" }}
            >
                <Image
                    width={1920} height={1080}
                    src={HomePageIamge.src} alt=""
                    style={{ objectFit: "contain", position: "relative", filter: "blur(0.125rem)" }}
                />
            </Box>

        </Box>
    )
}

export default HomePage;