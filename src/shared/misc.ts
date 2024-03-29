import { wLogger } from './logger';

export const pErr = (err: Error) => {
    if (err) {
        wLogger.error(err);
    }
};

export const getRandomInt = () => {
    return Math.floor(Math.random() * 1_000_000_000_000);
};
