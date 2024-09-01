import fs from "fs/promises";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ShareIcon from "@mui/icons-material/Share";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  CardContent,
  Grid,
  Snackbar,
} from "@mui/material";
import Head from "next/head";
import React, { useState } from "react";
import { YEAR } from "pages";

const cache: any = {};

export const getStaticProps = async (context: any) => {
  const numbering = context.params.numbering;
  const url = `https://raw.githubusercontent.com/yashikota/syllabus-scraping/master/data/${YEAR}.json`;
  const fileName = "data.json";
  let data: any;

  try {
    if (cache[fileName]) {
      data = cache[fileName];
    } else {
      const file = await fs.readFile(fileName);
      data = JSON.parse(file.toString());
      cache[fileName] = data;
    }
  } catch (error) {
    const res = await fetch(url);
    data = await res.json();
    await fs.writeFile(fileName, JSON.stringify(data));
    console.error(`File not found: ${numbering}`);
  }
  const syllabus = data[numbering];

  return {
    props: { syllabus },
  };
};

export const getStaticPaths = async () => {
  const url = `https://raw.githubusercontent.com/yashikota/syllabus-scraping/master/data/${YEAR}table.json`;
  const res = await fetch(url);
  const syllabuses = await res.json();
  const paths = syllabuses.map((syllabus: any) => ({
    params: { numbering: syllabus.numbering },
  }));

  return {
    paths,
    fallback: false,
  };
};

const traverse = (obj: any) => {
  Object.keys(obj).forEach((key) => {
    const value = obj[key];
    if (typeof value === "string") {
      obj[key] = value.replace(/\\n/g, "\n");
    } else if (typeof value === "object") {
      traverse(value);
    }
  });
};

const Syllabus = ({ syllabus }: any) => {
  traverse(syllabus);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleShareClick = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl).then(() => {
      setOpenSnackbar(true);
    });
  };

  const handleCloseSnackbar = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <>
      <Head>
        <title>{syllabus.lecture_title} | OITシラバスアプリ</title>
        <meta property="og:title" content={`${syllabus.lecture_title} | OITシラバスアプリ`} key="title" />
        <meta
          property="og:description"
          content={`${syllabus.department} ${syllabus.year} ${syllabus.term} ${syllabus.person}`}
          key="description"
        />
      </Head>

      <Box sx={{ width: "100%", maxWidth: "1200px", mx: "auto", p: 3 }}>
        <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
          <Button
            variant="contained"
            color="secondary"
            href={syllabus.url}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              display: "flex",
              alignItems: "center",
              p: 1,
              borderRadius: "8px",
              boxShadow: 3,
              transition: "background-color 0.3s",
              "&:hover": {
                backgroundColor: "primary.main",
                color: "white",
              },
              fontSize: "0.9rem",
            }}
            startIcon={<OpenInNewIcon />}
          >
            公式シラバスへ
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleShareClick}
            sx={{
              display: "flex",
              alignItems: "center",
              p: 1,
              borderRadius: "8px",
              boxShadow: 3,
              transition: "background-color 0.3s",
              "&:hover": {
                backgroundColor: "secondary.main",
                color: "white",
              },
              fontSize: "0.9rem",
            }}
            startIcon={<ShareIcon />}
          >
            リンクを共有
          </Button>
        </Box>

        <Typography component="div" sx={{ m: 1 }}>
          <Typography variant="h5" component="div" gutterBottom sx={{ fontWeight: "bold", mb: 2 }}>
            {syllabus.lecture_title} | {syllabus.lecture_title_en}
          </Typography>

          <Card variant="outlined" sx={{ mb: 3 }}>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="h6" sx={{ fontWeight: "bold", color: "textSecondary" }}>
                    基本情報
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2" sx={{ color: "textSecondary" }}>
                    {syllabus.department} | {syllabus.year} | {syllabus.term} | {syllabus.dow} | {syllabus.period} |{" "}
                    {syllabus.credit} | {syllabus.person} | {syllabus.numbering}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          <Typography variant="h6" sx={{ fontWeight: "bold", mt: 3, color: "primary.main" }}>
            授業のねらい・概要
          </Typography>
          <Box sx={{ fontSize: "0.9rem", whiteSpace: "pre-line", ml: 3 }}>{syllabus.aim}</Box>

          <Typography variant="h6" sx={{ fontWeight: "bold", mt: 3, color: "primary.main" }}>
            授業計画
          </Typography>
          <TableContainer component={Card} variant="outlined">
            <Table sx={{ minWidth: 550 }} aria-label="syllabus" size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ width: 10 }}></TableCell>
                  <TableCell>テーマ</TableCell>
                  <TableCell>内容・方法等</TableCell>
                  <TableCell>予習/復習</TableCell>
                </TableRow>
              </TableHead>
              {syllabus.themes === "記載なし" ||
              syllabus.contents === "記載なし" ||
              syllabus.preparations === "記載なし" ? (
                <TableBody>
                  <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    <TableCell></TableCell>
                    <TableCell>{syllabus.themes}</TableCell>
                    <TableCell>{syllabus.contents}</TableCell>
                    <TableCell>{syllabus.preparations}</TableCell>
                  </TableRow>
                </TableBody>
              ) : (
                <TableBody>
                  {syllabus.themes.map((theme: any, index: number) => (
                    <TableRow
                      key={index}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        {index + 1}
                      </TableCell>
                      <TableCell sx={{ whiteSpace: "pre-line", fontSize: "0.9rem" }}>{theme}</TableCell>
                      <TableCell sx={{ whiteSpace: "pre-line", fontSize: "0.9rem" }}>
                        {syllabus.contents[index]}
                      </TableCell>
                      <TableCell sx={{ whiteSpace: "pre-line", fontSize: "0.9rem" }}>
                        {syllabus.preparations[index]}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              )}
            </Table>
          </TableContainer>

          {[
            "目標",
            "評価方法",
            "評価基準",
            "教科書",
            "参考書",
            "受講心得",
            "オフィスアワー",
            "実践的教育",
            "CSコース",
            "スパイラル型教育",
          ].map((section) => (
            <Box key={section}>
              <Typography variant="h6" sx={{ fontWeight: "bold", mt: 3, color: "primary.main" }}>
                {section}
              </Typography>
              <Box sx={{ fontSize: "0.9rem", whiteSpace: "pre-line", ml: 3 }}>{syllabus[section.toLowerCase()]}</Box>
            </Box>
          ))}
        </Typography>
      </Box>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message="リンクがクリップボードにコピーされました"
      />
    </>
  );
};

export default Syllabus;
