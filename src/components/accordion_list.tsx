import type React from "react";
import { useState } from "react";
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Card,
    Button,
    Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface SyllabusData {
    themes: string[] | "記載なし";
    contents: string[] | "記載なし";
    preparations: string[] | "記載なし";
}

interface ExpandedPanels {
    [key: number]: boolean;
}

interface SyllabusAccordionProps {
    syllabus: SyllabusData;
}

export default function SyllabusAccordion({
    syllabus,
}: SyllabusAccordionProps) {
    const [expandedPanels, setExpandedPanels] = useState<ExpandedPanels>({});

    const isDataUnavailable =
        syllabus.themes === "記載なし" ||
        syllabus.contents === "記載なし" ||
        syllabus.preparations === "記載なし";

    const handleToggleAll = () => {
        if (allExpanded) {
            setExpandedPanels({});
        } else {
            const allExpandedState = (syllabus.themes as string[]).reduce(
                (acc, _, index) => {
                    acc[index] = true;
                    return acc;
                },
                {} as ExpandedPanels,
            );
            setExpandedPanels(allExpandedState);
        }
    };

    const handleChange =
        (panel: number) => (_: React.SyntheticEvent, isExpanded: boolean) => {
            setExpandedPanels((prev) => ({ ...prev, [panel]: isExpanded }));
        };

    const allExpanded =
        Array.isArray(syllabus.themes) &&
        syllabus.themes.length > 0 &&
        Object.keys(expandedPanels).length === syllabus.themes.length &&
        Object.values(expandedPanels).every(Boolean);

    if (isDataUnavailable) {
        return <Typography>記載なし</Typography>;
    }

    return (
        <Card variant="outlined" sx={{ padding: "16px" }}>
            <Box display="flex" justifyContent="space-between" mb={2}>
                <Typography variant="h6" color="secondary">
                    テーマ
                </Typography>
                <Button variant="outlined" onClick={handleToggleAll}>
                    {allExpanded ? "すべて閉じる" : "すべて開く"}
                </Button>
            </Box>
            {(syllabus.themes as string[]).map((theme, index) => (
                <Accordion
                    key={index}
                    expanded={!!expandedPanels[index]}
                    onChange={handleChange(index)}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`panel${index}-content`}
                        id={`panel${index}-header`}
                    >
                        <Box sx={{ width: "30px", textAlign: "center" }}>
                            <Typography>{index + 1}</Typography>
                        </Box>
                        <Typography>{theme}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography variant="h6" color="secondary">
                            内容・方法等
                        </Typography>
                        <Typography
                            sx={{
                                whiteSpace: "pre-line",
                                fontSize: "0.9rem",
                                marginBottom: "8px",
                            }}
                        >
                            {(syllabus.contents as string[])[index]}
                        </Typography>
                        <Typography variant="h6" color="secondary">
                            予習/復習
                        </Typography>
                        <Typography
                            sx={{
                                whiteSpace: "pre-line",
                                fontSize: "0.9rem",
                            }}
                        >
                            {(syllabus.preparations as string[])[index]}
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            ))}
        </Card>
    );
}
