import React, { AppRegistry, StyleSheet, Text, View, PanResponder } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

const MAX_POINTS = 500;

class ProgressChart extends React.Component {

  constructor() {
    super();
    this.state = {
      isMoving: false,
      pointsDelta: 0,
      points: 325
    };
  }

  componentWillMount() {
    console.log('WILL MOUNT');

    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        this.setState({ isMoving: true, pointsDelta: 0 });
      },

      onPanResponderMove: (evt, gestureState) => {
        // For each 2 pixels add or subtract 1 point
        this.setState({ pointsDelta: Math.round(-gestureState.dy / 2) });
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        let points = this.state.points + this.state.pointsDelta;
        console.log(Math.min(points, MAX_POINTS));
        this.setState({
          isMoving: false,
          points: points > 0 ? Math.min(points, MAX_POINTS) : 0,
          pointsDelta: 0
        });
      },
    });
  }

  render() {
    const fill = this.state.points / MAX_POINTS * 100;

    return (
      <View
        style={styles.container}
        {...this._panResponder.panHandlers}>
        <AnimatedCircularProgress
          size={200}
          width={3}
          fill={fill}
          tintColor="#00e0ff"
          backgroundColor="#3d5875">
          {
            (fill) => (
              <Text style={styles.points}>
                { Math.round(MAX_POINTS * fill / 100) }
              </Text>
            )
          }
        </AnimatedCircularProgress>

        <AnimatedCircularProgress
          size={120}
          width={15}
          fill={fill}
          tintColor="#00e0ff"
          backgroundColor="#3d5875" />

        <AnimatedCircularProgress
          size={100}
          width={25}
          fill={fill}
          tintColor="#00e0ff"
          backgroundColor="#3d5875" />

        <Text style={[styles.pointsDelta, this.state.isMoving && styles.pointsDeltaActive]}>
          { this.state.pointsDelta >= 0 && '+' }
          { this.state.pointsDelta }
        </Text>
      </View>
  )
  }
}

const styles = StyleSheet.create({
  points: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 72,
    left: 56,
    width: 90,
    textAlign: 'center',
    color: '#7591af',
    fontSize: 50,
    fontWeight: "100"
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#152d44',
    padding: 50
  },
  pointsDelta: {
    color: '#4c6479',
    fontSize: 50,
    fontWeight: "100"
  },
  pointsDeltaActive: {
    color: '#fff',
  }
});

AppRegistry.registerComponent('ProgressChart', () => ProgressChart);
