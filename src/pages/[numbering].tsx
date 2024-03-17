import fs from "fs/promises";
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
} from "@mui/material";
import Head from "next/head";
import { YEAR } from "pages";

const cache: any = {};

export const getStaticProps = async (context: any) => {
  const numbering = context.params.numbering;
  console.log(numbering);

  const url = `https://raw.githubusercontent.com/oit-tools/syllabus-scraping/master/data/${YEAR}.json`;
  const fileName = "data.json";
  let data: any;

  try {
    // ファイルがある場合は、ファイルからデータを取得する
    // ファイルを読み込んだら、cacheに保存する
    // 2回目以降は、cacheからデータを取得する
    if (cache[fileName]) {
      data = cache[fileName];
      console.log("Cache");
    } else {
      const file = await fs.readFile(fileName);
      data = JSON.parse(file.toString());
      cache[fileName] = data;
      console.log("Not cache");
    }
  } catch (error) {
    // ファイルがない場合は、データを取得する
    // データを取得したら、ファイルに保存する
    const res = await fetch(url);
    data = await res.json();
    await fs.writeFile(fileName, JSON.stringify(data));
    console.log("Not file");
  }
  const syllabus = data[numbering];

  return {
    props: { syllabus },
  };
};

export const getStaticPaths = async () => {
  const url = `https://raw.githubusercontent.com/oit-tools/syllabus-scraping/master/data/${YEAR}table.json`;
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

      <title>{syllabus.lecture_title}</title>
      <Box sx={{ width: "100%", maxWidth: "100%" }}>
        <Button
          variant="contained"
          color="primary"
          href={syllabus.url}
          target="_blank"
          sx={{ float: "right", margin: "10px" }}
        >
          公式シラバスへ
        </Button>

        <Typography component="div" sx={{ m: 1.5 }}>
          <Box sx={{ fontSize: "h4.fontSize" }}>
            {syllabus.lecture_title} | {syllabus.lecture_title_en}
          </Box>
          <Box sx={{ fontSize: "h5.fontSize", mt: 1 }}>
            {syllabus.department} | {syllabus.year} | {syllabus.term} | {syllabus.dow} | {syllabus.period} |{" "}
            {syllabus.credit} | {syllabus.person} | {syllabus.numbering}
          </Box>

          <Box sx={{ fontSize: "h5.fontSize", fontWeight: "bold", mt: 3 }}>授業のねらい・概要</Box>
          <Box sx={{ fontSize: "h6.fontSize", whiteSpace: "pre-line", ml: 3 }}>{syllabus.aim}</Box>

          <Box sx={{ fontSize: "h5.fontSize", fontWeight: "bold", mt: 3 }}>授業計画</Box>
          <TableContainer>
            <Table sx={{ minWidth: 550 }} aria-label="syllabus">
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
                    <TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                      <TableCell component="th" scope="row">
                        {index + 1}
                      </TableCell>
                      <TableCell sx={{ whiteSpace: "pre-line" }}>{theme}</TableCell>
                      <TableCell sx={{ whiteSpace: "pre-line" }}>{syllabus.contents[index]}</TableCell>
                      <TableCell sx={{ whiteSpace: "pre-line" }}>{syllabus.preparations[index]}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              )}
            </Table>
          </TableContainer>

          <Box sx={{ fontSize: "h5.fontSize", fontWeight: "bold", mt: 3 }}>目標</Box>
          <Box sx={{ fontSize: "h6.fontSize", whiteSpace: "pre-line", ml: 3 }}>{syllabus.target}</Box>

          <Box sx={{ fontSize: "h5.fontSize", fontWeight: "bold", mt: 3 }}>評価方法</Box>
          <Box sx={{ fontSize: "h6.fontSize", whiteSpace: "pre-line", ml: 3 }}>{syllabus.method}</Box>

          <Box sx={{ fontSize: "h5.fontSize", fontWeight: "bold", mt: 3 }}>評価基準</Box>
          <Box sx={{ fontSize: "h6.fontSize", whiteSpace: "pre-line", ml: 3 }}>{syllabus.basis}</Box>

          <Box sx={{ fontSize: "h5.fontSize", fontWeight: "bold", mt: 3 }}>教科書</Box>
          {syllabus.textbook === "記載なし" ? (
            <Box sx={{ fontSize: "h6.fontSize", whiteSpace: "pre-line", ml: 3 }}>{syllabus.textbook}</Box>
          ) : (
            <TableContainer>
              <Table sx={{ minWidth: 550 }} aria-label="syllabus">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ width: 10 }}></TableCell>
                    <TableCell>書名</TableCell>
                    <TableCell>著者名</TableCell>
                    <TableCell>出版社名</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {syllabus.textbook.map((textbook: any, index: number) => (
                    <TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                      <TableCell component="th" scope="row">
                        {index + 1}
                      </TableCell>
                      <TableCell sx={{ whiteSpace: "pre-line" }}>{textbook[0]}</TableCell>
                      <TableCell sx={{ whiteSpace: "pre-line" }}>{textbook[1]}</TableCell>
                      <TableCell sx={{ whiteSpace: "pre-line" }}>{textbook[2]}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          <Box sx={{ fontSize: "h5.fontSize", fontWeight: "bold", mt: 3 }}>参考書</Box>
          {syllabus.reference_book === "記載なし" ? (
            <Box sx={{ fontSize: "h6.fontSize", whiteSpace: "pre-line", ml: 3 }}>{syllabus.reference_book}</Box>
          ) : (
            <TableContainer>
              <Table sx={{ minWidth: 550 }} aria-label="syllabus">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ width: 10 }}></TableCell>
                    <TableCell>書名</TableCell>
                    <TableCell>著者名</TableCell>
                    <TableCell>出版社名</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {syllabus.reference_book.map((reference_book: any, index: number) => (
                    <TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                      <TableCell component="th" scope="row">
                        {index + 1}
                      </TableCell>
                      <TableCell sx={{ whiteSpace: "pre-line" }}>{reference_book[0]}</TableCell>
                      <TableCell sx={{ whiteSpace: "pre-line" }}>{reference_book[1]}</TableCell>
                      <TableCell sx={{ whiteSpace: "pre-line" }}>{reference_book[2]}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          <Box sx={{ fontSize: "h5.fontSize", fontWeight: "bold", mt: 3 }}>受講心得</Box>
          <Box sx={{ fontSize: "h6.fontSize", whiteSpace: "pre-line", ml: 3 }}>{syllabus.knowledge}</Box>

          <Box sx={{ fontSize: "h5.fontSize", fontWeight: "bold", mt: 3 }}>オフィスアワー</Box>
          <Box sx={{ fontSize: "h6.fontSize", whiteSpace: "pre-line", ml: 3 }}>{syllabus.office_hour}</Box>

          <Box sx={{ fontSize: "h5.fontSize", fontWeight: "bold", mt: 3 }}>実践的教育</Box>
          <Box sx={{ fontSize: "h6.fontSize", whiteSpace: "pre-line", ml: 3 }}>{syllabus.practice}</Box>

          <Box sx={{ fontSize: "h5.fontSize", fontWeight: "bold", mt: 3 }}>CSコース</Box>
          <Box sx={{ fontSize: "h6.fontSize", whiteSpace: "pre-line", ml: 3 }}>{syllabus.cs}</Box>

          <Box sx={{ fontSize: "h5.fontSize", fontWeight: "bold", mt: 3 }}>スパイラル型教育</Box>
          <Box sx={{ fontSize: "h6.fontSize", whiteSpace: "pre-line", ml: 3 }}>{syllabus.spiral}</Box>
        </Typography>
      </Box>
    </>
  );
};

export default Syllabus;
