import { Link as MuiLink, styled, AppBar, Box, Toolbar, Typography, Button, IconButton } from "@mui/material";
import Link from "next/link";

const CustomAppBar = styled(AppBar)({
    position: "fixed",
    minHeight: "35px",
});

const CustomToolBar = styled(Toolbar)({
    minHeight: "35px",
    backgroundColor: "#00a1ea",
});

const CustomLink = styled(MuiLink)({
    textDecoration: "none",
    color: "black",
});

export default function Header() {
    return (
        <>
            <Box>
                <CustomAppBar>
                    <CustomToolBar>
                        <Typography
                            variant="h5"
                            component="div"
                            sx={{ flexGrow: 1 }}>
                            <CustomLink
                                target="_blank"
                                rel="noopener noreferrer"
                                href="https://oit.yashikota.com">
                                OIT Tools
                            </CustomLink>
                        </Typography>
                    </CustomToolBar>
                </CustomAppBar>
                <CustomToolBar />
            </Box>
        </>
    );
}
