
export const defaultNamespace = 'd'
const statePrefix = 'is-'

const _bem = (namespace: string, block: string, blockSuffix: string, element: string, modifier: string) => {
  let cls = `${namespace}-${block}`

  if (blockSuffix) {
    cls += `-${blockSuffix}`
  }

  if (element) {
    cls += `__${element}`
  }

  if (modifier) {
    cls += `--${modifier}`
  }

  return cls
}

export const useNameSpace = (block: string) => {
  const b = (blockSuffix = '') =>
    _bem(defaultNamespace, block, blockSuffix, '', '')
  const e = (element?: string) =>
    element ? _bem(defaultNamespace, block, '', element, '') : ''
  const m = (modifier?: string) =>
    modifier ? _bem(defaultNamespace, block, '', '', modifier) : ''

  const be = (blockSuffix?: string, element?: string) =>
    blockSuffix && element ? _bem(defaultNamespace, block, blockSuffix, element, '') : ''
  const bm = (blockSuffix?: string, modifier?: string) =>
    blockSuffix && modifier ? _bem(defaultNamespace, block, blockSuffix, '', modifier) : ''
  const em = (element?: string, modifier?: string) =>
    element && modifier ? _bem(defaultNamespace, block, '', element, modifier) : ''

  const bem = (blockSuffix?: string, element?: string, modifier?: string) =>
    blockSuffix && element && modifier ? _bem(defaultNamespace, block, blockSuffix, element, modifier) : ''

  const is: {
    (name: string, state: boolean | undefined): string
    (name: string): string
  } = (name: string, ...args: [boolean | undefined] | []) => {
    const state = args.length >= 1 ? args[0]! : true
    return name && state ? `${statePrefix}${name}` : ''
  }

  return {
    b,
    e,
    m,
    be,
    bm,
    em,
    bem,
    is
  }
}
