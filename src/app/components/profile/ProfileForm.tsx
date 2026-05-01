import { useTranslations } from "next-intl";
import { ShadowedStack } from "../styled/component";
import ProfileField from "./ProfileField";

const ProfileForm = () => {

    const t = useTranslations("profile.form");

    return (
        <ShadowedStack sx={{ borderRadius: "2rem", width: "45rem", padding: "2rem", background: "#fff" }}>
            <ProfileField subtitle={"Name"} content={"Curly"} />
        </ShadowedStack>
    )
}

export default ProfileForm;