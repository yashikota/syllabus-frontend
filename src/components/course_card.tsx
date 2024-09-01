import {
    Card,
    CardContent,
    Typography,
    Grid,
    Button,
    Box,
} from "@mui/material";
import Link from "@mui/material/Link";
import React from "react";
import type { Syllabus } from "../types/syllabus";

interface CourseCardProps {
    course: Syllabus;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
    return (
        <Card
            sx={{
                backgroundColor: "background.paper",
                boxShadow: 3,
                borderRadius: 2,
                border: "1px solid",
                borderColor: "divider",
            }}
        >
            <CardContent>
                <Grid item>
                    <Typography variant="body1" color="textSecondary">
                        {course.department}
                        {course.year === '""' ? "" : ` / ${course.year}`}
                    </Typography>
                </Grid>
                <Typography variant="h5" gutterBottom>
                    {course.lecture_title}
                </Typography>
                <Grid container spacing={2}>
                    <Grid item>
                        <Typography variant="body1" color="textSecondary">
                            {course.term}
                            {" / " + course.dow}
                            {" " + course.period}
                            {" / " + course.credit}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={1}>
                    <Grid item xs={9.5} mt={1.3}>
                        <Typography variant="body1" color="textSecondary">
                            講義コード: {course.numbering}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body1" color="textSecondary">
                            担当者: {course.person}
                        </Typography>
                    </Grid>
                    <Box mt={1}>
                        <Link
                            href={`/${course.numbering}`}
                            target="_blank"
                            rel="noopener"
                        >
                            <Button
                                variant="outlined"
                                color="inherit"
                                size="small"
                            >
                                詳細
                            </Button>
                        </Link>
                    </Box>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default CourseCard;
