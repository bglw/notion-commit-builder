export default (bucket, num) => {
    const lines = [];
    for (let commit of bucket.commits) {
        lines.push([
            commit[0].substr(0,7),
            [
                [
                    "a",
                    `https://us-west-1.console.aws.amazon.com/codesuite/codecommit/repositories/plugins/commit/${commit[0]}`
                ]
            ]
        ]);
        lines.push([": "])
        lines.push([
            commit[4],
            [
                [
                    "i"
                ]
            ]
        ]);
        lines.push(["\n"]);
    }

    return {
        "id": `fb8c9233-af7f-4a35-9738-3e02b34d328${num}`,
        "version": 19,
        "type": "callout",
        "properties": {
            "title": [
                [
                    bucket.repo.replace(/\/$/, ''),
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    "\n"
                ],
                ...lines
            ]
        },
        "format": {
            "page_icon": "https://s3-us-west-2.amazonaws.com/secure.notion-static.com/5695ee94-882e-4e30-822e-92dc8db7b038/1375870-200.png",
            "block_color": "gray_background"
        },
        "created_time": 1615494215400,
        "last_edited_time": 1615494600000,
        "file_ids": [
            "5695ee94-882e-4e30-822e-92dc8db7b038"
        ],
        "created_by_table": "notion_user",
        "created_by_id": "8f88ebea-ac9d-41b9-a967-0c27f22bad54",
        "last_edited_by_table": "notion_user",
        "last_edited_by_id": "8f88ebea-ac9d-41b9-a967-0c27f22bad54",
        "shard_id": 317249,
        "space_id": "74c5cf3b-7179-4e0f-bd84-34a50a84d741",
        "copied_from": "569565b7-4729-40d6-a14e-2a1274cca104",
        "parent_id": "65e3b305-5f54-49db-8d62-4661cf9a7041",
        "parent_table": "block",
        "alive": true
    }
}