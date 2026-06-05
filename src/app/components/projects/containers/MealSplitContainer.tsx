import { useTranslations } from 'next-intl';
import PageContainer from '../../styled/PageContainer';
import { Stack } from '@mui/material';
import { Subtitle1, Title1 } from '../../styled/text';

const MealSplitContainer = () => {

    const t = useTranslations("project.meal-split");

    return (
        <PageContainer>
            <Stack sx={{ width: "100%", alignItems: "center", gap: "1rem"  }}>
                <Title1>{t("title")}</Title1>
                <Subtitle1>{t("subtitle")}</Subtitle1>
            </Stack>
        </PageContainer>
    )
}

export default MealSplitContainer;