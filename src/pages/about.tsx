import { Box, styled } from "@mui/material";
import Markdown from "markdown-to-jsx";
import Head from "next/head";
import { useEffect, useState } from "react";

const CustomBox = styled(Box)({
  width: "100%",
  lineHeight: 2,
  fontSize: "1.2rem",
  a: {
    color: "#20B2AA",
  },
});

const About = () => {
  const [mdText, setMdText] = useState("");
  useEffect(() => {
    fetch("https://raw.githubusercontent.com/oit-tools/syllabus-frontend/master/public/usage.md")
      .then((response) => {
        return response.text();
      })
      .then((text) => {
        setMdText(text);
      });
  });
  return (
    <>
      <Head>
        <title>About | OITシラバスアプリ</title>
      </Head>

      <CustomBox>
        <Markdown>{mdText}</Markdown>
      </CustomBox>
    </>
  );
};

export default About;
