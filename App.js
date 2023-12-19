import {SafeAreaView, Text} from 'react-native';
import Constants from "expo-constants";

const expoConfig = Constants.expoConfig;
export default function App() {
  return (
    <SafeAreaView>
      <Text>
        {expoConfig ? JSON.stringify(expoConfig, null, "\t") : "MISSING EXPO CONFIG"}
      </Text>
    </SafeAreaView>
  );
}

