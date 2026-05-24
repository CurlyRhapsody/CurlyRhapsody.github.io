import { useState } from "react";
import PageContainer from "../../styled/PageContainer";
import { Title1, Subtitle2 } from "../../styled/text";
import { useTranslations } from "next-intl";
import Link from "next/link";
import PetCatGameBoard from "../pet-the-cat/PetCatGameBoard";

const PetCatContainer = () => {
    const t = useTranslations("games.pet-the-cat");

    return (
        <PageContainer>
            <Title1>{t("title")}</Title1>
            <Subtitle2 sx={{ whiteSpace: "pre-wrap", textAlign: "center" }}>
                {t.rich("shoutout", { link: (content) => (
                    <Link
                        href="https://www.brushjjaemu.org/"
                        target="_blank" style={{ textDecoration: "underline" }}
                    >
                        {content}
                    </Link>
                ) })}
            </Subtitle2>
            <PetCatGameBoard />
        </PageContainer>
    )
}

export default PetCatContainer;