import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors} from '../themes/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Items} from '../database/Database';
import {useNavigation} from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import Cart from '../components/Cart';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
export default function MyCart() {
  // yonlendirme için
  const navigation = useNavigation();

  // ürünleri tutmak içim
  const [product, setProduct] = useState([]);

  // toplam ururnleri tutmak içn
  const [total, setTotal] = useState(0);

  useEffect(() => {
    getDataFromDB();
  }, [navigation]);

  // Tum dataları almak için
  const getDataFromDB = async () => {
    let items = await AsyncStorage.getItem('cartItems');
    console.log(items);

    items = JSON.parse(items);
    // console.log(items);

    let productData = [];
    if (items) {
      Items.forEach(data => {
        if (items.includes(data.id)) {
          data.quantity = 1; // eklenen id urunun miktarı arttır
          productData.push(data); // product data ekle
        }
      });
      setProduct(productData);
      getTotal(productData);
    } else {
      setProduct([]);
      setTotal(0);
    }
  };

  // sepetteki urunlerin sayısı ile fiyatı carpım totol mikrrar  gonderiyor
  const getTotal = productData => {
    let total = 0;
    for (let i = 0; i < productData.length; i++) {
      let productPrice = productData[i].productPrice * productData[i].quantity;
      total += productPrice;
    }
    console.log(total);
  };
  setTotal(total);

  return (
    <>
      {product.length > 0 ? (
        <View
          style={{
            backgroundColor: Colors.white,
            width: '100%',
            height: '100%',
            position: 'relative',
          }}>
          <View style={styles.container}>
            <TouchableOpacity style={styles.backButton}>
              <MaterialCommunityIcons name="chevron-left" size={18} />
            </TouchableOpacity>
            <Text style={styles.orderTitle}>Order Details</Text>
          </View>
          <ScrollView>
            <Text style={styles.myCart}>My Cart</Text>
            <View
              style={{
                paddingHorizontal: 16,
              }}>
              {product.length > 0
                ? product.map(data => (
                    <Cart
                      key={data.id}
                      data={data}
                      product={product}
                      setProduct={setProduct}
                      getDataFromDB={getDataFromDB}
                      getTotal={getTotal}
                    />
                  ))
                : null}
            </View>

            <View>
              <View>
                <Text style={styles.locationText}>Delivery Locaiton</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingHorizontal: 16,
                    marginVertical: 10,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      width: '80%',
                      alignItems: 'center',
                    }}>
                    <View style={styles.deliveryBox}>
                      <MaterialCommunityIcons
                        name="truck-delivery-outline"
                        size={18}
                        color={Colors.blue}
                      />
                    </View>
                    <View>
                      <Text
                        style={{
                          fontSize: 14,
                          color: Colors.black,
                          fontWeight: '500',
                        }}>
                        İstanbul-Beşiktaş
                      </Text>
                    </View>
                  </View>

                  <MaterialCommunityIcons
                    name="chevron-right"
                    size={22}
                    color={Colors.black}
                  />
                </View>
              </View>
            </View>

            <Text style={styles.locationText}>Payment Method</Text>
            <View style={{paddingHorizontal: 16, marginVertical: 10}}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{flexDirection: 'row', gap: 10}}>
                  <View style={styles.creditCard}>
                    <Text
                      style={{
                        color: Colors.blue,
                      }}>
                      VISA
                    </Text>
                  </View>
                  <View>
                    <Text>VISA Classic</Text>
                    <Text style={{opacity: 0.6}}>****-2121</Text>
                  </View>
                </View>
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={22}
                  color={Colors.black}
                />
              </View>
            </View>

            <Text style={styles.locationText}>Order Info</Text>
            <View
              style={{
                paddingHorizontal: 16,
                marginVertical: 10,
                gap: 10,
              }}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text
                  style={{
                    opacity: 0.5,
                    fontSize: 12,
                    fontWeight: '400',
                  }}>
                  Subtotal
                </Text>
                <Text
                  style={{
                    color: Colors.black,
                    fontSize: 12,
                    fontWeight: '400',
                  }}>
                  {total} ₺
                </Text>
              </View>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text
                  style={{
                    opacity: 0.5,
                    fontSize: 12,
                    fontWeight: '400',
                  }}>
                  Shipiing Tax
                </Text>
                <Text
                  style={{
                    color: Colors.black,
                    fontSize: 12,
                    fontWeight: '400',
                  }}>
                  {total / 20} ₺
                </Text>
              </View>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text
                  style={{
                    opacity: 0.5,
                    fontSize: 12,
                    fontWeight: '400',
                  }}>
                  Subtotal
                </Text>
                <Text
                  style={{
                    color: Colors.black,
                    fontSize: 12,
                    fontWeight: '400',
                  }}>
                  {total + total / 20} ₺
                </Text>
              </View>
            </View>
          </ScrollView>

          <View
            style={{
              position: 'absolute',
              bottom: 10,
              height: '8%',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => checkout()}
              style={{
                backgroundColor: Colors.blue,
                width: '86%',
                height: '90%',
                borderRadius: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: Colors.white,
                  fontSize: 12,
                  fontWeight: '500',
                  letterSpacing: 1,
                }}>
                CHECKOUT {total + total / 20}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            backgroundColor: Colors.white,
          }}>
          <Text>Sepette Ürün Yoktur</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Home')}
            style={{
              marginTop: 10,
            }}>
            <Text
              style={{
                textDecorationLine: 'underline',
                color: Colors.blue,
              }}>
              Ürün eklemek için ana sayfaya git
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 16,
    width: '62%',
    alignItems: 'center',
  },
  backButton: {
    backgroundColor: Colors.backgroundLight,
    padding: 12,
    borderRadius: 12,
    marginLeft: 15,
  },
  orderTitle: {
    fontSize: 14,
    color: Colors.black,
    fontWeight: '400',
  },
  myCart: {
    fontSize: 20,
    color: Colors.black,
    paddingTop: 20,
    paddingLeft: 16,
    marginBottom: 10,
    fontWeight: '500',
  },
  locationText: {
    fontSize: 16,
    color: Colors.black,
    paddingHorizontal: 16,
    marginVertical: 10,
    marginBottom: 10,
    letterSpacing: 1,
    fontWeight: '500',
  },
  deliveryBox: {
    backgroundColor: Colors.backgroundLight,
    padding: 12,
    borderRadius: 10,
    marginRight: 10,
  },
  creditCard: {
    backgroundColor: Colors.backgroundLight,
    padding: 12,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
