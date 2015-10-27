import React, { View, PropTypes, ReactNativeART } from 'react-native';
import { Surface, Shape } from '../../react-native/Libraries/ART/ReactNativeART';
import MetricsPath from 'art/metrics/path';


export default class CircularProgress extends React.Component {

  circlePath(cx, cy, r) {
    return `M ${cx} ${cy}`
      + `m ${r}, 0`
      + `a ${r},${r} 0 1,1 -${r * 2},0`
      + `a ${r},${r} 0 1,1 ${r * 2},0`;
  }

  extractFill(fill) {
    if (fill < 0.01) {
      return 0;
    } else if (fill > 100) {
      return 100;
    }

    return fill;
  }

  render() {
    const { size, width, tintColor, backgroundColor, style, children } = this.props;

    const circlePath = this.circlePath(size / 2, size / 2, size / 2 - width / 2);
    const pathMetrics = MetricsPath(circlePath);
    const fill = this.extractFill(this.props.fill);

    return (
      <View style={style}>
        <Surface
          width={size}
          height={size}>
          <Shape d={circlePath}
            stroke={backgroundColor}
            strokeCap="butt"
            strokeDash={[pathMetrics.length, 700]}
            strokeWidth={width} />
          <Shape d={circlePath}
            stroke={tintColor}
            strokeCap="butt"
            strokeDash={[pathMetrics.length * fill / 100, 700]}
            strokeWidth={width} />
        </Surface>
        {
          children && children(fill)
        }
      </View>
    )
  }
}

CircularProgress.propTypes = {
  style: PropTypes.object,
  size: PropTypes.number.isRequired,
  fill: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  tintColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  children: PropTypes.func
}

CircularProgress.defaultProps = {
  tintColor: 'black',
  backgroundColor: '#e4e4e4'
}
