"use client"

import { Box, Stack, Typography } from "@mui/material";
import Image from "next/image";
import HomePageIamge from "../../assets/images/homePage.jpg";
import { motion } from "motion/react";
import { Title2 } from "../Styled/Text";

const HomePage = () => {
    return (
        <Box sx={{ width: "100%" }}>
            <Box
                sx={{ position: "relative", width: "100%", overflow: "hidden", aspectRatio: "16/9", objectPosition: "center" }}
            >
                <Image
                    fill src={HomePageIamge.src} alt=""
                    style={{ objectFit: "cover", filter: "blur(0.1875rem)", backgroundPosition: "center" }}
                />
                <motion.div
                    style={{ width: "100%", height: "100%" }}
                    initial={{ opacity: 0, transform: "translateY(-3rem)" }}
                    animate={{ opacity: 1, transform: "translateY(0)" }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    <Stack
                        sx={{
                            position: "absolute", left: "calc(50% - min(25%, 20rem))", top: "calc(50% - min(25%, 11.25rem))",
                            bgcolor: "#FFFFFFCC", width: "50%", maxWidth: "40rem", height: "50%", maxHeight: "22.5rem", borderRadius: "2rem",
                            alignItems: "center", padding: "2rem"
                        }}
                    >
                        <Typography 
                            sx={{
                                fontSize: "4rem", lineHeight: "5.6rem", fontWeight: 800,
                                background: "-webkit-linear-gradient(15deg, #1E90FF, #7B68EE)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}
                        >
                            Imagination
                        </Typography>
                    </Stack>
                </motion.div>
            </Box>

        </Box>
    )
}

export default HomePage;