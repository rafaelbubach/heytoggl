import * as log from 'bog';
import fs from 'fs';
import path from 'path';

const root: string = path.normalize(`${__dirname}/../../`);
const themeRootPath: string = `${root}www/themes/`;
const defaultTheme: string = 'https://github.com/chralp/heyburrito-theme'

import UserInterface from '../types/User.interface';

const time = () => {
    const start = new Date();
    const end = new Date();
    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);
    return {
        start,
        end,
    };
};

const sort = (input: UserInterface[], sortType: string = 'desc'): UserInterface[] => {
    const sorted = input.sort((a, b) => {
        if (sortType === 'desc') return b.score - a.score;
        return a.score - b.score;
    });
    return sorted;
};

const env: string = process.env.NODE_ENV || 'development';

const fixPath = (p: string): string => {
    if (!p.startsWith('/')) return `/${p}`;
    if (!p.endsWith('/')) return `${p}/`;
    return p;
};

const pathExists = (path: string) => {
    try {
        log.debug('Checking if path exists', path);
        return fs.lstatSync(path).isDirectory();
    } catch (e) {
        return false;
    }
};

const createPath = (path: string) => {
    try {
        log.debug(`Trying to create path ${path}`);
        fs.mkdirSync(path);
        const exists = pathExists(path);
        if (exists) return true;
        throw new Error('Neit');
    } catch (e) {
        log.debug(`Could not create path ${path}`);
        return false;
    }
};

const mustHave = (key: string) => {
    if (env === 'development' || 'testing') return process.env[key];
    if (!process.env[key]) throw new Error(`Missing ENV ${key}`);
    return process.env[key];
};


const getThemeName = () => {
    if (process.env.THEME_PATH) {
        const path = process.env.THEME_PATH;
        const [themeName] = path.split('/').slice(-1);
        return themeName;
    };
    const theme = process.env.THEME_URL || defaultTheme;
    const [themeName] = theme.split('/').slice(-1);
    return themeName;
};

const getThemePath = () => {
    if (process.env.THEME_PATH) {
        console.log("HEJSAN")
        const path = process.env.THEME_PATH;
        if (path.endsWith('/')) return path
        return `${path}/`
    };

    const themeName = getThemeName();
    return `${themeRootPath}${themeName}/`
};

export {
    time,
    sort,
    mustHave,
    fixPath,
    env,
    pathExists,
    createPath,
    themeRootPath,
    defaultTheme,
    root,
    getThemePath,
    getThemeName,
};
