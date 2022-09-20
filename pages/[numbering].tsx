import { Button, Box, Typography } from "@mui/material";

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
            <Box sx={{ width: "100%", maxWidth: "100%" }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        window.close();
                    }}
                >
                    閉じる
                </Button>

                <Typography variant="h6">
                    {syllabus.lecture_title}
                </Typography>
                <Typography variant="h6">
                    {syllabus.lecture_title_en}
                </Typography>
                <Typography variant="h6">
                    {syllabus.year}
                </Typography>
                <Typography variant="h6">
                    {syllabus.credit}
                </Typography>
                <Typography variant="h6">
                    {syllabus.term}
                </Typography>
                <Typography variant="h6">
                    {syllabus.person}
                </Typography>
                <Typography variant="h6">
                    {syllabus.numbering}
                </Typography>
                <Typography variant="h6">
                    {syllabus.department}
                </Typography>
                <Typography variant="h6">
                    {syllabus.url}
                </Typography>
                <Typography variant="h6">
                    {syllabus.dow}
                </Typography>
                <Typography variant="h6">
                    {syllabus.period}
                </Typography>
                <Typography variant="h6">
                    {syllabus.aim}
                </Typography>
                <Typography variant="h6">
                    {syllabus.cs}
                </Typography>
                <Typography variant="h6">
                    {syllabus.spiral}
                </Typography>
                <Typography variant="h6">
                    {syllabus.target}
                </Typography>
                <Typography variant="h6">
                    {syllabus.method}
                </Typography>
                <Typography variant="h6">
                    {syllabus.basis}
                </Typography>
                <Typography variant="h6">
                    {syllabus.textbook}
                </Typography>
                <Typography variant="h6">
                    {syllabus.reference_book}
                </Typography>
                <Typography variant="h6">
                    {syllabus.knowledge}
                </Typography>
                <Typography variant="h6">
                    {syllabus.office_hour}
                </Typography>
                <Typography variant="h6">
                    {syllabus.practice}
                </Typography>
            </Box>
        </>
    )
}

export default Syllabus
