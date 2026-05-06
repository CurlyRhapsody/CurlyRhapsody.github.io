"use client"

import { Stack } from "@mui/material";
import ProfileForm from "../profile/ProfileForm";
import ProfileContents from "../profile/ProfileContents";
import AcademicContainer from "../profile/AcademicContainer";

const ProfilePage = () => {
    return (
        <Stack sx={{ width: "100%", py: "4rem", alignItems: "center", gap: "2rem" }}>
            <ProfileContents />
            <ProfileForm />
            <AcademicContainer />
        </Stack>
    );
}

export default ProfilePage;