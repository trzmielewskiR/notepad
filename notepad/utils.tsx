import AsyncStorage from "@react-native-async-storage/async-storage";
import { User, Users } from "./types/User.types";
import { UpdateType } from "./types/UpdateNote.types";

export const EMPTY_NOTE = "";

export const safeRead =  (key: string) =>async ()=> {
  try {
    const data = await AsyncStorage.getItem(key);
    return data;
  } catch (error) {
    console.error('Error retrieving data from storage: ', error);
    return undefined;
  }
};

export const safeReadUsers = safeRead("users")

export const safeWrite = (key: string) => async (value: any) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
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
