export default (title, callouts) => {
    let calloutObj = {};
    for (let i = 0; i < callouts.length; i++) {
        calloutObj[`fb8c9233-af7f-4a35-9738-3e02b34d328${i}`] = callouts[i];
    }
    console.log(calloutObj)
    return {
        "blockId": "bbca5daf-7aa3-407e-9653-c554a359fef5",
        "blockSubtree": {
            "block": {
                "bbca5daf-7aa3-407e-9653-c554a359fef5": {
                    "id": "bbca5daf-7aa3-407e-9653-c554a359fef5",
                    "type": "toggle",
                    "created_time": 1615494221726,
                    "last_edited_time": 1615494300000,
                    "version": 33,
                    "parent_id": "34ac3d31-23e2-40c2-aafe-1a87a915e32f",
                    "parent_table": "block",
                    "alive": true,
                    "created_by_id": "8f88ebea-ac9d-41b9-a967-0c27f22bad54",
                    "created_by_table": "notion_user",
                    "last_edited_by_id": "8f88ebea-ac9d-41b9-a967-0c27f22bad54",
                    "last_edited_by_table": "notion_user",
                    "properties": {
                        "title": [
                            [
                                title
                            ]
                        ]
                    },
                    "content": Object.keys(calloutObj)
                },
                ...calloutObj
            }
        }
    }
}