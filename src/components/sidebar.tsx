import {
    TextField,
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Grid,
    Button,
    Typography,
} from "@mui/material";
import type { MRT_ColumnDef } from "material-react-table";
import type React from "react";
import type { Syllabus } from "../types/syllabus";

interface SidebarProps {
    filters: Syllabus;
    setFilters: React.Dispatch<React.SetStateAction<Syllabus>>;
    columns: MRT_ColumnDef<Syllabus>[];
    resultCount: number;
}

const Sidebar: React.FC<SidebarProps> = ({
    filters,
    setFilters,
    columns,
    resultCount,
}) => {
    const handleFilterChange = (
        e:
            | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            | { target: { name: string; value: string } },
    ) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const renderFilterField = (column: MRT_ColumnDef<Syllabus>) => {
        if (
            column.filterVariant === "multi-select" &&
            column.filterSelectOptions
        ) {
            return (
                <Grid
                    item
                    xs={12}
                    sm={6}
                    md={2.4}
                    lg={1.33}
                    key={column.accessorKey as string}
                >
                    <FormControl fullWidth variant="outlined">
                        <InputLabel>{column.header}</InputLabel>
                        <Select
                            name={column.accessorKey as string}
                            value={
                                (filters[column.accessorKey as keyof Syllabus] || "").toString()
                            }
                            onChange={handleFilterChange}
                            label={column.header}
                            MenuProps={{
                                PaperProps: {
                                    style: {
                                        maxHeight: 750, // Set a maximum height for the dropdown menu
                                        zIndex: 1301, // Ensure the dropdown appears above other elements
                                    },
                                },
                            }}
                        >
                            {column.filterSelectOptions.map((option) =>
                                typeof option === "string" ? (
                                    <MenuItem key={option} value={option}>
                                        {option}
                                    </MenuItem>
                                ) : (
                                    <MenuItem
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.text}
                                    </MenuItem>
                                ),
                            )}
                        </Select>
                    </FormControl>
                </Grid>
            );
        }

        return (
            <Grid
                item
                xs={12}
                sm={6}
                md={2.4}
                lg={1.33}
                key={column.accessorKey as string}
            >
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
    };

    const handleReset = () => {
        setFilters({
            lecture_title: "",
            department: "",
            year: "",
            term: "",
            dow: [""],
            period: [""],
            credit: "",
            person: [""],
            numbering: "",
            url: "",
        });
    };

    return (
        <Box p={2}>
            <Grid container spacing={2}>
                {columns.map((column) => renderFilterField(column))}
            </Grid>
            <Grid container spacing={2} pt={1.2} alignItems="center">
                <Grid item>
                    <Button variant="outlined" onClick={handleReset}>
                        リセット
                    </Button>
                </Grid>
                <Grid item>
                    <Typography variant="body2" color="textSecondary">
                        {resultCount}件の検索結果
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Sidebar;
