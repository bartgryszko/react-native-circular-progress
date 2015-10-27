import React, { PropTypes, Animated } from 'react-native';
import CircularProgress from './CircularProgress';
const AnimatedProgress = Animated.createAnimatedComponent(CircularProgress);


export default class AnimatedCircularProgress extends React.Component {

  constructor() {
    super();
    this.state = {
      chartFillAnimation: new Animated.Value(0)
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
        tension: 7,
        friction: 10
      }
    ).start();
  }

  render() {
    const { fill, ...other } = this.props;

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
  width: PropTypes.number.isRequired,
  tintColor: PropTypes.string,
  backgroundColor: PropTypes.string
}
