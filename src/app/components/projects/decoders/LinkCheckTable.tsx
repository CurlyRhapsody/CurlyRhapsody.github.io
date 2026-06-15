import { Box, Grid, Stack, SvgIcon, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useTranslations } from "next-intl";
import { Body1 } from "../../styled/text";

import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import LinkIcon from '@mui/icons-material/Link';
import Link from "next/link";

type RowInfo = {
    locale: string;
    regex: RegExp;
    linkBase: string;
}

const rowData: RowInfo[] = [
    {
        locale: "yt-video",
        regex: /^[a-zA-Z0-9_-]{11}$/,
        linkBase: "https://www.youtube.com/watch?v=",
    },
    {
        locale: "yt-playlist",
        regex: /^PL[a-zA-Z0-9_-]{16,32}$/,
        linkBase: "https://www.youtube.com/playlist?list=",
    },
    {
        locale: "imgur",
        regex: /^[a-zA-Z0-9]{5,7}$/,
        linkBase: "https://imgur.com/",
    },
    {
        locale: "gd-file",
        regex: /^[a-zA-Z0-9-_]{25,}$/,
        linkBase: "https://drive.google.com/file/d/",
    },
    {
        locale: "gd-folder",
        regex: /^[a-zA-Z0-9-_]{25,}$/,
        linkBase: "https://drive.google.com/drive/folders/",
    },
    {
        locale: "pastebin",
        regex: /^[a-zA-Z0-9]{8}$/,
        linkBase: "https://pastebin.com/",
    },
    {
        locale: "mega-file",
        regex: /^([^#]+)#(.+)|#(F?)!([^!]+)!(.+)$/,
        linkBase: "https://mega.nz/file/",
    },
    {
        locale: "mega-folder",
        regex: /^([^#]+)#(.+)|#(F?)!([^!]+)!(.+)$/,
        linkBase: "https://mega.nz/folder/",
    }
]

const LinkRow = ({
    linkType, link, isValid
}: {
    linkType: string;
    link: string;
    isValid: boolean;
}) => {

    const t = useTranslations("project.decoders.link-check");

    return (
        <TableRow>
            <TableCell colSpan={3}>
                <Body1>{t(linkType)}</Body1>
            </TableCell>
            <TableCell colSpan={1} sx={{ textAlign: "center" }}>
                <SvgIcon component={isValid ? CheckIcon : CloseIcon} sx={{ fontSize: "1.5rem", color: isValid ? "#00D40A" : "#C20000" }} />
            </TableCell>
            <TableCell colSpan={1} sx={{ textAlign: "center" }}>
                <Link href={link} target="_blank">
                    {isValid && <LinkIcon sx={{ fontSize: "1.5rem" }} />}
                </Link>
            </TableCell>
        </TableRow>
    )
}

const LinkCheckTable = ({ idText }: { idText: string }) => {

    const t = useTranslations("project.decoders.link-check");

    return (
        <Stack sx={{ width: "100%", alignItems: "center" }}>
            <TableContainer component={Grid}>
                <Table sx={{ tableLayout: "fixed", width: "100%" }}>
                    <TableHead>
                        <TableRow>
                            <TableCell colSpan={3}>
                                <Body1>{t("type")}</Body1>
                            </TableCell>
                            <TableCell colSpan={1} sx={{ textAlign: "center" }}>
                                <Body1>{t("isValid")}</Body1>
                            </TableCell>
                            <TableCell colSpan={1} sx={{ textAlign: "center" }}>
                                <Body1>{t("link")}</Body1>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rowData.map((row) => (
                            <LinkRow
                                linkType={row.locale}
                                link={`${row.linkBase}${idText}`}
                                isValid={row.regex.test(idText)}
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Stack>
    )
    
}

export default LinkCheckTable;