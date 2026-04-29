"use client"

import { Box, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import HomePageIamge from "../../assets/images/homePage.jpg";
import { motion } from "motion/react";
import { useLocale, useTranslations } from "next-intl";
import { Subtitle1, Title1 } from "../styled/text";
import { ShadowedStack } from "../styled/component";
import CurlyBracesTypeWriter from "../CurlyBracesTypewriter";
import { homepageWords } from "../constant";
import { useRouter } from "next/navigation";
import { menuList } from "../navBar/MenuItems";
import HomePageClickable from "../HomePageClickable";

const HomePage = () => {

    const t = useTranslations("home");
    const ttw = useTranslations("home.typewriter");

    const locale = useLocale();
    const router = useRouter();

    return (
        <Stack sx={{ width: "100%", gap: "4rem", mb: "5rem" }}>
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
                    style={{ width: "45rem" }}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeIn" }}
                >
                    <ShadowedStack sx={{ width: "45rem", height: "25rem", borderRadius: "2rem", background: "#FFF", p: "2rem", gap: "1.625rem" }}>
                        <Subtitle1 sx={{ display: "inline" }}>
                            {t.rich("greet", {
                                emp: (children) => 
                                    <Subtitle1
                                        component="span"
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
                        <Subtitle1>{t("i am a")}</Subtitle1>
                        <CurlyBracesTypeWriter words={homepageWords.map((locale) => ttw(locale))} />
                        <Subtitle1 sx={{ textAlign: "right" }}>{t("anything")}</Subtitle1>
                    </ShadowedStack>
                </motion.div>
            </Stack>
            <Stack sx={{ alignItems: "center", width: "100%" }}>
                <motion.div
                    style={{ width: "45rem" }}
                    initial={{ opacity: 0, transform: "translateY(3rem)" }}
                    whileInView={{ opacity: 1, transform: "translateY(0)" }}
                    viewport={{ once: true }}
                    transition={{ delay: 1.2, duration: 1, ease: "easeIn" }}
                >
                    <Stack sx={{ alignItems: "center", gap: "1.5rem" }}>
                        <Title1>{t("startAdventure")}</Title1>
                        <Grid container spacing="2rem">
                            {menuList.map((item, idx) => {
                                
                                if (idx === 0) return null; // home

                                return (
                                    <Grid size={6} key={item.localeStr}>
                                        <HomePageClickable
                                            Icon={item.icon}
                                            localeStr={item.localeStr}
                                            onClick={() => router.push(`/${locale}/${item.path}`)}
                                        />
                                    </Grid>
                                )}
                            )}
                        </Grid>
                    </Stack>
                </motion.div>
            </Stack>
        </Stack>
    )
}

export default HomePage;