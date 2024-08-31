import Brightness2Icon from "@mui/icons-material/Brightness3";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { Link as MuiLink, styled, AppBar, Box, Toolbar, Typography, Button, IconButton } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactElement } from "react";
import { usePaletteMode } from "../atom/theme";

const CustomToolBar = styled(Toolbar)({
  minHeight: "45px",
  background: "linear-gradient(90deg, #007bb2, #00a1ea)",
  color: "#fff",
  padding: "0 20px",
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

  return (
    <>
      <Box>
        <AppBar
          sx={{
            position: "fixed",
            minHeight: "45px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            zIndex: 1400, // 他の要素より前面に出す
          }}
        >
          <CustomToolBar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: "bold" }}>
              OITシラバスアプリ
            </Typography>
            {isTopPage ? (
              <Link href="/about" passHref>
                <Button
                  variant="outlined"
                  size="small"
                  sx={{
                    mr: "20px",
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
                    mr: "20px",
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
              {isDarkMode ? <Brightness7Icon /> : <Brightness2Icon />}
            </IconButton>
          </CustomToolBar>
        </AppBar>
        <CustomToolBar />
      </Box>
    </>
  );
};

export default Header;
