import {http} from "../request";
import {User} from "./type";

/**
 * 获取用户列表
 */
export function getUserList(){
    return http.post<User>("/user/getUserList")
}