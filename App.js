/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  ScrollView,
  View,
  Dimensions,
  Animated
} from "react-native";

const DEVICE_WIDTH = Dimensions.get("screen").width;
const DEVICE_HEIGHT = Dimensions.get("screen").height;

Number.prototype.mod = function(n) {
  return ((this % n) + n) % n;
};

const mockTitles = [
  "Lorem",
  "ipsum",
  "dolor",
  "sit",
  "amet,",
  "consectetur",
  "adipiscing",
  "elit",
  "Proin",
  "facilisis",
  "eros",
  "nibh,",
  "sit",
  "amet",
  "vehicula",
  "nisi",
  "tempus",
  "sit",
  "amet",
  "Aenean"
];

const mockText = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
  "Pellentesque quis rutrum sem",
  "Proin ligula risus, euismod dignissim rutrum quis, maximus quis velit",
  "Morbi condimentum metus eu hendrerit euismod",
  "Suspendisse id lorem non ipsum sollicitudin faucibus at a sapien",
  "Etiam pellentesque orci a leo lobortis cursus",
  "Quisque sollicitudin luctus felis, at hendrerit diam pulvinar porta",
  "Etiam sagittis lacus quis consectetur efficitur",
  "Donec sollicitudin non augue nec eleifend",
  "Nunc sodales cursus diam eget pretium",
  "Cras imperdiet felis in tellus vehicula, a vestibulum tellus laoreet",
  "Pellentesque venenatis, lectus eu mollis vulputat…lisis risus, vitae fringilla leo tortor nec magna",
  "Sed lacus sem, varius nec tempus sed, efficitur id libero",
  "Cras tincidunt feugiat neque a mollis",
  "Etiam in velit purus",
  "Aliquam aliquet libero non tortor egestas iaculis",
  "Praesent aliquam accumsan viverra",
  "Ut suscipit lacus eget neque hendrerit hendrerit",
  "Pellentesque sollicitudin maximus nunc, eu condimentum risus",
  "Integer egestas accumsan neque ornare venenatis"
];

type Props = {};
export default class App extends Component<Props> {
  constructor() {
    super();
    this.scrollX = new Animated.Value(0);
  }

  scrollView = null;

  _renderItem = (e, index) => (
    <View key={index} style={styles.itemContainer}>
      <View style={{ flex: 1 }}>{this._renderTopItem(e, index)}</View>
      {this._renderBottomItem(e, index)}
    </View>
  );

  _renderTopItem = (e, index) => {
    const translateY = this.scrollX.interpolate({
      inputRange: [
        (index - 3) * DEVICE_WIDTH,
        (index - 2) * DEVICE_WIDTH,
        (index - 1) * DEVICE_WIDTH,
        index * DEVICE_WIDTH,
        (index + 1) * DEVICE_WIDTH,
        (index + 2) * DEVICE_WIDTH,
        (index + 3) * DEVICE_WIDTH
      ],
      outputRange: [
        -DEVICE_WIDTH / 6,
        DEVICE_WIDTH / 6,
        DEVICE_WIDTH / 2,
        DEVICE_WIDTH / 6,
        DEVICE_WIDTH / 2,
        DEVICE_WIDTH / 6,
        -DEVICE_WIDTH / 6
      ],
      extrapolate: "clamp"
    });
    const translateX = this.scrollX.interpolate({
      inputRange: [
        (index - 3) * DEVICE_WIDTH,
        (index - 2) * DEVICE_WIDTH,
        (index - 1) * DEVICE_WIDTH,
        index * DEVICE_WIDTH,
        (index + 1) * DEVICE_WIDTH,
        (index + 2) * DEVICE_WIDTH,
        (index + 3) * DEVICE_WIDTH
      ],
      outputRange: [
        (-6 * DEVICE_WIDTH) / 3,
        (-4 * DEVICE_WIDTH) / 3,
        (-2 * DEVICE_WIDTH) / 3,
        0,
        (2 * DEVICE_WIDTH) / 3,
        (4 * DEVICE_WIDTH) / 3,
        (6 * DEVICE_WIDTH) / 3
      ],
      extrapolate: "clamp"
    });
    const opacity = this.scrollX.interpolate({
      inputRange: [
        (index - 2) * DEVICE_WIDTH,
        (index - 1) * DEVICE_WIDTH,
        index * DEVICE_WIDTH,
        (index + 1) * DEVICE_WIDTH,
        (index + 2) * DEVICE_WIDTH
      ],
      outputRange: [0.5, 0.5, 1, 0.5, 0.5],
      extrapolate: "clamp"
    });

    return (
      <Animated.View
        style={[
          styles.topItemContainer,
          { transform: [{ translateY }, { translateX }], opacity }
        ]}
      >
        <View style={styles.topItem} />
      </Animated.View>
    );
  };

  _renderBottomItem = (e, index) => {
    const translateY = this.scrollX.interpolate({
      inputRange: [
        (index - 1.5) * DEVICE_WIDTH,
        index * DEVICE_WIDTH,
        (index + 1.5) * DEVICE_WIDTH
      ],
      outputRange: [DEVICE_HEIGHT / 2, -DEVICE_HEIGHT / 15, DEVICE_HEIGHT / 2],
      extrapolate: "clamp"
    });
    const opacity = this.scrollX.interpolate({
      inputRange: [
        (index - 1) * DEVICE_WIDTH,
        index * DEVICE_WIDTH,
        (index + 1) * DEVICE_WIDTH
      ],
      outputRange: [0, 1, 0],
      extrapolate: "clamp"
    });
    return (
      <Animated.View
        style={[
          styles.bottomItemContainer,
          {
            transform: [{ translateY }],
            opacity
          }
        ]}
      >
        <Text style={styles.title}>{mockTitles[index].toUpperCase()}</Text>
        <Text style={styles.content}>
          {`${mockText[(index - 1).mod(20)]}. ${mockText[index]}. ${
            mockText[(index + 1).mod(20)]
          }`}
        </Text>
      </Animated.View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          horizontal
          horizontal={true}
          decelerationRate={0}
          snapToInterval={DEVICE_WIDTH}
          scrollEventThrottle={20}
          snapToAlignment={"center"}
          ref={scrollView => {
            this.scrollView = scrollView;
          }}
          onScroll={Animated.event([
            { nativeEvent: { contentOffset: { x: this.scrollX } } }
          ])}
          style={{ zIndex: 2 }}
        >
          {new Array(20).fill(0).map(this._renderItem)}
        </ScrollView>
        <View style={styles.backgroundWhiteSquare} />
        <View style={styles.backgroundOutlinedSquare} />
        <View style={styles.leftLayer}>
          <View style={styles.arrowContainer}>
            <Text style={styles.leftArrow}>↙</Text>
          </View>
        </View>
        <View style={styles.rightLayer}>
          <View style={styles.arrowContainer}>
            <Text style={styles.rightArrow}>↗</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { backgroundColor: "#C2718C", alignItems: "center" },
  content: {
    color: "black",
    fontSize: 16,
    width: (2 * DEVICE_WIDTH) / 3,
    textAlign: "justify",
    lineHeight: 25
  },
  itemContainer: {
    alignItems: "center",
    justifyContent: "flex-end",
    height: DEVICE_HEIGHT
  },
  backgroundWhiteSquare: {
    position: "relative",
    bottom: (1.35 * DEVICE_WIDTH) / 2,
    transform: [{ rotate: "45deg" }],
    backgroundColor: "white",
    width: 1.5 * DEVICE_WIDTH,
    height: 1.5 * DEVICE_WIDTH,
    zIndex: 1
  },
  backgroundOutlinedSquare: {
    position: "relative",
    bottom: 2.85 * DEVICE_WIDTH,
    transform: [{ rotate: "45deg" }],
    borderColor: "white",
    borderWidth: 1,
    width: 1.5 * DEVICE_WIDTH,
    height: 1.5 * DEVICE_WIDTH
  },
  bottomItemContainer: {
    position: "relative",
    width: DEVICE_WIDTH - 32,
    height: DEVICE_HEIGHT / 3 - 32,
    margin: 16,
    alignItems: "center"
  },
  topItemContainer: {
    position: "relative",
    width: DEVICE_WIDTH / 2,
    height: DEVICE_WIDTH / 2,
    margin: 16,
    alignItems: "center",
    justifyContent: "center"
  },
  topItem: {
    width: (0.8 * DEVICE_WIDTH) / 2,
    height: (0.8 * DEVICE_WIDTH) / 2,
    backgroundColor: "white",
    transform: [{ rotate: "45deg" }]
  },
  title: { color: "black", fontSize: 36, marginBottom: 8 },
  rightLayer: {
    width: DEVICE_WIDTH,
    height: DEVICE_WIDTH,
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    left: (DEVICE_WIDTH * 1.4) / 2,
    top: (1.2 * DEVICE_WIDTH) / 4,
    transform: [{ rotate: "45deg" }]
  },
  leftLayer: {
    width: DEVICE_WIDTH,
    height: DEVICE_WIDTH,
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    right: (DEVICE_WIDTH * 1.4) / 2,
    top: (1.2 * DEVICE_WIDTH) / 4,
    transform: [{ rotate: "45deg" }]
  },
  arrowContainer: {
    width: DEVICE_WIDTH / 1.9,
    height: DEVICE_WIDTH / 1.9,
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "black"
  },
  leftArrow: {
    color: "white",
    position: "absolute",
    top: 0,
    right: 10,
    fontSize: 36
  },
  rightArrow: {
    color: "white",
    position: "absolute",
    bottom: 0,
    left: 10,
    fontSize: 36
  }
});
