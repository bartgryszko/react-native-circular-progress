import React from 'react';

import PropTypes from 'prop-types';
import { AppState, View, Animated, ViewPropTypes } from 'react-native';
import CircularProgress from '../node_modules/react-native-circular-progress/src/CircularProgress';

const AnimatedProgress = Animated.createAnimatedComponent(CircularProgress);

export default class AnimatedCircularProgress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      appState: AppState.currentState,
      chartFillAnimation: new Animated.Value(props.prefill || 0)
    };
  }

  componentDidMount() {
    this.animateFill();
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  handleAppStateChange = nextAppState => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      // Fix bug on Android where the drawing is not displayed after the app is
      // backgrounded / screen is turned off. Restart the animation when the app
      // comes back to the foreground.
      this.setState({
        chartFillAnimation: new Animated.Value(this.props.prefill || 0)
      });
      this.animateFill();
    }
    this.setState({ appState: nextAppState });
  };

  componentDidUpdate(prevProps) {
    if (prevProps.fill !== this.props.fill) {
      this.animateFill();
    }
  }

  animateFill() {
    const { tension, friction } = this.props;

    Animated.spring(this.state.chartFillAnimation, {
      toValue: this.props.fill,
      tension,
      friction
    }).start();
  }

  performLinearAnimation(toValue, duration) {
    Animated.timing(this.state.chartFillAnimation, {
      toValue,
      duration
    }).start();
  }

  render() {
    const { fill, prefill, ...other } = this.props;

    return <AnimatedProgress {...other} fill={this.state.chartFillAnimation} />;
  }
}

AnimatedCircularProgress.propTypes = {
  style: ViewPropTypes.style,
  size: PropTypes.number.isRequired,
  fill: PropTypes.number,
  prefill: PropTypes.number,
  width: PropTypes.number.isRequired,
  tintColor: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  backgroundColor: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  tension: PropTypes.number,
  friction: PropTypes.number
};

AnimatedCircularProgress.defaultProps = {
  tension: 7,
  friction: 10
};
