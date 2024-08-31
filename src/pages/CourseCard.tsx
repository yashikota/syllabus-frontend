import { Card, CardContent, Typography, Grid, Button, Box } from "@mui/material";
import Link from "@mui/material/Link";
import React from "react";
import type { Syllabus } from "../types/syllabus";

interface CourseCardProps {
  course: Syllabus;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {course.lecture_title}
        </Typography>
        <Grid container spacing={1}>
          <Grid item xs={8}>
            <Typography variant="body2" color="textSecondary">
              学科: {course.department}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body2" color="textSecondary">
              {course.year === '""' ? "" : `年次: ${course.year}`}
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="body2" color="textSecondary">
              曜日: {course.dow}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body2" color="textSecondary">
              期間: {course.term}
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="body2" color="textSecondary">
              時限: {course.period}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body2" color="textSecondary">
              単位: {course.credit}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" color="textSecondary">
              担当者: {course.person}
            </Typography>
          </Grid>
          <Grid item xs={9.5} mt={1.3}>
            <Typography variant="body2" color="textSecondary">
              講義コード: {course.numbering}
            </Typography>
          </Grid>
          <Box mt={1}>
            <Link href={`/${course.numbering}`} target="_blank" rel="noopener">
              <Button variant="outlined" color="inherit" size="small">
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
