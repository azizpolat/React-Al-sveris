import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {Colors} from '../themes/Colors';
import {useNavigation} from '@react-navigation/native';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import {Items} from '../database/Database';
import SectionHeader from '../components/SectionHeader';
export default function Home() {
  // yonlendirme yapmak için
  const navigations = useNavigation();

  // producgt card ıcın her bir eleamn için state tutmak ıcın olustruduj
  const [products, setProducts] = useState([]);
  const [accessory, setAccrssory] = useState([]);

  // uygulama her calıstıgında calısacak bunun için use efffeck ıcınde calsıtrıdk
  useEffect(() => {
    getDataFromDB();
  }, []);

  // dataları ve resimleri almak için istek atıyoruz
  const getDataFromDB = () => {
    let productList = [];
    let accessoryList = [];

    // databse reismleri categorilerine gore almak için tek tek okuma yaptık ve categorileri gore bos olusturdugumuz lsıtelere ekleme yaptık
    for (let index = 0; index < Items.length; index++) {
      if (Items[index].category === 'product') {
        productList.push(Items[index]);
      } else {
        accessoryList.push(Items[index]);
      }
    }
    setProducts(productList);
    setAccrssory(accessoryList);
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header />
        <View>
          <Text
            style={{
              fontSize: 26,
              color: Colors.black,
              fontWeight: '500',
              letterSpacing: 1,
              marginBottom: 10,
            }}>
            Hi - Fi Shop & Service
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontWeight: '400',
              letterSpacing: 1,
              lineHeight: 24,
            }}>
            {' '}
            Audio shop on Rustaveli Ave 57.
            {'\n'}This shop offers both products and services{' '}
          </Text>
        </View>
        <View style={{padding: 16}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                fontSize: 18,
                color: Colors.black,
                fontWeight: '500',
                letterSpacing: 1,
              }}>
              Product 41
            </Text>
            <TouchableOpacity>
              <Text
                style={{fontSize: 14, color: Colors.blue, fontWeight: '400'}}>
                See All
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
            }}>
            {products.map(data => (
              <ProductCard key={data.id} data={data} />
            ))}
          </View>
        </View>
        <View style={{padding: 16}}>
          <SectionHeader title={'Accessories '} count={'78'} />
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-around',
            }}>
            {accessory.map(data => (
              <ProductCard data={data} key={data.id} />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    width: '100%',
    height: '100%',
  },
});

/*
StatusBar yapısı ile android ust kısımdakı arka plan siyahlıgı kaldırfık ve sekillendirme yaptık

ProductCart içinde data olarak promps gonderdik ve onu produckscart sayfasında kullanıyoruz

showsVerticalScrollIndicator ile scroll yandakı cubuk kaldırıyoruz

*/
