export let basicResponse = {
    body: {
        illustTitile: '',
        createDate: '2000-12-31T15:00:00+00:00"',
        illustType: 0,
        width: 1080,
        height: 1080,
        likeCount: 0,
        bookmarkCount: 0,
        commentCount: 0,
        pageCount: 1,
        viewCount: 0,
        urls: {
            regular: '',
        },
        tags: {
            tags: [
                {
                    tag: "",
                    locked: false,
                    deletable: false,
                    romaji: "",
                    translation: {
                        en: "",
                    },
                },
            ],
        },
    },
}
export let commentResponse = {
    error: false,
    message: "",
    body: {
        comments: [
            {
                userId: 0,
                userName: "",
                img: "",
                id: "",
                comment: "no comment",
                stampId: null,
                stampLink: null,
                commentDate: "",
                commentRootId: null,
                commentParentId: null,
                commentUserId: "",
                replyToUserId: null,
                replyToUserName: null,
                editable: false,
                hasReplies: false,
            }
        ],
    },
}
export let ugoiraResponse = {
    error: false,
    message: "",
    body: {
        src: "",
        originalSrc: "",
        mime_type: "",
        frames: [
            {
                file: "000000.jpg",
                delay: 100
            }
        ]
    },
}
export let commentElement = {
    userId: 0,
    userName: "",
    img: "",
    id: "",
    comment: "no comment",
    stampId: null,
    stampLink: null,
    commentDate: "",
    commentRootId: null,
    commentParentId: null,
    commentUserId: "",
    replyToUserId: null,
    replyToUserName: null,
    editable: false,
    hasReplies: false,
}

export let emoji = {
    "(normal2)": 201,
    "(shame2)": 202,
    "(love2)": 203,
    "(interesting2)": 204,
    "(blush2)": 205,
    "(fire2)": 206,
    "(angry2)": 207,
    "(shine2)": 208,
    "(panic2)": 209,
    "(normal3)": 301,
    "(satisfaction3)": 302,
    "(surprise3)": 303,
    "(smile3)": 304,
    "(shock3)": 305,
    "(gaze3)": 306,
    "(wink3)": 307,
    "(happy3)": 308,
    "(excited3)": 309,
    "(love3)": 310,
    "(normal4)": 401,
    "(surprise4)": 402,
    "(serious4)": 403,
    "(love4)": 404,
    "(shine4)": 405,
    "(sweat4)": 406,
    "(shame4)": 407,
    "(sleep4)": 408,
    "(normal)": 101,
    "(surprise)": 102,
    "(serious)": 103,
    "(heaven)": 104,
    "(happy)": 105,
    "(excited)": 106,
    "(sing)": 107,
    "(cry)": 108,
    "(heart)": 501,
    "(teardrop)": 502,
    "(star)": 503,
}
