import Brightness2Icon from "@mui/icons-material/Brightness3";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import {
    Link as MuiLink,
    styled,
    AppBar,
    Box,
    Toolbar,
    Typography,
    Button,
    IconButton,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";
import { usePaletteMode } from "../atom/theme";

const CustomToolBar = styled(Toolbar)<{ isScrolled: boolean }>(
    ({ isScrolled }) => ({
        minHeight: isScrolled ? "35px !important" : "45px !important",
        background: "linear-gradient(90deg, #007bb2, #00a1ea)",
        color: "#fff",
        padding: isScrolled ? "0 10px" : "0 20px",
        transition: "all 0.3s ease-in-out",
        "@media (min-width: 600px)": {
            height: isScrolled ? "45px" : "64px",
        },
    }),
);

// メディアによって高さを変えるためのコンポーネント
const ToolbarHeight = styled(Box)({
    height: "64px",
    "@media (max-width: 600px)": {
        height: "45px",
    },
});

const Header = (): ReactElement => {
    const router = useRouter();
    const currentPath = router.pathname;
    const isTopPage = currentPath === "/";

    const [paletteMode, setPaletteMode] = usePaletteMode();
    const isDarkMode = paletteMode === "dark";
    const togglePaletteMode = () => {
        setPaletteMode(paletteMode === "light" ? "dark" : "light");
    };

    const [headerOpacity, setHeaderOpacity] = useState(1);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            setHeaderOpacity(scrollY === 0 ? 1 : 0.7);
            setIsScrolled(scrollY > 0);
        };

        window.addEventListener("scroll", handleScroll);

        // Cleanup function to remove the event listener when the component is unmounted
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <>
            <Box>
                <AppBar
                    sx={{
                        position: "fixed",
                        minHeight: isScrolled ? "35px" : "45px",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                        zIndex: 1400,
                        opacity: headerOpacity,
                        transition: "all 0.3s ease-in-out",
                    }}
                >
                    <CustomToolBar isScrolled={isScrolled}>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{
                                flexGrow: 1,
                                fontWeight: "bold",
                                fontSize: isScrolled ? "1rem" : "1.25rem",
                                transition: "font-size 0.3s ease-in-out",
                            }}
                        >
                            OITシラバスアプリ
                        </Typography>
                        {isTopPage ? (
                            <Link href="/about" passHref>
                                <Button
                                    variant="outlined"
                                    size="small"
                                    sx={{
                                        mr: isScrolled ? "10px" : "20px",
                                        color: "#fff",
                                        borderColor: "#fff",
                                        textTransform: "none",
                                        "&:hover": {
                                            backgroundColor: "#fff",
                                            color: "#00a1ea",
                                        },
                                    }}
                                >
                                    About
                                </Button>
                            </Link>
                        ) : (
                            <Link href="/" passHref>
                                <Button
                                    variant="outlined"
                                    size="small"
                                    sx={{
                                        mr: isScrolled ? "10px" : "20px",
                                        color: "#fff",
                                        borderColor: "#fff",
                                        textTransform: "none",
                                        "&:hover": {
                                            backgroundColor: "#fff",
                                            color: "#00a1ea",
                                        },
                                    }}
                                >
                                    戻る
                                </Button>
                            </Link>
                        )}
                        <IconButton
                            size="small"
                            sx={{
                                color: "#fff",
                                "&:hover": {
                                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                                },
                            }}
                            onClick={togglePaletteMode}
                        >
                            {isDarkMode ? (
                                <Brightness7Icon />
                            ) : (
                                <Brightness2Icon />
                            )}
                        </IconButton>
                    </CustomToolBar>
                </AppBar>
                <ToolbarHeight />
            </Box>
        </>
    );
};

export default Header;
