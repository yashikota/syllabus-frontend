import { Button } from "@mui/material"

const Post = () => {
    return (
        <>
            <Button
                variant="contained"
                color="primary"
                onClick={() => {
                    window.close();
                }}
            >
                閉じる
            </Button>
        </>
    )
}

export default Post
