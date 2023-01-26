import Head from "next/head";
import { useEffect, useState } from "react";
import { remark } from "remark";
import html from "remark-html";

const getData = async () => {
  const url = "https://raw.githubusercontent.com/oit-tools/syllabus/master/README.md";
  const res = await fetch(url);
  const text = await res.text();
  const result = await remark().use(html).process(text);
  const content = result.toString();

  return content;
};

const About = () => {
  const [data, setData] = useState("");

  useEffect(() => {
    async function fetchData() {
      const content = await getData();
      setData(content);
    }
    fetchData();
  }, []);

  return (
    <>
      <Head>
        <title>About | OITシラバスアプリ</title>
      </Head>

      <div dangerouslySetInnerHTML={{ __html: data }} />
    </>
  );
};

export default About;
