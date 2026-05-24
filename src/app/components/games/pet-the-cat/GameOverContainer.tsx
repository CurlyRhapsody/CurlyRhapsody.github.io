import { Button, Stack } from '@mui/material';
import { Subtitle1 } from '../../styled/text';
import { useTranslations } from 'next-intl';
import ReplayIcon from '@mui/icons-material/Replay';

const GameOverContainer = ({ isGameOver, reset }: {
    isGameOver: boolean;
    reset: () => void;
}) => {
    const t = useTranslations("games.pet-the-cat");

    return (
        <Stack
            direction="row"
            sx={{ 
                height: "4.25rem", gap: "2rem", width: "100%",
                justifyContent: "center", alignItems: "center", direction: "row"
            }}
        >
            {isGameOver ? (
                <>
                    <Subtitle1 sx={{ color: "#C20000" }}>{t("gameOver")}</Subtitle1>
                    <Button
                        variant="contained"
                        startIcon={<ReplayIcon sx={{ fontSize: "1.5rem" }} />}
                        sx={{
                            p: "1rem", width: "12.5rem", borderRadius: "0.5rem", fontSize: "1.25rem",
                            "& .MuiButton-startIcon svg": { fontSize: "1.5rem" }
                        }}
                        onClick={reset}
                    >
                        {t("reset")}
                    </Button>
                </>
            ) : (
                null
            )}
        </Stack>
    )
}

export default GameOverContainer;