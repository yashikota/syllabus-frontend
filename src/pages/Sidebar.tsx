import { TextField, Box, FormControl, InputLabel, Select, MenuItem, Grid } from "@mui/material";
import { MRT_ColumnDef } from "material-react-table";
import React from "react";
import { Syllabus } from "../types/syllabus";

interface SidebarProps {
  filters: Syllabus;
  setFilters: React.Dispatch<React.SetStateAction<Syllabus>>;
  columns: MRT_ColumnDef<Syllabus>[];
}

const Sidebar: React.FC<SidebarProps> = ({ filters, setFilters, columns }) => {
  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { name: string; value: string } },
  ) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const renderFilterField = (column: MRT_ColumnDef<Syllabus>) => {
    if (column.filterVariant === "multi-select" && column.filterSelectOptions) {
      return (
        <Grid item xs={12} sm={6} md={3} lg={2} key={column.accessorKey as string}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>{column.header}</InputLabel>
            <Select
              name={column.accessorKey as string}
              value={filters[column.accessorKey as keyof Syllabus] || ""}
              onChange={handleFilterChange}
              label={column.header}
            >
              {column.filterSelectOptions.map((option) =>
                typeof option === "string" ? (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ) : (
                  <MenuItem key={option.value} value={option.value}>
                    {option.text}
                  </MenuItem>
                ),
              )}
            </Select>
          </FormControl>
        </Grid>
      );
    } else {
      return (
        <Grid item xs={12} sm={6} md={3} lg={2} key={column.accessorKey as string}>
          <TextField
            label={column.header}
            name={column.accessorKey as string}
            value={filters[column.accessorKey as keyof Syllabus] || ""}
            onChange={handleFilterChange}
            fullWidth
            variant="outlined"
          />
        </Grid>
      );
    }
  };

  return (
    <Box p={2}>
      <Grid container spacing={2}>
        {columns.map((column) => renderFilterField(column))}
      </Grid>
    </Box>
  );
};

export default Sidebar;
