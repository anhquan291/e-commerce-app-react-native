import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Animated,
  StatusBar,
} from 'react-native';
//Redux
import { useDispatch } from 'react-redux';
//Action
import * as CheckFirstTimeAction from '../../store/product/checkFirstTimeActions';
//Slides
import Slide from './components/Slide';
import SubSlide from './components/SubSlide';
import slides from '../../db/IntroSlides';
import Ticker from './components/TickerText';
import Pagination from './components/Pagination';
import Loader from '../../components/Loaders/Loader';

const { height, width } = Dimensions.get('window');

const IntroScreen = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollClick = useRef(null);
  const [loading, setLoading] = useState(false);
  const unmounted = useRef(false);
  useEffect(() => {
    return () => {
      unmounted.current = true;
    };
  }, []);
  const backgroundColor = scrollX.interpolate({
    inputRange: [0, width, width * 2],
    outputRange: ['#BFEAF5', '#BEECC4', '#FFE4D9'],
    extrapolate: 'clamp',
  });
  const textTranslate = scrollX.interpolate({
    inputRange: [0, width, width * 2],
    outputRange: [0, width * -1, width * -2],
    extrapolate: 'clamp',
  });
  const dispatch = useDispatch();
  const EnterApp = async () => {
    setLoading(true);
    await dispatch(CheckFirstTimeAction.firstOpen());
    if (!unmounted.current) {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {loading ? <Loader /> : <></>}
      <Animated.View style={[styles.slider, { backgroundColor }]}>
        <Ticker scrollX={scrollX} />
        <Animated.ScrollView
          ref={scrollClick}
          horizontal
          snapToInterval={width}
          scrollTo={{ x: scrollClick, animated: true }}
          decelerationRate='fast'
          showsHorizontalScrollIndicator={false}
          bounces={false}
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false } //
          )}
        >
          {slides.map((slide) => {
            return (
              <Slide
                key={slide.lable}
                label={slide.lable}
                imageUrl={slide.imageUrl}
              />
            );
          })}
        </Animated.ScrollView>
      </Animated.View>
      <View style={styles.footer}>
        <Pagination slides={slides} scrollX={scrollX} />
        <Animated.View
          style={[StyleSheet.absoluteFillObject, { backgroundColor }]}
        ></Animated.View>
        <Animated.View style={styles.footerContent}>
          <Animated.View
            style={{
              flexDirection: 'row',
              width: width * slides.length,
              transform: [{ translateX: textTranslate }],
            }}
          >
            {slides.map(({ subtitle, des }, index) => {
              return (
                <SubSlide
                  key={subtitle}
                  last={index === slides.length - 1}
                  EnterApp={EnterApp}
                  subtitle={subtitle}
                  des={des}
                  scrollX={scrollX}
                  NextSlide={() => {
                    if (scrollClick.current) {
                      scrollClick.current.scrollTo({ x: width * (index + 1) });
                    }
                  }}
                />
              );
            })}
          </Animated.View>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  slider: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 20,
    height: 0.61 * height,
    borderBottomEndRadius: 75,
  },
  footer: {
    flex: 1,
  },
  footerContent: {
    flex: 1,
    borderTopLeftRadius: 75,
    flexDirection: 'row',
    backgroundColor: '#ffffff',
  },
});

export default IntroScreen;
