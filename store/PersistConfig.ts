import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import AsyncStorage from '@react-native-community/async-storage';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    stateReconciler: autoMergeLevel2, // see "Merge Process" section for details.
};

export default persistConfig;