import AsyncStorage from "@react-native-async-storage/async-storage";
import { User, Users } from "./types/User.types";
import { UpdateType } from "./types/UpdateNote.types";

export const updateNote = async (
    user: User, 
    note: string, 
    updateType: UpdateType) => {
    try {
        const userData = await AsyncStorage.getItem('users');
        if (userData) {
            const users: Users = JSON.parse(userData);
            const updatedUsers = users.map((u: User) => {
                if (u.username == user.username) {
                    if (updateType === 'save') {
                        u.note = note;
                    } else if (updateType === 'delete') {
                        u.note = '';
                    }
                }
                return u;
            });
            await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));
            return true;
        } else {
            throw new Error('User data not found');
        }
    } catch (error) {
        console.error(`Error ${updateType === 'save' ? 
            'saving' : 'deleting'} user note:`, error);
        return false;
    }
};


const validator = (...conditions: any) => (validationTarget: any) => {
    const validationResults = conditions.map(
        (cond: any) => cond(validationTarget));
    const failures = validationResults.filter(
        (res: any) => res.result != true);

    //failures.forEach(console.log)
    const isSafe: boolean = !failures.some(
        (arg: boolean) => arg === false);
    return isSafe;
}


const isSafeSQL = (input: string[]) => {
    const sqlKeywords = ['SELECT', 'INSERT', 'UPDATE', 'DELETE', 
                         'DROP', 'UNION', '1=1', 'OR', 'ALTER'];
    const inputUppercased = input.map(arg => arg.toUpperCase());
    return !sqlKeywords.some((keyword) => inputUppercased.includes(keyword));
}


const doesExist = (input: string[]) => {
    const result = !input.some(
        (arg) => !arg);
    return result;
};


const isLongEnough = (input: string[]) => {
    const result = !input.some(
        (arg) => arg.length <= 6);
    return result;
};


export const isRegisterSafe = validator(isSafeSQL, doesExist, isLongEnough);