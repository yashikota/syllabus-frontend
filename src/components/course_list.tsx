import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { Grid, Box, Button, Typography } from "@mui/material";
import { SortingState } from "@tanstack/react-table";
import React, { useState, useEffect } from "react";
import CourseCard from "./course_card";
import { Syllabus } from "types/syllabus";

interface CourseListProps {
  courses: any[];
  filters: any;
  setFilters: React.Dispatch<React.SetStateAction<Syllabus>>;
  sorting: SortingState;
  setSorting: React.Dispatch<React.SetStateAction<SortingState>>;
  setResultCount: (count: number) => void;
}

const CourseList: React.FC<CourseListProps> = ({
  courses,
  filters,
  sorting,
  setSorting,
  setResultCount,
  setFilters,
}) => {
  const [visibleCourses, setVisibleCourses] = useState(20);

  // Sort courses based on sorting state
  const sortedCourses = [...courses].sort((a, b) => {
    if (sorting.length > 0) {
      const { id, desc } = sorting[0];
      if (a[id] < b[id]) return desc ? 1 : -1;
      if (a[id] > b[id]) return desc ? -1 : 1;
    }
    return 0;
  });

  // Filter courses based on filters
  const filteredCourses = sortedCourses.filter((course) => {
    return (
      course.lecture_title.includes(filters.lecture_title) &&
      course.department.includes(filters.department) &&
      course.year.includes(filters.year) &&
      course.term.includes(filters.term) &&
      course.dow.includes(filters.dow) &&
      course.period.includes(filters.period) &&
      course.credit.includes(filters.credit) &&
      course.person.includes(filters.person) &&
      course.numbering.includes(filters.numbering)
    );
  });

  useEffect(() => {
    setResultCount(filteredCourses.length);
  }, [filteredCourses.length, setResultCount]);

  // Infinite scroll logic
  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
      setVisibleCourses((prev) => prev + 10); // Load more courses
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Helper function to check if the column is currently being sorted and in which direction
  const isSorted = (column: string) => {
    if (sorting.length > 0 && sorting[0].id === column) {
      return sorting[0].desc ? "desc" : "asc";
    }
    return null;
  };

  return (
    <Box p={2}>
      <Box mb={2} display="flex" gap={1}>
        {/* Sorting buttons with visual indicators */}
        <Button
          variant={isSorted("lecture_title") ? "contained" : "outlined"}
          color={isSorted("lecture_title") === "asc" ? "primary" : "secondary"}
          onClick={() => setSorting([{ id: "lecture_title", desc: false }])}
          startIcon={isSorted("lecture_title") === "asc" ? <ArrowUpwardIcon /> : null}
          sx={{ padding: "5px" }}
        >
          講義名昇順
        </Button>
        <Button
          variant={isSorted("lecture_title") ? "contained" : "outlined"}
          color={isSorted("lecture_title") === "desc" ? "primary" : "secondary"}
          onClick={() => setSorting([{ id: "lecture_title", desc: true }])}
          startIcon={isSorted("lecture_title") === "desc" ? <ArrowDownwardIcon /> : null}
          sx={{ padding: "5px" }}
        >
          講義名降順
        </Button>
        <Button
          variant={isSorted("department") ? "contained" : "outlined"}
          color={isSorted("department") === "asc" ? "primary" : "secondary"}
          onClick={() => setSorting([{ id: "department", desc: false }])}
          startIcon={isSorted("department") === "asc" ? <ArrowUpwardIcon /> : null}
          sx={{ padding: "5px" }}
        >
          学科昇順
        </Button>
        <Button
          variant={isSorted("department") ? "contained" : "outlined"}
          color={isSorted("department") === "desc" ? "primary" : "secondary"}
          onClick={() => setSorting([{ id: "department", desc: true }])}
          startIcon={isSorted("department") === "desc" ? <ArrowDownwardIcon /> : null}
          sx={{ padding: "5px" }}
        >
          学科降順
        </Button>
      </Box>

      {filteredCourses.length > 0 ? (
        <Grid container spacing={2}>
          {filteredCourses.slice(0, visibleCourses).map((course, index) => (
            <Grid item xs={12} sm={6} lg={4} key={index}>
              <CourseCard course={course} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box textAlign="center" mt={4} mb={4}>
          <Typography variant="h6" color="textSecondary">
            講義が見つかりませんでした。
          </Typography>
          <Typography variant="body1" color="textSecondary">
            検索条件を変更して、再度お試しください。
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setFilters({
                lecture_title: "",
                department: "",
                year: "",
                term: "",
                dow: "",
                period: "",
                credit: "",
                person: "",
                numbering: "",
                url: "",
              });
              setVisibleCourses(20); // Reset the visible courses
            }}
            sx={{ mt: 2 }}
          >
            検索条件をリセット
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default CourseList;
