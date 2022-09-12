import { defineStore } from "pinia";

export const ThemeToggle = defineStore("theme", {
    state:()=>({
        darkMode:false,
    }),
    actions:{
        toggleTheme(){
            console.log('toggle')
            this.darkMode = !this.darkMode
            localStorage.setItem('theme-settings', JSON.stringify(this.darkMode));
        },
        initTheme(){
            this.darkMode = JSON.parse(localStorage.getItem('theme-settings'))|| false;
        }
    }
})