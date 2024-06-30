import { IRISPayCommonProps, IrisPayComponentProps, IrisWithRefProp } from './IRISPayComponent'
/**
 * Transform passed passed props to string.
 * @param data Passed props to transform
 * @returns
 */
export function StringifyIrisProps(data: IRISPayCommonProps) {
  return Object.entries(data).reduce<IrisWithRefProp>((acc, curr) => {
    const key = curr[0] as keyof IrisPayComponentProps
    acc[key] = typeof curr[1] === 'object' ? JSON.stringify(curr[1]) : curr[1].toString()
    return acc
  }, {} as IrisWithRefProp)
}
