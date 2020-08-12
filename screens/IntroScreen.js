import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, Platform } from 'react-native';
//Animatable
import * as Animatable from 'react-native-animatable';
import Colors from '../constants/Colors';
//Swiper
import Swiper from 'react-native-swiper';
//Redux
import { useDispatch } from 'react-redux';
//Action
import * as ProductActions from '../store/shop-actions';
//Intro Button
import IntroButton from '../components/Intro/IntroButton';
//Intro Slide
import IntroSlider from '../components/Intro/IntroSlider';
//device height
const { height, width } = Dimensions.get('window');

const StartupScreen = (props) => {
  const [index, setIndex] = useState();
  const dispatch = useDispatch();
  const handleIndex = (index) => {
    setIndex(index);
  };
  const EnterApp = () => {
    dispatch(ProductActions.firstOpen());
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          resizeMode: 'contain',
          width: 700,
          height: 700,
          position: 'absolute',
          borderRadius: 350,
          top: -(700 - width / 2),
          backgroundColor: Colors.lighter_green,
          alignSelf: 'center',
          borderColor: Colors.lighter_green,
          borderWidth: 2,
        }}
      />
      <View style={styles.header}>
        <Animatable.Image
          animation='zoomIn'
          style={{
            resizeMode: 'contain',
            width: '60%',
            height: 100,
            marginTop: height < 668 ? 10 : 40,
          }}
          source={require('../assets/Images/logoTextWhite.png')}
        />
      </View>
      <View style={{ flex: 1 }}>
        <Swiper
          style={styles.wrapper}
          loop={false}
          onIndexChanged={(index) => handleIndex(index)}
          dot={<View style={styles.dot} />}
          activeDot={<View style={styles.activeDot} />}
        >
          <IntroSlider
            imageUrl={require('../assets/Images/slide1.png')}
            text='Mua Sự May Mắn'
          />
          <IntroSlider
            imageUrl={require('../assets/Images/slide2.png')}
            text='Cầu Chúc Bình An'
          />
          <IntroSlider
            imageUrl={require('../assets/Images/slide3.png')}
            text='Vạn Sự Như Ý'
          />
        </Swiper>
      </View>
      {index === 2 ? (
        <Animatable.View style={styles.btnContainer} animation='fadeIn'>
          <IntroButton EnterApp={EnterApp} navigation={props.navigation} />
        </Animatable.View>
      ) : (
        <Animatable.View
          style={styles.btnContainer}
          animation='fadeOut'
          duration={500}
        >
          <IntroButton EnterApp={EnterApp} navigation={props.navigation} />
        </Animatable.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    width: '100%',
    height: Platform.OS === 'android' ? 150 : height < 668 ? 130 : 200,
    alignItems: 'center',
  },
  dot: {
    backgroundColor: 'rgba(0,0,0,.2)',
    width: 10,
    height: 5,
    borderRadius: 5,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 0,
    marginBottom: 0,
  },
  activeDot: {
    backgroundColor: Colors.light_green,
    width: 20,
    height: 5,
    borderRadius: 5,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 0,
    marginBottom: 0,
  },
  btnContainer: {
    height: Platform.OS === 'android' ? 70 : 100,
    alignItems: 'center',
  },
});

export default StartupScreen;
