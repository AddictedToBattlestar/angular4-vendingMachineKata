export class CommonHelpers {
    public static isInstanceOfType<T>(object: any, type: T): object is T {
        return 'member' in object;
    }
}
