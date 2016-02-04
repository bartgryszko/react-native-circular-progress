import React, { PropTypes, Animated } from 'react-native';
import CircularProgress from './CircularProgress';
const AnimatedProgress = Animated.createAnimatedComponent(CircularProgress);

const speedMap = {
  slow: {
    tension: 20,
    friction: 30
  },
  fast: {
    tension: 7,
    friction: 10
  }
};

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
    Animated.spring(
      this.state.chartFillAnimation,
      {
        toValue: this.props.fill,
        ...speedMap[this.props.speed]
      }
    ).start();
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
  style: PropTypes.object,
  size: PropTypes.number.isRequired,
  fill: PropTypes.number.isRequired,
  prefill: PropTypes.number,
  width: PropTypes.number.isRequired,
  tintColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  speed: PropTypes.oneOf(['slow', 'fast'])
}

AnimatedCircularProgress.defaultProps = {
  speed: 'fast'
};
