import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export enum RxJSLoggingLevel {
    TRACE,
    DEBUG,
    INFO,
    ERROR
}

let rxjsLoggingLevel = RxJSLoggingLevel.INFO;

export function setRxJSLoggingLevel(level: RxJSLoggingLevel) {
    rxjsLoggingLevel = level;
}

export const debug = (level: number, message: string) =>
    (source: Observable<any>) => source.pipe(
        tap(val => {
            if (level >= rxjsLoggingLevel) {
                console.log(message + ':' , val);
            }
        })
    )
