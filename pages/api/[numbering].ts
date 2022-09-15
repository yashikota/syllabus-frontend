interface Request {
    query: {
        numbering: string
    }
}

export default (req: Request, res: any) => {
    let url = "https://raw.githubusercontent.com/oit-tools/syllabus-scraping/master/data/2022.json"
    fetch(url)
        .then(res => res.json())
        .then(json => {
            let data = json[req.query.numbering]
            if (data == undefined) {
                res.status(404).json({ message: "Not Found" })
            }
            res.status(200).json(data)
        })
}
