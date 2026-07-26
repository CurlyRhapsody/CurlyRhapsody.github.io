import { useTranslations } from 'next-intl';
import { ShadowedStack } from '../../styled/component';

const PrisonDilemmaGameBoard = () => {
    const t = useTranslations("games.prison");

    return (
        <ShadowedStack sx={{ width: "100%", borderRadius: "1rem", background: "#FFFFFF", p: "1rem", gap: "1rem", alignItems: "center" }}>

        </ShadowedStack>
    )
}

export default PrisonDilemmaGameBoard;