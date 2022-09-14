interface Request {
    query: {
        numbering: string
    }
}

export default (req: Request, res: any) => {
    res.status(200).json({ name: `John Doe ${req.query.numbering}` })
}
