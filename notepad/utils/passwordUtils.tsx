import * as bcrypt from "bcryptjs";

//i need 2 fuctions, one to create hash and then stores the value of hash
//second is to compare given hashed password with the one stored in secure storage
export const saltRounds = 10;

export const generateRandomSalt = (saltRounds: number) => {
    const result = bcrypt.genSaltSync(saltRounds);
    return result;
}

export const hashData = (data: string, salt: string) => {
    const hashedData = bcrypt.hashSync(data, salt);
    return hashedData;
} 

export const compare = (newData: string, oldHash: string) => {
    console.log(newData)
    console.log(oldHash)
    const comparisionResult = bcrypt.compareSync(newData, oldHash);
    const gettingSalt = bcrypt.getSalt(oldHash);
    console.log(gettingSalt);
    console.log(comparisionResult);
    //returns true if data are the same
    return comparisionResult;
}