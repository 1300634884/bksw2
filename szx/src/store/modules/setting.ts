
import { defineStore } from "pinia";
let useLayOutSettingStore = defineStore("SettingStore", {
    state: () => {
        return {
            flod: true,
            refsh: true
        }

    },
})
export default useLayOutSettingStore