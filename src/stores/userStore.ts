import {defineStore} from "pinia";
import {User} from "../api/user/type";


export const userStore = defineStore("userStore", {
    state: () => {
        return {
            user: {} as User
        }
    },
    actions: {
        updateUser(user: User) {
            this.user = user;
        }
    },
    persist: {
        enabled: true,
        strategies: [{
            key: "userStore",
            storage: localStorage
        }]
    }
})