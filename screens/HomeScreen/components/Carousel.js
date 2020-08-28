import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Image } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Colors from '../../../utils/Colors';

export default class MyCarousel extends Component {
  constructor(props) {
    super(props);

    // state
    this.state = {
      activeSlide: 0,
    };
  }
  _renderItem = ({ item, index }) => {
    return (
      <TouchableWithoutFeedback style={styles.slide}>
        <Image
          style={{ height: 130, borderRadius: 10, resizeMode: 'cover' }}
          source={{ uri: item.url }}
        ></Image>
      </TouchableWithoutFeedback>
    );
  };
  get pagination() {
    return (
      <Pagination
        dotsLength={this.props.products.length}
        activeDotIndex={this.state.activeSlide}
        containerStyle={{
          backgroundColor: 'transparent',
          paddingVertical: 10,
          position: 'absolute',
          bottom: 5,
          right: 3,
        }}
        dotStyle={{
          width: 14,
          height: 5,
          backgroundColor: Colors.lighter_green, //"rgba(255, 255, 255, 0.9)"
          borderRadius: 2,
          marginHorizontal: -10,
        }}
        inactiveDotStyle={{
          backgroundColor: Colors.light_grey,
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
        style={styles.pagi}
      />
    );
  }

  render() {
    const { width } = Dimensions.get('window');
    return (
      <View style={{ ...styles.banner, ...this.props.style }}>
        <Carousel
          ref={(c) => {
            this._carousel = c;
          }}
          layout='default'
          data={this.props.products}
          renderItem={this._renderItem}
          sliderWidth={width}
          itemWidth={width - 30}
          inactiveSlideScale={1}
          inactiveSlideOpacity={1}
          loop={true}
          autoplay
          onSnapToItem={(index) => this.setState({ activeSlide: index })}
        />
        {this.pagination}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  banner: {
    position: 'relative',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  slide: {
    marginTop: 10,
    marginHorizontal: 5,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    height: 140,
  },
});
