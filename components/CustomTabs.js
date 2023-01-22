/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import { Animated, Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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
// const data = Object.keys(images).map((i) => ({
//   key: i,
//   title: i,
//   image: images[i],
//   ref: React.createRef(),
// }));

const Indicator = ({measures, scrollX, data}) => {

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

const Tab = React.forwardRef(({item, onItemPress, data}, ref) => {
  return <TouchableOpacity onPress={onItemPress}>
  <View ref={ref}>
    <Text style={{
      color: 'white',
      fontSize: 80 / data.length,
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

    console.log(measurements);
  }, [data, measurements.length]);

  return <View style={{
    position: 'absolute',
    top: 10,
    width,
  }}>
    <View style={{
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      width: '100%',
    }}
    ref={containerRef}
    >
      {data.map((item, index) => <Tab key={index} item={item} ref={item.ref} onItemPress={() => {
        onItemPress(index);
      }} data={data}/>)}
    </View>
    {measurements.length > 0 && <Indicator measures={measurements} scrollX={scrollX} data={data}/>}
  </View>;
};


const CustomTabs = ({isBg, isOverlay, contentBg, bgColor, tabTitles, children, onIndexChange}) => {

  const scrollX = React.useRef(new Animated.Value(0)).current;
  const flatListRef = React.useRef();
  const [titles, setTitles] = React.useState([]);
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const onItemPress = React.useCallback((itemIndex) => {
    flatListRef.current.scrollToOffset({
      offset: itemIndex * width,
    });
  });

  React.useEffect(() => {
    if (tabTitles.length > 0){
      setTitles(tabTitles.map((item, index) => {
        return {
          key: index,
          title: item,
          ref: React.createRef(),
        };
      }));
    }
  }, [tabTitles]);

  React.useEffect(() => {

    if (typeof onIndexChange === 'function'){
      onIndexChange(currentIndex);
    }
  }, [currentIndex]);

  return (
    <View>
      <Animated.FlatList
        ref={flatListRef}
        data={titles}
        keyExtractor={(item) => item.key}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}
        renderItem={({item}) => {
          return (
            <>
              <View style={{width, height}}>
                {isBg && <Image source={{uri: item.image}} style={{flex: 1, resizeMode: 'cover'}}/>}
                {isOverlay && <View style={[StyleSheet.absoluteFillObject, {backgroundColor: 'rgba(0, 0, 0, 0.5)'}]}/>}
              </View>
              <View style={contentBg ? {
                position: 'absolute',
                top: 70,
                left: 0,
                width,
                height: (height/2),
                backgroundColor: bgColor ? bgColor : 'white',
                justifyContent: 'flex-end',
              } : {
                position: 'absolute',
                top: 150,
                left: 0,
                width,
                height: (height - 150),
                backgroundColor: 'transparent',
              }}>
                <ScrollView>
                  {children && children}
                </ScrollView>
              </View>
            </>
          );
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
        bounces={false}
        pagingEnabled
        onMomentumScrollEnd={(event) => {
          const index = Math.floor(
              Math.floor(event.nativeEvent.contentOffset.x) /
              Math.floor(event.nativeEvent.layoutMeasurement.width)
          );
          // work with: index
          setCurrentIndex(index);
      }}
      />

      <Tabs data={titles} scrollX={scrollX} onItemPress={onItemPress}/>
    </View>
  );
};

export default CustomTabs;

const styles = StyleSheet.create({});
