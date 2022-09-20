import { Button } from "@mui/material";
import Link from "next/link";

const About = () => {
    return (
        <>
            <h1>About</h1>
            <p>This is the about page</p>

            <Link href="/" passHref>
                <Button
                    variant="contained">
                    戻る
                </Button>
            </Link>
        </>
    );
}

export default About;
