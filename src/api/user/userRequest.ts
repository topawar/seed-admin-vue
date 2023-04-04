import {http} from "../request";
import {User} from "./type";
import {pageParam} from "../common/type";

/**
 * 获取用户列表
 */
export function getUserList(pageParam: pageParam){
    return http.post("/user/getUserList",pageParam)
}