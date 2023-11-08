import {User} from "./User.types";
import type { StackScreenProps } from "@react-navigation/stack";
import type { NavigatorScreenParams } from "@react-navigation/native";
    
export type RootStackParamList = {
    Main: undefined;
    Register: undefined;
    Login: undefined;
    UserProfile: {user: User};
}

export type MainProps = StackScreenProps<RootStackParamList, 'Main'>;

export type RegisterProps = StackScreenProps<RootStackParamList, 'Register'>;

export type LoginProps = StackScreenProps<RootStackParamList, 'Login'>;

export type UserProfileProps = StackScreenProps<RootStackParamList, 'UserProfile'>;

// export type UserProfileScreenNavigationProp = UserProfileProps['navigation'];

// export type UserProfileScreenRouteProp = UserProfileProps['route'];

// export type UserProfileParamList = {
//     UserProfile: NavigatorScreenParams<RootStackParamList>;
//     Login: { username: User["username"], password: User["password"]}
// }