"use client"

import { Box, Stack, Typography } from "@mui/material";
import Image from "next/image";
import HomePageIamge from "../../assets/images/homePage.jpg";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Body1, Subtitle1, Subtitle2, Title1, Title2 } from "../Styled/Text";
import { ShadowedStack } from "../CustomComponents";

const HomePage = () => {

    const t = useTranslations("home");

    return (
        <Stack sx={{ width: "100%", gap: "2rem", mb: "5rem" }}>
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
                            position: "absolute", left: "calc(50% - 20rem)", top: "calc(50% - 11.25rem)",
                            bgcolor: "#FFFFFFCC", width: "40rem", height: "22.5rem", borderRadius: "2rem",
                            alignItems: "center", padding: "2rem", gap: "3rem"
                        }}
                    >
                        <Box sx={{ textAlign: "center" }}>
                            <Typography 
                                sx={{
                                    fontSize: "5rem", lineHeight: "7rem", fontWeight: 800,
                                    background: "-webkit-linear-gradient(15deg, #1E90FF, #7B68EE)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                }}
                            >
                                {t("title1")}
                            </Typography>
                            <Title1 sx={{ fontWeight: 400 }}>
                                {t("title2")}
                            </Title1>
                        </Box>
                        <Subtitle1 sx={{ fontWeight: 500, textAlign: "center" }}>
                            {t("titleGreet")}
                        </Subtitle1>
                    </Stack>
                </motion.div>
            </Box>

            <Stack sx={{ alignItems: "center", width: "100%" }}>
                <motion.div
                    style={{ width: "50rem" }}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeIn" }}
                >
                    
                    <ShadowedStack sx={{ width: "50rem", height: "20rem", borderRadius: "2rem", background: "#FFF", p: "2rem" }}>
                        <Subtitle1 sx={{ display: "inline" }}>
                            {t.rich("greet", {
                                emp: (children) => 
                                    <Subtitle1
                                        sx={{
                                            display: "inline",
                                            background: "-webkit-linear-gradient(15deg, #1E90FF, #7B68EE)",
                                            WebkitBackgroundClip: "text",
                                            WebkitTextFillColor: "transparent",
                                        }}
                                    >
                                        {children}
                                    </Subtitle1>
                            })}
                        </Subtitle1>
                    </ShadowedStack>
                </motion.div>
            </Stack>
        </Stack>
    )
}

export default HomePage;