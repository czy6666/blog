export default function isValidKey<T>(
    key: string | number | symbol,
    object: T
): key is keyof typeof object {
    return key in object
}
