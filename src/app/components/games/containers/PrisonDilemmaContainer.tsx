import PageContainer from "../../styled/PageContainer";
import { Title1, Subtitle2 } from "../../styled/text";
import { useTranslations } from "next-intl";
import PrisonDilemmaGameBoard from "../prison/PrisonDilemmaGameBoard"

const PrisonDilemmaContainer = () => {
    const t = useTranslations("games.prison");

    return (
        <PageContainer>
            <Title1>{t("title")}</Title1>
            <Subtitle2>{t("subtitle")}</Subtitle2>
            <PrisonDilemmaGameBoard />
        </PageContainer>
    )
}

export default PrisonDilemmaContainer;