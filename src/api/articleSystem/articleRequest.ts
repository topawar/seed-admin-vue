import {http} from "../request";
import {article} from "./type";
import {pageParam} from "../common/type";

/**
 * 获取所有文章列表
 */
export function getArticleList(pageParam: pageParam) {
    return http.post("/article/getArticleList", pageParam)
}

/**
 * 通过文章id删除文章
 * @param article_id
 */
export function deleteArticleById(article_id: number) {
    return http.post("/article/deleteArticleById", {article_id: article_id});
}