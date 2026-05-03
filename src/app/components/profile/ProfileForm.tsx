import { useTranslations } from "next-intl";
import { ShadowedStack } from "../styled/component";
import ProfileField from "./ProfileField";
import { Stack } from "@mui/material";
import { useMemo } from "react";
import { DateTime } from "luxon";
import ProfileIcon from "./ProfileIcon";
import ProfileSkills from "./ProfileSkills";

const ProfileForm = () => {

    const tTitle = useTranslations("profile.form.subtitle");
    const tContent = useTranslations("profile.form.content");

    const age = useMemo(() => {
        const dob = DateTime.fromISO("2001-06-06");
        return Math.floor(DateTime.now().diff(dob, "years").years);
    }, [])

    return (
        <ShadowedStack sx={{ borderRadius: "2rem", width: "45rem", padding: "3rem 7rem", gap: "2rem", background: "#fff" }}>
            <Stack direction="row" sx={{ justifyContent: "space-between", gap: "2rem" }}>
                <Stack sx={{ gap: "2rem" }}>
                    <ProfileField subtitle={tTitle("name")} content={"CurlyRhapsody"} />
                    <ProfileField subtitle={tTitle("alias")} content={"Matthew Chan"} />
                    <ProfileField subtitle={tTitle("dob")} content={tContent("dob", { age: age })} />
                    <ProfileField subtitle={tTitle("location")} content={tContent("location")} />
                </Stack>
                <ProfileIcon />
                
            </Stack>
            <ProfileField subtitle={tTitle("hobbies")} content={tContent("hobbies")} />
            <ProfileField subtitle={tTitle("aboutMe")} content={tContent("summary")} />
            <ProfileSkills />
        </ShadowedStack>
    )
}

export default ProfileForm;