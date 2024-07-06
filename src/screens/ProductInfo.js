import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
  Dimensions,
  Animated,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Items} from '../database/Database';
import {Colors} from '../themes/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Entypo from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage';

const width = Dimensions.get('window').width;

const scrollX = new Animated.Value(0);

const position = Animated.divide(scrollX, width);

export default function ProductInfo() {
  // tıklanan urunun verileri alıyoruz
  const routes = useRoute();
  // console.log(routes);

  // tıklanan urunun routes içinden ıd alıyoruz
  const {productID} = routes.params;
  // console.log(productID);

  // bulunan ıd elemanı setProduct içine atıyoruz
  const [product, setProduct] = useState({});

  // yonlendirme için
  const navigation = useNavigation();

  const renderProduct = item => {
    return (
      <View>
        <Image source={item} />
      </View>
    );
  };
  // async temizleme
  const clearAsync = async () => {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDataFromDB(), //
      [productID]; //
    clearAsync();
  });

  const getDataFromDB = () => {
    // id bilinen elemanın  fınd ile product statte atıyrouz
    const product = Items.find(item => item.id === productID);
    if (product) {
      setProduct(product);
    }
  };

  // Add cart tıklayınca id elemanı almak yani sepete eklemek fonksıyornu
  const addCart = async id => {
    // sepette onceden urun var mı varsa Async getir
    let itemArray = await AsyncStorage.getItem('cartItems');
    console.log(itemArray);

    itemArray = JSON.parse(itemArray);

    console.log('calısıtı');
    if (itemArray) {
      let array = itemArray;
      array.push(id);
      try {
        await AsyncStorage.setItem('cartItems', JSON.stringify(array));
        Alert.alert;
      } catch (error) {}
    } else {
      let array = [];
      array.push(id);
      try {
        await AsyncStorage.setItem('cartItems', JSON.stringify(array));
        Alert.alert('eklendi');

        // ekleme yapınca Home sayfasına yonlendirme
        navigation.navigate('Home');
      } catch (error) {
        console.log(error);
        return;
      }
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{marginTop: 10}}>
          <View
            style={{
              width: '100%',
              paddingTop: 16,
              paddingLeft: 16,
            }}>
            <TouchableOpacity onPress={() => navigation.goBack('Home')}>
              <Entypo
                name="chevron-left"
                style={{
                  fontSize: 18,
                  color: Colors.backgroundDark,
                  backgroundColor: Colors.white,
                  padding: 12,
                  borderRadius: 10,
                }}
              />
            </TouchableOpacity>
          </View>
          <FlatList
            decelerationRate={0.8}
            snapToInterval={width}
            bounces={false}
            showsHorizontalScrollIndicator={false}
            horizontal
            data={product.productImageList ? product.productImageList : []}
            renderItem={({item}) => (
              <View style={{width: width, height: 240}}>
                <Image
                  style={{width: '100%', height: '100%', resizeMode: 'contain'}}
                  source={item}
                />
              </View>
            )}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {x: scrollX}}}],
              {useNativeDriver: false},
            )}
          />
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 16,
              marginTop: 32,
            }}>
            {product.productImageList
              ? product.productImageList.map((data, index) => {
                  let opacity = position.interpolate({
                    inputRange: [index - 1, index, index + 1],
                    outputRange: [0.2, 1, 0.2],
                    extrapolate: 'clamp',
                  });
                  return (
                    <Animated.View
                      key={index}
                      style={{
                        width: '16%',
                        height: 2.4,
                        backgroundColor: Colors.black,
                        marginHorizontal: 4,
                        opacity,
                      }}></Animated.View>
                  );
                })
              : null}
          </View>

          <View style={{paddingHorizontal: 16, marginTop: 6}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 14,
              }}>
              <Entypo
                name="shopping-cart"
                style={{
                  fontSize: 18,
                  color: Colors.blue,
                  marginRight: 6,
                  marginRight: 6,
                }}
              />
              <Text style={{color: Colors.black, fontSize: 12}}>Shopping</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginVertical: 4,
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: '600',
                  letterSpacing: 0.4,
                  color: Colors.black,
                  maxWidth: '84%',
                  marginVertical: 4,
                }}>
                {product.productName}
              </Text>
              <TouchableOpacity
                style={{
                  backgroundColor: Colors.blue + 20,
                  padding: 8,
                  borderRadius: 100,
                }}>
                <Ionicons name="link-outline" size={24} color={Colors.black} />
              </TouchableOpacity>
            </View>
            <Text
              style={{
                fontSize: 12,
                color: Colors.black,
                fontWeight: '400',
                maxWidth: '85%',
                opacity: 0.5,
                lineHeight: 20,
                maxHeight: 44,
                marginBottom: 18,
              }}>
              {product.description}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',

                justifyContent: 'space-between',
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View
                  style={{
                    backgroundColor: Colors.backgroundLight,
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 12,
                    marginRight: 10,
                    borderRadius: 100,
                  }}>
                  <Entypo name="location-pin" size={16} color={Colors.blue} />
                </View>
                <Text>istanbul Esenyurt {'\n'} 17-0001</Text>
                <Entypo
                  name="chevron-right"
                  size={22}
                  color={Colors.backgroundDark}
                />
              </View>
            </View>

            <View style={{paddingHorizontal: 16}}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '500',
                  color: Colors.black,
                  marginVertical: 4,
                }}>
                {product.productPrice}.00 ₺
              </Text>
              <Text>
                Tax Rate %2 {product.productPrice / 20}₺ ({' '}
                {product.productPrice + product.productPrice / 20}₺ )
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          bottom: 0,
          width: '100%',
          height: '8%',
        }}>
        <TouchableOpacity
          onPress={() => (product.isAvailable ? addCart(product.id) : null)}
          style={{
            width: '86%',
            height: '90%',
            backgroundColor: Colors.blue,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 20,
          }}>
          <Text
            style={{
              fontSize: 12,
              fontWeight: '500',
              color: Colors.white,
              textTransform: 'uppercase',
            }}>
            {product.isAvailable ? 'ADD TO CART' : 'NOT AVAİLABLE'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    width: '100%',
    height: '100%',
    position: 'relative',
  },
});

/*
home sayfasından gondermiş oldugumuz productID ile id alıyoruz useroute ile ıd ait urun bilgilerini alıyoruz

goBack press yapınca oncekş saytfaya yonlendirıyor


decelerationRate={0.8} >>> resimlerin yana kaydırmaddakı yavaslıgı
snapToInterval={width} >>> resimlere sadece tek bir hareket ile hangı yone gıtmesini belirtiyotuz o kendisis resim gelene kadar oynatıyor

 */
