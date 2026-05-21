import { Box, Grid, Paper, Stack, styled, TableCell, useMediaQuery } from "@mui/material";
import { ChartsSurface, ChartsTooltip, ChartsWrapper, RadarAxisHighlight, RadarDataProvider, RadarGrid, RadarSeries, RadarSeriesArea, RadarSeriesMarks, useDrawingArea } from "@mui/x-charts";
import { useTranslations } from "next-intl";

import CodeIcon from '@mui/icons-material/Code';
import SecurityIcon from '@mui/icons-material/Security';
import DatasetIcon from '@mui/icons-material/Dataset';
import DnsIcon from '@mui/icons-material/Dns';
import BugReportIcon from '@mui/icons-material/BugReport';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import PsychologyIcon from '@mui/icons-material/Psychology';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import { SvgIconComponent } from "@mui/icons-material";
import { Subtitle1 } from "../../styled/text";

const metrics = ["Frontend", "CyberSec", "DB", "API", "TestQA", "DevOpsCICD", "AI", "SysDesign"];

const iconMap: Record<string, React.ReactNode> = {
    "Frontend": <CodeIcon />,
    "CyberSec": <SecurityIcon />,
    "DB": <DatasetIcon />,
    "API": <DnsIcon />,
    "TestQA": <BugReportIcon />,
    "DevOpsCICD": <AllInclusiveIcon />,
    "AI": <PsychologyIcon />,
    "SysDesign": <DesignServicesIcon />
}

const seriesData: RadarSeries = {
    data: [8, 4, 5, 7, 5, 3, 5, 6],
}

/* ----- Radar Chart ----- */

const IconMetricLabel = () => {

    const { width, height, left, top } = useDrawingArea();

    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const responsiveRadius = Math.min(width, height) / 2 * (1.4 - (0.2 * (Math.min(width, height)) / 220));

    return (
        <>
            {metrics.map((metric, index) => {
                const angleDeg = ((index - 2) * 360) / metrics.length;
                const angleRad = (angleDeg * Math.PI) / 180;

                const x = centerX + responsiveRadius * Math.cos(angleRad);
                const y = centerY + responsiveRadius * Math.sin(angleRad);

                return (
                    <g key={metric} transform={`translate(${x}, ${y})`}>
                        <foreignObject
                            x="-2rem"
                            y="-2rem"
                            width="4rem"
                            height="4rem"
                            style={{ overflow: "visible" }}
                        >
                            <div
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '2.25rem',
                                    color: 'black',
                                }}
                            >
                                {iconMap[metric]}
                            </div>
                        </foreignObject>
                    </g>
                )
            })}
        </>
    )
}

const SkillRadarChart = () => {
    const t = useTranslations("profile.form.skill");

    return (
        <RadarDataProvider
            series={[{ ...seriesData, color: "#1E90FF", type: "radar", label: t("radar.myScore") }]}
            radar={{
                metrics: metrics.map((name) => ({ name: t(name), max: 10 })),
                startAngle: 0
            }}
        >
            <ChartsWrapper sx={{ width: "100%" }}>
                <ChartsSurface>
                    <RadarGrid divisions={5} shape="circular" />
                    <IconMetricLabel />
                    <RadarAxisHighlight />
                    <RadarSeriesArea fillOpacity={0.35} fill="#349BFF" strokeWidth={1} />
                    <RadarSeriesMarks r="0.1875rem" />
                    <ChartsTooltip />
                </ChartsSurface>
            </ChartsWrapper>
        </RadarDataProvider>
    )
}

/* ----- Table (If webpage is too narrow) ----- */

const SkillScoreCard = ({ title, score, icon }: {
    title: string;
    score: number;
    icon: React.ReactNode;
}) => (
    <Grid size={6}>
        <Paper sx={{ display: "flex", flexDirection: "column", padding: "1rem", height: "6.5rem" }}>
            <Stack direction="row" sx={{ gap: "0.5rem", alignItems: "center" }}>
                {icon}
                {title}
            </Stack>
            <Subtitle1 sx={{ textAlign: "center", mt: "auto" }}>{score}/10</Subtitle1>
        </Paper>
    </Grid>
);

const SkillGrid = () => {

    const t = useTranslations("profile.form.skill");

    return (
        <Grid container spacing="1rem">
            {metrics.map((metric, index) => (
                <SkillScoreCard
                    key={metric}
                    title={t(metric)}
                    score={seriesData.data[index]}
                    icon={iconMap[metric]}
                />
            ))
                
            }
        </Grid>
    )
}

const CodingSelfScore = ({ narrow }: { narrow: boolean }) => {

    return (
        <Box
            sx={{
                width: "100%", height: narrow ? "auto" : "30rem",
                minHeight: "20rem", maxWidth: "100%", margin: "0 auto"
            }}
        >
            {narrow ? <SkillGrid /> : <SkillRadarChart />}
        </Box>
    )
}

export default CodingSelfScore;