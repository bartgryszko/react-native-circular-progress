import React from 'react';
import PropTypes from 'prop-types';
import {
  Animated,
  AppState,
  Easing,
  View,
  ViewPropTypes
} from 'react-native';
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
    this.performTimingAnimation(this.props.fill,this.props.duration);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.fill !== this.props.fill) {
      this.animateFill();
      this.performTimingAnimation(this.props.fill,this.props.duration);
    }
  }

  animateFill() {
    const { tension, friction, onAnimationComplete } = this.props;

    Animated.spring(
      this.state.chartFillAnimation,
      {
        toValue: this.props.fill,
        tension,
        friction
      }
    ).start(onAnimationComplete);
  }

  performTimingAnimation(toValue, duration, easing = Easing.linear) {
    const { onLinearAnimationComplete } = this.props;

    Animated.timing(this.state.chartFillAnimation, {
      toValue: toValue,
      easing: easing,
      duration: duration
    }).start(onLinearAnimationComplete);
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
  duration: PropTypes.number,
  prefill: PropTypes.number,
  width: PropTypes.number.isRequired,
  tintColor: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  backgroundColor: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  tension: PropTypes.number,
  friction: PropTypes.number,
  onAnimationComplete: PropTypes.func,
  onLinearAnimationComplete: PropTypes.func,
}

AnimatedCircularProgress.defaultProps = {
  tension: 7,
  friction: 10
};
