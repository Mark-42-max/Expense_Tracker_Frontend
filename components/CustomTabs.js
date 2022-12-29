/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import { Animated, Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

const {width, height} = Dimensions.get('window');

const images = {
  man:
    'https://images.pexels.com/photos/3147528/pexels-photo-3147528.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  women:
    'https://images.pexels.com/photos/2552130/pexels-photo-2552130.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  kids:
    'https://images.pexels.com/photos/5080167/pexels-photo-5080167.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  skullcandy:
    'https://images.pexels.com/photos/5602879/pexels-photo-5602879.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  help:
    'https://images.pexels.com/photos/2552130/pexels-photo-2552130.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
};
const data = Object.keys(images).map((i) => ({
  key: i,
  title: i,
  image: images[i],
  ref: React.createRef(),
}));

const Indicator = ({measures, scrollX}) => {

  const inputRange = data.map((_, i) => i * width);
  const indicatorWidth = scrollX.interpolate({
    inputRange,
    outputRange: measures.map((measure) => measure.width),
  });

  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: measures.map((measure) => measure.x),
  });

  return <Animated.View style={{
    position: 'absolute',
    height: 4,
    width: indicatorWidth,
    left: 0,
    borderRadius: 2,
    backgroundColor: 'white',
    bottom: -10,
    transform: [{translateX: translateX}],
  }}/>;
};

const Tab = React.forwardRef(({item, onItemPress}, ref) => {
  return <TouchableOpacity onPress={onItemPress}>
  <View ref={ref}>
    <Text style={{
      color: 'white',
      fontSize: 100 / data.length,
    }}>{item.title}</Text>
  </View>
  </TouchableOpacity>;
});


const Tabs = ({data, scrollX, onItemPress}) => {

  const containerRef = React.useRef();
  const [measurements, setMeasurements] = React.useState([]);

  React.useEffect(() => {
    let m = [];
    data.forEach((item) => {
      item.ref.current.measureLayout(
          containerRef.current,
          (x, y, width, height) => {
            m.push({x, y, width, height});

            if (m.length === data.length) {
              setMeasurements(m);
            }
          }
        );
    });
  }, []);

  return <View style={{
    position: 'absolute',
    top: 100,
    width,
  }}>
    <View style={{
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      width: '100%',
    }}
    ref={containerRef}
    >
      {data.map((item, index) => <Tab item={item} ref={item.ref} onItemPress={() => {
        onItemPress(index);
      }}/>)}
    </View>
    {measurements.length > 0 && <Indicator measures={measurements} scrollX={scrollX}/>}
  </View>;
};


const CustomTabs = () => {

  const scrollX = React.useRef(new Animated.Value(0)).current;
  const flatListRef = React.useRef();

  const onItemPress = React.useCallback((itemIndex) => {
    flatListRef.current.scrollToOffset({
      offset: itemIndex * width,
    });
  });

  return (
    <View>
      <Animated.FlatList
        ref={flatListRef}
        data={data}
        keyExtractor={(item) => item.key}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}
        renderItem={({item}) => {
          return (
            <>
              <View style={{width, height}}>
                {/* <Image source={{uri: item.image}} style={{flex: 1, resizeMode: 'cover'}}/>
                <View style={[StyleSheet.absoluteFillObject, {backgroundColor: 'rgba(0, 0, 0, 0.5)'}]}/> */}
              </View>
              <View style={{
                position: 'absolute',
                top: 150,
                left: 0,
                width,
                height: (height - 150),
                backgroundColor: 'white',
              }}>
                <Text>hhh</Text>
              </View>
            </>
          );
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
        bounces={false}
        pagingEnabled
      />

      <Tabs data={data} scrollX={scrollX} onItemPress={onItemPress}/>
    </View>
  );
};

export default CustomTabs;

const styles = StyleSheet.create({});
