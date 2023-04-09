import {http} from "../request";
import {UpdateUser} from "./type";
import {pageParam} from "../common/type";

/**
 * 获取用户列表
 */
export function getUserList(pageParam: pageParam) {
    return http.post("/user/getUserList", pageParam)
}

export function deleteUserById(id: string) {
    return http.postAny("/user/deleteUserById", {id:id})
}

export function updateUserById(updateUser:UpdateUser){
    return http.post("/user/updateUserById",updateUser)
}