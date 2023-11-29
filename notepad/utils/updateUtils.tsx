import { User, Users } from "../types/User.types";
import { UpdateType } from "../types/UpdateNote.types";
import * as SecureStore from "expo-secure-store";
//import JailMonkey from 'jail-monkey';

export const EMPTY_NOTE = "";

export const safeRead =  (key: string) =>async ()=> {
  try {
    const data = await SecureStore.getItemAsync(key, 
      {keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY});
    return data;
  } catch (error) {
    console.error('Error retrieving data from storage: ', error);
    return undefined;
  }
};

export const safeReadUsers = safeRead("users")

export const safeWrite = (key: string) => async (value: any) => {
  try {
    await SecureStore.setItemAsync(key,
      JSON.stringify(value), 
      {keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY});
  } catch (error) {
    console.error('Error saving data to storage: ', error);
  }
};

export const safeWriteUsers = safeWrite("users") as (value:User[]) => Promise<void>;

const updateNote =
  (updateType: UpdateType) =>
  async (user: User, note: string): Promise<boolean> => {
    const userData = await safeReadUsers();
    if (userData) {
      const users: Users = JSON.parse(userData);
      const updatedUsers = users.map((u: User) => {
        if (u.username == user.username) {
          if (updateType === "save") {
            u.note = note;
          } else if (updateType === "delete") {
            u.note = "";
          }
        }
        return u;
      });
      safeWriteUsers(updatedUsers);
      return true;
    } else {
      throw new Error("User data not found");
    }
  };

export const saveNote = updateNote("save");
export const deleteNote = updateNote("delete");

const validator =
  (...conditions: ((input: string) => boolean)[]) =>
  (...args: string[]) => {
    //results instead of failures
    const validationResults: boolean[] = args.map((arg) =>
      conditions.every((cond) => cond(arg))
    );
    //validationResults.forEach(console.log)

    const isSafe = validationResults.every((result) => result === true);

    return isSafe;
  };

const isSafeSQL = (input: string) => {
  const sqlKeywords = [
    "SELECT",
    "INSERT",
    "UPDATE",
    "DELETE",
    "DROP",
    "UNION",
    "1=1",
    "OR",
    "ALTER",
  ];
  const inputUppercased = input.toUpperCase();
  return !sqlKeywords.some((keyword) => inputUppercased.includes(keyword));
};

const doesExist = (input: string) => {
  const result = !!input;
  return result;
};

const isLongEnough = (input: string) => {
  const result = input.length > 6;
  return result;
};

export const isNotTheSame = (first: string, second: string) => {
  const result = first !== second;
  return result;
};

export const isRegisterSafe = validator(isSafeSQL, doesExist, isLongEnough);

export const isNewPasswordSafe = validator(doesExist, isLongEnough, isSafeSQL);

// const validateJailMonkey = (...functions: (() => boolean)[]): boolean => {
//   const results: boolean[] = functions.map(functionCall => functionCall());
//   //device is safe if every function gives false
//   const isSafe = results.every((result) => result === true)
//   return isSafe;
// }

// export const isSmartphoneSafe = validateJailMonkey(
//   () => JailMonkey.canMockLocation(),
//   () => JailMonkey.isJailBroken(),
//   () => JailMonkey.trustFall(),
// )