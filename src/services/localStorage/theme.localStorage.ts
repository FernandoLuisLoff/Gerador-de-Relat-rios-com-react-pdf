import type { ThemeEnum } from "../../types";

const KEY = 'theme';

export class ThemeLocalStorage {
    public set(themeEnum: ThemeEnum) {
        localStorage.setItem( KEY, themeEnum );
    }

    public get(): ThemeEnum {
        return localStorage.getItem( KEY ) as ThemeEnum;
    }
    
    public remove() {
        localStorage.removeItem( KEY );
    }
}