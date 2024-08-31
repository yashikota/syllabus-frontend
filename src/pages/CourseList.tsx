import { Grid, Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import CourseCard from "./CourseCard";

interface CourseListProps {
  courses: any[];
  filters: any;
}

const CourseList: React.FC<CourseListProps> = ({ courses, filters }) => {
  const [visibleCourses, setVisibleCourses] = useState(10);

  // Filter courses based on filters
  const filteredCourses = courses.filter((course) => {
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

  // Infinite scroll logic
  const handleScroll = () => {
    // Detect if the user has scrolled to the bottom of the page
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
      setVisibleCourses((prev) => prev + 10); // Load more courses
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Box p={2}>
      <Grid container spacing={2}>
        {filteredCourses.slice(0, visibleCourses).map((course, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <CourseCard course={course} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CourseList;
