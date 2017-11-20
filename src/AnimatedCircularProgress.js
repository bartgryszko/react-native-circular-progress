import React from 'react';
import PropTypes from 'prop-types';
import { View, ViewPropTypes, Animated } from 'react-native';
import CircularProgress from './CircularProgress';
const AnimatedProgress = Animated.createAnimatedComponent(CircularProgress);

export default class AnimatedCircularProgress extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      chartFillAnimation: new Animated.Value(props.prefill || 0)
    }
  }

  componentDidMount() {
    this.animateFill();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.fill !== this.props.fill) {
      this.animateFill();
    }
  }

  animateFill() {
    const { tension, friction } = this.props;

    Animated.spring(
      this.state.chartFillAnimation,
      {
        toValue: this.props.fill,
        tension,
        friction
      }
    ).start();
  }

  performLinearAnimation(toValue, duration) {
    Animated.timing(this.state.chartFillAnimation, {
      toValue: toValue,
      duration: duration
    }).start();
  }

  render() {
    const { fill, prefill, ...other } = this.props;

    return (
      <AnimatedProgress
        {...other}
        fill={this.state.chartFillAnimation}
        />
    )
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
}

AnimatedCircularProgress.defaultProps = {
  tension: 7,
  friction: 10
};
