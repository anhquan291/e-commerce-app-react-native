import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  PlaceholderContainer,
  Placeholder,
} from 'react-native-loading-placeholder';

const { height, width } = Dimensions.get('window');

const Gradient = () => {
  return (
    <LinearGradient
      colors={['#eeeeee', '#dddddd', '#eeeeee']}
      start={{ x: 1.0, y: 0.0 }}
      end={{ x: 0.0, y: 0.0 }}
      style={{
        flex: 1,
        width: 120,
      }}
    />
  );
};
const Skeleton = () => {
  return (
    <PlaceholderContainer
      style={styles.container}
      animatedComponent={<Gradient />}
      duration={1000}
      replace={true}
    >
      <View style={styles.banner}>
        <Placeholder
          style={{
            ...styles.placeholder,
            width: '100%',
            height: 130,
          }}
        />
      </View>
      <View style={styles.text}>
        <Placeholder
          style={{
            ...styles.placeholder,
            width: '60%',
            height: 30,
          }}
        />
      </View>
      <View style={styles.content}>
        <View style={{ width: '49%' }}>
          <Placeholder
            style={{
              ...styles.placeholder,
              width: '95%',
              height: 95,
            }}
          />
          <Placeholder
            style={{
              ...styles.placeholder,
              width: '80%',
              height: 20,
              marginTop: 5,
            }}
          />
          <Placeholder
            style={{
              ...styles.placeholder,
              width: '30%',
              height: 20,
              marginTop: 5,
            }}
          />
          <Placeholder
            style={{
              ...styles.placeholder,
              width: '95%',
              height: 40,
              marginTop: 5,
            }}
          />
        </View>
        <View style={{ width: '49%' }}>
          <Placeholder
            style={{
              ...styles.placeholder,
              width: '95%',
              height: 95,
            }}
          />
          <Placeholder
            style={{
              ...styles.placeholder,
              width: '80%',
              height: 20,
              marginTop: 5,
            }}
          />
          <Placeholder
            style={{
              ...styles.placeholder,
              width: '30%',
              height: 20,
              marginTop: 5,
            }}
          />
          <Placeholder
            style={{
              ...styles.placeholder,
              width: '95%',
              height: 40,
              marginTop: 5,
            }}
          />
        </View>
        <View style={{ width: '49%', marginTop: 15 }}>
          <Placeholder
            style={{
              ...styles.placeholder,
              width: '95%',
              height: 95,
            }}
          />
          <Placeholder
            style={{
              ...styles.placeholder,
              width: '80%',
              height: 20,
              marginTop: 5,
            }}
          />
          <Placeholder
            style={{
              ...styles.placeholder,
              width: '30%',
              height: 20,
              marginTop: 5,
            }}
          />
          <Placeholder
            style={{
              ...styles.placeholder,
              width: '95%',
              height: 40,
              marginTop: 5,
            }}
          />
        </View>
        <View style={{ width: '49%', marginTop: 15 }}>
          <Placeholder
            style={{
              ...styles.placeholder,
              width: '95%',
              height: 95,
            }}
          />
          <Placeholder
            style={{
              ...styles.placeholder,
              width: '80%',
              height: 20,
              marginTop: 5,
            }}
          />
          <Placeholder
            style={{
              ...styles.placeholder,
              width: '30%',
              height: 20,
              marginTop: 5,
            }}
          />
          <Placeholder
            style={{
              ...styles.placeholder,
              width: '95%',
              height: 40,
              marginTop: 5,
            }}
          />
        </View>
      </View>
      {height < 668 ? (
        <View />
      ) : (
        <View style={{ ...styles.text, marginTop: 10 }}>
          <Placeholder
            style={{
              ...styles.placeholder,
              width: '100%',
              height: 50,
            }}
          />
        </View>
      )}
    </PlaceholderContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 10,
    position: 'absolute',
    width,
    backgroundColor: '#fff',
    height,
    marginTop: 80,
  },
  placeholder: {
    backgroundColor: '#eeeeee',
    borderRadius: 5,
  },
  banner: {
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  text: {
    marginTop: 30,
    paddingHorizontal: 10,
  },
  content: {
    marginTop: 20,
    flexDirection: 'row',
    paddingLeft: 10,
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
});

export default Skeleton;
