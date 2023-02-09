import Brightness2Icon from "@mui/icons-material/Brightness3";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { Link as MuiLink, styled, AppBar, Box, Toolbar, Typography, Button, IconButton } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactElement } from "react";
import { usePaletteMode } from "../atom/theme";

const CustomToolBar = styled(Toolbar)({
  minHeight: "35px",
  backgroundColor: "#00a1ea",
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
            minHeight: "35px",
          }}
        >
          <CustomToolBar>
            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
              <MuiLink
                target="_blank"
                rel="noopener noreferrer"
                href="https://oit.yashikota.com"
                sx={{
                  textDecoration: "none",
                  color: "black",
                }}
              >
                OIT Tools
              </MuiLink>
            </Typography>
            {isTopPage ? (
              <Link href="/about" passHref>
                <Button
                  variant="outlined"
                  size="small"
                  sx={{
                    mr: "20px",
                    color: "black",
                    borderColor: "black",
                    textTransform: "none",
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
                    color: "black",
                    borderColor: "black",
                    textTransform: "none",
                  }}
                >
                  戻る
                </Button>
              </Link>
            )}
            <IconButton
              size="small"
              sx={{
                color: "black",
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
