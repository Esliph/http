import { isObject, isNull, isDate } from "@esliph/common/util"

export function deepMerge(target: any, ...sources: any[]) {
    for (const source of sources) {
        for (const key in source) {
            if (source.hasOwnProperty(key)) {
                if (isObject(source[key]) && isNull(source[key])) {
                    if (!target[key] || isObject(target[key])) {
                        target[key] = Array.isArray(source[key]) ? [] : {}
                    }
                    if (isDate(source[key])) {
                        target[key] = new Date(source[key])
                    } else {
                        deepMerge(target[key], source[key])
                    }
                } else {
                    target[key] = source[key]
                }
            }
        }
    }
    return target
}
