export interface article {
    article_id: string,
    uid: string,
    title: string,
    catalogue: string,
    content: string,
    article_kind: string,
    pointnum: number,
    favoritenum: number,
    imageurl: string,
}

export interface pageParam{
    pageNum:number,
    pageSize:number,
}