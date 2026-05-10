import { Stack } from "@mui/material";
import { Body1, Subtitle1 } from "../styled/text";

const ProfileField = ({ subtitle, content }: {
    subtitle: string;
    content: string;
}) => {
    return (
        <Stack sx={{ gap: "0.25rem" }}>
            <Subtitle1 sx={{ color: "#1E90FF" }}>{subtitle}</Subtitle1>
            <Body1>{content}</Body1>
        </Stack>
    )
}

export default ProfileField;