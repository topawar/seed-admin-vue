import {defineStore} from "pinia";
import {onBeforeMount} from "vue";

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
            this.userList = result.pageList
            this.total = result.total
        },
    }
})
