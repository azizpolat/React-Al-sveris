import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {Colors} from '../themes/Colors';
import {useNavigation} from '@react-navigation/native';

export default function Header() {
  // yonlendşrme yapmak için
  const navigations = useNavigation();
  return (
    <View
      style={{
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        padding: 16,
      }}>
      <TouchableOpacity>
        <Entypo
          name="shopping-bag"
          style={{
            fontSize: 18,
            color: Colors.backgroundMedium,
            backgroundColor: Colors.backgroundLight,
            padding: 12,
            borderRadius: 10,
          }}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigations.navigate('MyCart')}>
        <MaterialCommunityIcons
          name="cart"
          style={{
            fontSize: 18,
            color: Colors.backgroundMedium,
            borderWidth: 1,
            padding: 12,
            borderRadius: 10,
            borderColor: Colors.backgroundLight,
          }}
        />
      </TouchableOpacity>
    </View>
  );
}

/*
buarada projedeki ust kısmı tek basına bi components seklinde olussturduk ana safya Home sayafasın aimport ettik boylece kod kalbalıgı ve okunması ıcın daha uygun oldu

*/
