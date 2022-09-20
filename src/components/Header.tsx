import { Link as MuiLink, styled, AppBar, Box, Toolbar, Typography, Button, IconButton } from "@mui/material";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Brightness2Icon from "@mui/icons-material/Brightness3";
import { useTheme } from "@mui/material/styles";
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
    const theme = useTheme();

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
                        <Link href="/about" passHref>
                            <Button
                                variant="outlined"
                                size="small"
                                sx={{
                                    mr: "20px",
                                    color: "black",
                                    borderColor: "black"
                                }}>
                                About
                            </Button>
                        </Link>
                        <IconButton
                            sx={{ color: "black" }}>
                            {theme.palette.mode === "dark" ? <Brightness7Icon /> : <Brightness2Icon />}
                        </IconButton>
                    </CustomToolBar>
                </CustomAppBar>
                <CustomToolBar />
            </Box>
        </>
    );
}
