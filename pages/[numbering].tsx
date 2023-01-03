import { Button, Box, Typography } from "@mui/material";
import Head from "next/head";
import Link from "next/link";

export const getStaticProps = async (context: any) => {
    const numbering = context.params.numbering
    console.log(numbering)
    const res = await fetch("https://raw.githubusercontent.com/oit-tools/syllabus-scraping/master/data/2022.json")
    const data = await res.json()
    const syllabus = data[numbering]

    return {
        props: { syllabus }
    }
}

export const getStaticPaths = async () => {
    const res = await fetch("https://raw.githubusercontent.com/oit-tools/syllabus-scraping/master/data/2022table.json")
    const syllabuses = await res.json()
    const paths = syllabuses.map((syllabus: any) => ({
        params: { numbering: syllabus.numbering }
    }))

    return {
        paths,
        fallback: false
    }
}

const Syllabus = ({ syllabus }: any) => {
    return (
        <>
            <Head>
                <title>{syllabus.lecture_title}</title>
                <meta
                    name="description"
                    content={`${syllabus.department}科 ${syllabus.year}年次 ${syllabus.term} ${syllabus.person} ${syllabus.numbering}`}
                />
                <meta property="og:title" content={syllabus.lecture_title} />
                <meta property="og:url" content={syllabus.link} />
                <meta
                    property="og:description"
                    content={`${syllabus.department}科 ${syllabus.year}年次 ${syllabus.term} ${syllabus.person} ${syllabus.numbering}`}
                />
            </Head>

            <title>{syllabus.lecture_title}</title>
            <Box sx={{ width: "100%", maxWidth: "100%" }}>
                <Link href="/">
                    <Button variant="contained" color="primary">
                        戻る
                    </Button>
                </Link>
                <Typography variant="h6">
                    講義名: {syllabus.lecture_title}
                </Typography>
                <Typography variant="h6">
                    講義名(英語): {syllabus.lecture_title_en}
                </Typography>
                <Typography variant="h6">
                    年次: {syllabus.year}
                </Typography>
                <Typography variant="h6">
                    単位: {syllabus.credit}
                </Typography>
                <Typography variant="h6">
                    期間: {syllabus.term}
                </Typography>
                <Typography variant="h6">
                    担当者: {syllabus.person}
                </Typography>
                <Typography variant="h6">
                    講義コード: {syllabus.numbering}
                </Typography>
                <Typography variant="h6">
                    学科: {syllabus.department}
                </Typography>
                <Typography variant="h6">
                    URL: {syllabus.url}
                </Typography>
                <Typography variant="h6">
                    曜日: {syllabus.dow}
                </Typography>
                <Typography variant="h6">
                    時限: {syllabus.period}
                </Typography>
                <Typography variant="h6">
                    ねらい: {syllabus.aim}
                </Typography>
                <Typography variant="h6">
                    CSコース: {syllabus.cs}
                </Typography>
                <Typography variant="h6">
                    スパイラル型教育: {syllabus.spiral}
                </Typography>
                <Typography variant="h6">
                    テーマ: {syllabus.themes}
                </Typography>
                <Typography variant="h6">
                    内容: {syllabus.contents}
                </Typography>
                <Typography variant="h6">
                    予習/復習: {syllabus.preparations}
                </Typography>
                <Typography variant="h6">
                    目標: {syllabus.target}
                </Typography>
                <Typography variant="h6">
                    評価方法: {syllabus.method}
                </Typography>
                <Typography variant="h6">
                    評価基準: {syllabus.basis}
                </Typography>
                <Typography variant="h6">
                    教科書: {syllabus.textbook}
                </Typography>
                <Typography variant="h6">
                    参考書: {syllabus.reference_book}
                </Typography>
                <Typography variant="h6">
                    受講心得: {syllabus.knowledge}
                </Typography>
                <Typography variant="h6">
                    オフィスアワー: {syllabus.office_hour}
                </Typography>
                <Typography variant="h6">
                    実践的教育: {syllabus.practice}
                </Typography>
            </Box>
        </>
    )
}

export default Syllabus
