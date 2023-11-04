import AsyncStorage from "@react-native-async-storage/async-storage";
import { User, Users } from "./types/User.types";
import { UpdateType } from "./types/UpdateNote.types";

export const EMPTY_NOTE = "";

const updateNote =
  (updateType: UpdateType) =>
  async (user: User, note: string): Promise<boolean> => {
    try {
      const userData = await AsyncStorage.getItem("users");
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
        await AsyncStorage.setItem("users", JSON.stringify(updatedUsers));
        return true;
      } else {
        throw new Error("User data not found");
      }
    } catch (error) {
      console.error(
        `Error ${updateType === "save" ? "saving" : "deleting"} user note:`,
        error
      );
      return false;
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
