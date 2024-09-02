import {
    Card,
    CardContent,
    Typography,
    Stack,
} from "@mui/material";
import Link from "@mui/material/Link";
import type React from "react";
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
            <Link
                href={`/${course.numbering}`}
                target="_blank"
                rel="noopener"
                underline="none"
            >
                <CardContent>
                    {/* 学部・学科と年次、講義コード */}
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{ width: "100%" }}
                    >
                        <Typography
                            variant="body1"
                            color="textSecondary"
                            sx={{
                                flexGrow: 1,
                            }}
                        >
                            {course.department}
                            {course.year === '""'
                                ? ""
                                : ` / ${course.year.slice(0, -1)}`}
                        </Typography>
                        <Typography
                            variant="body2"
                            color="textSecondary"
                            sx={{ flexShrink: 0, ml: 2 }}
                        >
                            {course.numbering}
                        </Typography>
                    </Stack>

                    {/* 講義名 */}
                    <Typography variant="h5" color="primary">
                        {course.lecture_title}
                    </Typography>

                    {/* 期間、曜日・時限、単位数 */}
                    <Typography variant="body1" color="textSecondary">
                        {course.term}
                        {` / ${course.dow}`}
                        {` ${course.period}`}
                        {` / ${course.credit}`}
                    </Typography>

                    {/* 担当教員 */}
                    <Typography variant="body1" color="textSecondary">
                        {course.person}
                    </Typography>
                </CardContent>
            </Link>
        </Card>
    );
};

export default CourseCard;
