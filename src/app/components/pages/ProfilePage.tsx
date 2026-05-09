"use client"

import { Stack } from "@mui/material";
import ProfileForm from "../profile/ProfileForm";
import ProfileContents from "../profile/ProfileContents";
import AcademicContainer from "../profile/AcademicContainer";
import WorkContainer from "../profile/WorkContainer";

const ProfilePage = () => {
    return (
        <Stack sx={{ width: "100%", py: "4rem", alignItems: "center", gap: "2rem" }}>
            <ProfileContents />
            <ProfileForm />
            <AcademicContainer />
            <WorkContainer />
        </Stack>
    );
}

export default ProfilePage;