import { fetchGet } from "@/utils/fetcher";
import { useQuery } from "@tanstack/react-query"
import { Subtitle1 } from "../styled/text";
import { useTranslations } from "next-intl";
import { Avatar, Skeleton, Stack } from "@mui/material";
import { GithubUserInfo } from "../types";

const ProfileIcon = () => {
    const { data: iconSrc, isLoading: isFetchingInfo } = useQuery({
        queryKey: ["profile-icon"],
        queryFn: async () => {
            const userInfo = await fetchGet<GithubUserInfo>("https://api.github.com/users/CurlyRhapsody");
            return userInfo.avatar_url;
        }
    });

    const t = useTranslations("profile.form.subtitle")

    if (isFetchingInfo) {
        return (
            <Stack sx={{ gap: "1rem", width: "15rem", alignItems: "center" }}>
                <Subtitle1 sx={{ color: "#1E90FF" }}>{t("icon")}</Subtitle1>
                <Skeleton sx={{ width: "15rem", height: "15rem" }} variant="circular" />
            </Stack>
        )
    }

    return (
        <Stack sx={{ gap: "1rem", width: "15rem", alignItems: "center" }}>
            <Subtitle1 sx={{ color: "#1E90FF" }}>{t("icon")}</Subtitle1>
            <Avatar sx={{ width: "15rem", height: "15rem" }} src={iconSrc} />
        </Stack>
    )
}

export default ProfileIcon;