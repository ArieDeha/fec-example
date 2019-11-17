import { NavigationParams, NavigationScreenProp, NavigationState } from "react-navigation";

export type Navigation = NavigationScreenProp<NavigationState, NavigationParams>;

export type NavigationCustomParams<T> = NavigationScreenProp<NavigationState, T>;

export interface CustomNavigationProps<T> {
    navigation: NavigationCustomParams<T>;
}