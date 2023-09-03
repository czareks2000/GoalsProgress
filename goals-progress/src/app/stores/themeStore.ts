import { makeAutoObservable, reaction } from "mobx";

export default class ThemeStore {
    light = {
        '--background-dark': '#cacaca',
        '--background-light': '#0d0d0d',
        '--background-disabled': '#8d8d8d',
        '--primary': '#0d0d0d', 
        '--highlight': '#51361a',
        '--accent': '#0d0d0d',
        '--primary-font-color': '#000000',
        '--secondary-font-color': 'white',
        '--error': 'grey'
    }
    dark = {
        '--background-dark': '#161748',
        '--background-light': '#39a0ca',
        '--background-disabled': '#175168',
        '--primary': '#478559', 
        '--highlight': '#f95d9b',
        '--accent': '#e29300',
        '--primary-font-color': 'white',
        '--secondary-font-color': '#161748',
        '--error': 'red'
    }

    theme: string = localStorage.getItem('theme') || 'dark';

    isLight = false;

    constructor() {
        makeAutoObservable(this);

        reaction(
            () => this.theme, 
            theme => {
                if (theme) {
                    localStorage.setItem('theme', theme);
                }
            }
        )
    }

    private setCSSVariables = (variables: { [key: string]: string }) => {
        const root = document.documentElement;
        
        for (const variable in variables) {
            root.style.setProperty(variable, variables[variable]);
        }
    }
    
    switchTheme = (name: string) => {
        if (name === 'dark')
        {   
            this.setCSSVariables(this.dark);
            this.theme = 'dark';
            this.isLight = false;
        }
        else if (name === 'light')
        {   
            this.setCSSVariables(this.light);
            this.theme = 'light';
            this.isLight = true;
        }
    }

    toggleTheme = () => {
        if (this.isLight)
            this.switchTheme('dark');
        else
            this.switchTheme('light');
    }
}