import { Box, Container, Grid, Link, Typography } from "@mui/material";
import { styled } from "@mui/system";

const FooterContainer = styled(Box)({
  backgroundColor: "#0a3d62", // ダークブルーの背景色
  color: "#ffffff", // 白色のテキスト
  padding: "30px 0", // 上下の余白
  marginTop: "auto", // ページの最下部に固定する
});

const FooterLink = styled(Link)({
  color: "#ffffff",
  textDecoration: "none",
  "&:hover": {
    textDecoration: "underline",
  },
});

const Footer = () => {
  return (
    <FooterContainer>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* 左側のセクション */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              OITシラバスアプリ
            </Typography>
            <Typography variant="body2">
              OITシラバスアプリは、学生が簡単にシラバス情報を取得できるように設計されています。最新の情報をお届けします。
            </Typography>
          </Grid>

          {/* 中央のセクション */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              リンク
            </Typography>
            <Typography variant="body2">
              <FooterLink href="/">ホーム</FooterLink>
            </Typography>
            <Typography variant="body2">
              <FooterLink href="/about">About</FooterLink>
            </Typography>
          </Grid>
        </Grid>

        {/* 下部のコピーライトセクション */}
        <Box textAlign="center" pt={5}>
          <Typography variant="body2" color="inherit">
            © {new Date().getFullYear()} OITシラバスアプリ. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </FooterContainer>
  );
};

export default Footer;
