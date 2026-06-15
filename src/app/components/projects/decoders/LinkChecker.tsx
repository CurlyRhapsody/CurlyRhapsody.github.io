import { useTranslations } from 'next-intl';
import { Stack, TextField } from '@mui/material';
import { useState } from 'react';
import { Subtitle2 } from '../../styled/text';
import LinkCheckTable from './LinkCheckTable';

const LinkChecker = () => {
    
    const t = useTranslations("project.decoders.link-check");
    const [decipheredText, setDecipheredText] = useState<string>("");
    
    return (
        <Stack sx={{ width: "100%", alignItems: "center", gap: "1rem", p: "0 2rem 1.5rem" }}>
            <Stack direction="row" sx={{ width: "100%", px: "2rem", gap: "1.5rem", alignItems: "center", justifyContent: "center" }}>
                <Subtitle2>{t("deciphered")}</Subtitle2>
                <TextField
                    value={decipheredText}
                    onChange={(e) => {
                        const text = e.target.value;
                        setDecipheredText(text)
                    }}
                    sx={{
                        width: "30rem",
                        "& .MuiInputBase-input": { padding: "0.5rem" },
                        "& .MuiInputBase-root": { pl: "0.5rem" },
                    }}
                />
            </Stack>
            <LinkCheckTable idText={decipheredText} />
        </Stack>
    );
}

export default LinkChecker;