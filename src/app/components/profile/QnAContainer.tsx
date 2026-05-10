import { Divider, Stack } from "@mui/material";
import { ShadowedStack } from "../styled/component";
import { useTranslations } from "next-intl";
import { Body1, Subtitle2, Title1 } from "../styled/text";

const qnaList = [
    ["q1", "a1"]
]

const QnA = ({ question, answer }: {
    question: string;
    answer: string;
}) => {
    const t = useTranslations("profile.qna");

    return (
        <Stack>
            <Subtitle2>{t(question)}</Subtitle2>
            <Body1>{t.rich(answer, {
                red: (content) => <span style={{ color: "red" }}>{content}</span>
            })}</Body1>
        </Stack>
    )
}

const QnAContainer = () => {

    const t = useTranslations("profile.qna");

    return (
        <ShadowedStack id="qna"
            sx={{ borderRadius: "2rem", width: "45rem", padding: "2rem", gap: "1rem", background: "#fff", scrollMarginTop: "6rem" }}
            divider={<Divider sx={{ borderWidth: "0.0625rem" }} />}
        >
            <Title1>{t("title")}</Title1>
            <Stack sx={{ gap: "1.5rem" }}>
                {qnaList.map(([question, answer]) => (
                    <QnA question={question} answer={answer} />
                ))}
            </Stack>
            
            
        </ShadowedStack>
    )
}

export default QnAContainer;