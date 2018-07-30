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

export default class AnimatedCircularProgress extends React.PureComponent {
  constructor(props) {
    super(props);
    this.timingFunction = null;
    this.state = {
      fillAnimation: new Animated.Value(props.prefill)
    }
  }

  componentDidMount() {
    this.animate();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.fill !== this.props.fill) {
      this.animate();
    }
    if (prevProps.prefill !== this.props.prefill) {
      this.state.fillAnimation.setValue(this.props.prefill);
    }
  }

  animate(toVal, dur, ease) {
    const toValue = toVal || this.props.fill;
    const duration = dur || this.props.duration;
    const easing = ease || this.props.easing;

    this.timingFunction = Animated.timing(this.state.fillAnimation, {
      toValue,
      easing,
      duration,
    });
    
    this.timingFunction.start(this.props.onAnimationComplete);
    
    return this.timingFunction;
  }
  
  setAnimatedValue(value) {
    this.state.fillAnimation.setValue(value);
  }
  
  stopAnimation() {
    if(this.timingFunction) this.timingFunction.stop();
  }

  render() {
    const { fill, prefill, ...other } = this.props;

    return (
      <AnimatedProgress
        {...other}
        fill={this.state.fillAnimation}
      />
    );
  }
}

AnimatedCircularProgress.propTypes = {
  ...CircularProgress.propTypes,
  prefill: PropTypes.number,
  duration: PropTypes.number,
  easing: PropTypes.func,
  onAnimationComplete: PropTypes.func,
};

AnimatedCircularProgress.defaultProps = {
  duration: 500,
  easing: Easing.out(Easing.ease),
  prefill: 0,
};
