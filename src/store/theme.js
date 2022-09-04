import { defineStore } from "pinia";

export const ThemeToggle = defineStore("theme", {
    state:()=>({
        darkMode:false,
    }),
    actions:{
        toggleTheme(){
            console.log('toggle')
            this.darkMode = !this.darkMode
            console.log(this.darkMode)
        }
    }
})