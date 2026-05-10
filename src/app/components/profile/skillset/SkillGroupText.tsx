import { Stack } from "@mui/material";
import { useTranslations } from "next-intl";
import { Body1, Subtitle2 } from "../../styled/text";

const SkillGroupText = ({ subtitle, content }: {
    subtitle: string;
    content: string[];
}) => {
    const t = useTranslations("profile.form.skill.list")

    return (
        <Stack sx={{ my: "0.5rem", gap: "0.375rem" }}>
            <Subtitle2>{t(subtitle)}</Subtitle2>
            {content.map((localeStr) => (
                <Body1 key={localeStr} component="li" sx={{ ml: "1.75rem" }}>
                    {t.rich(localeStr, {
                        b: (str) => <b>{str}</b>
                    })}
                </Body1>
            ))}
            
        </Stack>
    )
}

export default SkillGroupText;