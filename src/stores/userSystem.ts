import {defineStore} from "pinia";

export const userSystemStore = defineStore("userSystemStore", {
    state: () => {
        return {
            userList: [],
            total: 0,
            current_page: 1
        }
    },
    getters: {
        getUserList: (state) => state.userList
    },
    actions: {
        setUserList(result: any) {
            this.userList = result.records
            this.total = result.total
        },
    }
})
