import { Button } from "@mui/material"
import Link from "next/link"

const Post = () => {
    return (
        <>
            <Link href="/" passHref>
                <Button
                    variant="contained"
                    color="primary"
                >
                    戻る
                </Button>
            </Link>
        </>
    )
}

export default Post
