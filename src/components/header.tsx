import { Link as MuiLink, styled, AppBar, Box, Toolbar, Typography, Button, IconButton } from "@mui/material";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Brightness2Icon from "@mui/icons-material/Brightness3";
import { useTheme } from "@mui/material/styles";
import Link from "next/link";
import { useRouter } from "next/router";
import ColorModeContext from "./context";
import { useContext } from "react";

const CustomToolBar = styled(Toolbar)({
    minHeight: "35px",
    backgroundColor: "#00a1ea",
});

const Header = () => {
    const theme = useTheme();

    const router = useRouter();
    const currentPath = router.pathname;
    const isTopPage = currentPath === "/";

    const colorMode = useContext(ColorModeContext);

    return (
        <>
            <Box>
                <AppBar
                    sx={{
                        position: "fixed",
                        minHeight: "35px",
                    }}>
                    <CustomToolBar>
                        <Typography
                            variant="h5"
                            component="div"
                            sx={{ flexGrow: 1 }}>
                            <MuiLink
                                target="_blank"
                                rel="noopener noreferrer"
                                href="https://oit.yashikota.com"
                                sx={{
                                    textDecoration: "none",
                                    color: "black",
                                }}>
                                OIT Tools
                            </MuiLink>
                        </Typography>
                        {
                            isTopPage ? (
                                <Link href="/about" passHref>
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        sx={{
                                            mr: "20px",
                                            color: "black",
                                            borderColor: "black",
                                            textTransform: "none",
                                        }}>
                                        About
                                    </Button>
                                </Link>
                            ) : (
                                <Link href="/" passHref>
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        sx={{
                                            mr: "20px",
                                            color: "black",
                                            borderColor: "black",
                                            textTransform: "none",
                                        }}>
                                        戻る
                                    </Button>
                                </Link>
                            )
                        }
                        <IconButton
                            sx={{ color: "black" }}
                            onClick={colorMode.toggleColorMode}
                        >
                            {theme.palette.mode === "dark" ? <Brightness7Icon /> : <Brightness2Icon />}
                        </IconButton>
                    </CustomToolBar>
                </AppBar>
                <CustomToolBar />
            </Box>
        </>
    );
}

export default Header;
