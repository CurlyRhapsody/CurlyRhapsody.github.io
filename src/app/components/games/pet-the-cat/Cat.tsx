import { Box } from "@mui/material";
import { CatState } from "./PetCatGameBoard";

const Cat = ({ gameState, onPet }: {
    gameState: CatState;
    onPet: (event: React.MouseEvent<HTMLDivElement>) => void;
}) => {
    return (
        <Box></Box>
    )
}

export default Cat;