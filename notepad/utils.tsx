export const isSafeSQL = (input: string) => {
    const sqlKeywords = ['SELECT', 'INSERT', 'UPDATE', 'DELETE', 'DROP', 'UNION', '1=1', 'OR', 'ALTER'];
    const inputUppercased = input.toUpperCase();
    return !sqlKeywords.some((keyword) => inputUppercased.includes(keyword));
}