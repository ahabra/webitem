import * as ObjectUtils from './ObjectUtils'


export function startsWith(st, search, isCaseSensitive) {
  if (isCaseSensitive) {
    return st.startsWith(search)
  }

  const start = st.substring(0, search.length).toLowerCase()
  return search.toLowerCase() === start
}

export function trim(s) {
  if (isEmpty(s)) return ''
  if (! ObjectUtils.isString(s)) {
    s = String(s)
  }
  return s.trim(s)
}

export function isEmpty(s) {
  return s === undefined || s === null || s === ''
}