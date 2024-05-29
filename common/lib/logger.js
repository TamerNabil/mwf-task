import { configure, getLogger } from 'log4js';
import path from 'path';


configure({
    appenders: {
        console: {
            type: 'stdout',
            layout: {
                type: 'pattern',
                pattern: '%[%d [%p] %]- %m%n'
            }
        },
        dateFile: {
            type: 'dateFile',
            filename: path.join(__dirname, 'app.log'),
            maxLogSize: 10485760,
            layout: { type: 'basic' },
            compress: true,
            daysToKeep: 7,
            keepFileExt: true
        }
    },
    categories: {
        default: { appenders: ['console', 'dateFile'], level: 'info' }
    }
});

export const logger = getLogger();
