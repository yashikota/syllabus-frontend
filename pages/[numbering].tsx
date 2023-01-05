import fs from "fs/promises";
import { Box, Typography, Button } from "@mui/material";
import Head from "next/head";

const cache: any = {};

export const getStaticProps = async (context: any) => {
  const numbering = context.params.numbering;
  console.log(numbering);

  const url = "https://raw.githubusercontent.com/oit-tools/syllabus-scraping/master/data/2022.json";
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
  const url =
    "https://raw.githubusercontent.com/oit-tools/syllabus-scraping/master/data/2022table.json";
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

const Syllabus = ({ syllabus }: any) => {
  return (
    <>
      <Head>
        <title>{syllabus.lecture_title} | OITシラバスアプリ</title>
        <meta property="og:title" content={`${syllabus.lecture_title} | OITシラバスアプリ`} key="title" />
        <meta
          property="og:description"
          content={`${syllabus.department}科 ${syllabus.year}年次 ${syllabus.term} ${syllabus.person}`}
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

        <Typography variant="h6">講義名: {syllabus.lecture_title}</Typography>
        <Typography variant="h6">講義名(英語): {syllabus.lecture_title_en}</Typography>
        <Typography variant="h6">年次: {syllabus.year}</Typography>
        <Typography variant="h6">単位: {syllabus.credit}</Typography>
        <Typography variant="h6">期間: {syllabus.term}</Typography>
        <Typography variant="h6">担当者: {syllabus.person}</Typography>
        <Typography variant="h6">講義コード: {syllabus.numbering}</Typography>
        <Typography variant="h6">学科: {syllabus.department}</Typography>
        <Typography variant="h6">曜日: {syllabus.dow}</Typography>
        <Typography variant="h6">時限: {syllabus.period}</Typography>
        <Typography variant="h6">ねらい: {syllabus.aim}</Typography>
        <Typography variant="h6">CSコース: {syllabus.cs}</Typography>
        <Typography variant="h6">スパイラル型教育: {syllabus.spiral}</Typography>
        <Typography variant="h6">テーマ: {syllabus.themes}</Typography>
        <Typography variant="h6">内容: {syllabus.contents}</Typography>
        <Typography variant="h6">予習/復習: {syllabus.preparations}</Typography>
        <Typography variant="h6">目標: {syllabus.target}</Typography>
        <Typography variant="h6">評価方法: {syllabus.method}</Typography>
        <Typography variant="h6">評価基準: {syllabus.basis}</Typography>
        <Typography variant="h6">教科書: {syllabus.textbook}</Typography>
        <Typography variant="h6">参考書: {syllabus.reference_book}</Typography>
        <Typography variant="h6">受講心得: {syllabus.knowledge}</Typography>
        <Typography variant="h6">オフィスアワー: {syllabus.office_hour}</Typography>
        <Typography variant="h6">実践的教育: {syllabus.practice}</Typography>
      </Box>
    </>
  );
};

export default Syllabus;
