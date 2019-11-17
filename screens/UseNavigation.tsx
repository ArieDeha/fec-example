import {NavigationContext, NavigationRoute, NavigationScreenProp} from 'react-navigation'
import {useContext} from 'react'

export function useNavigation<Params>() {
    return useContext(NavigationContext) as NavigationScreenProp<
      NavigationRoute,
      Params
    >;
}
