import {SafeAreaView, Text, View} from 'react-native';
import Routes from './src/navigates/Routes';
import {NavigationContainer} from '@react-navigation/native';

const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    </SafeAreaView>
  );
};
export default App;
/*
 Routes sayfalarımızı algılaması için naviateContainer içinde olması gerekiyor yoksa hata verir
 burdan da hangi sayfaya yonlendireceğimiz belirtiyoruz
 */