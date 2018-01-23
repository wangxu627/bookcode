function getArticles() {
    return [
        {
            "title":"11111111111111",
            "content":"vvvvvvvvvv1111111111",
            "singleImg":true,
            "imgs":[1,2,3],
        },
        {
            "title":"22222222222222",
            "content":"vvvvvvvvvv2222222222",
        },
        {
            "title":"33333333333333",
            "content":"vvvvvvvvvv3333333333",
            "imgs":[1],
        },
        {
            "title":"44444444444444",
            "content":"vvvvvvvvvv444444444",
            "imgs":[1,2,3,4,5,6,7,8,9],
        },
        {
            "title":"55555555555555",
            "content":"vvvvvvvvvv5555555555",
            "singleImg":true,
            "imgs":[1,2],
        }
    ]
}

module.exports = {
    getArticles:getArticles
}