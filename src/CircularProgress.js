import React, { View, PropTypes } from 'react-native';
import { Surface, Shape, Path, Group } from '../../react-native/Libraries/ART/ReactNativeART';
import MetricsPath from 'art/metrics/path';


export default class CircularProgress extends React.Component {

  circlePath(cx, cy, r) {

    return Path()
      .moveTo(cx, cx)
      .move(r, 0)
      .arc(r * -2, 0, r, r)
      .arc(r * 2, 0, r, r)
      .close();
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
    const { size, width, tintColor, backgroundColor, style, rotation, children } = this.props;

    const circlePath = this.circlePath(size / 2, size / 2, size / 2 - width / 2);
    const fill = this.extractFill(this.props.fill);

    return (
      <View style={style}>
        <Surface
          width={size}
          height={size}>
          <Group rotation={rotation - 90} originX={size/2} originY={size/2}>
            <Shape d={circlePath}
              stroke={backgroundColor}
              strokeCap="butt"
              strokeDash={[(size - width) * Math.PI, 700]}
              strokeWidth={width} />
            <Shape d={circlePath}
              stroke={tintColor}
              strokeCap="butt"
              strokeDash={[(size - width) * Math.PI * fill / 100, 700]}
              strokeWidth={width} />
          </Group>
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
  rotation: PropTypes.number,
  children: PropTypes.func
}

CircularProgress.defaultProps = {
  tintColor: 'black',
  backgroundColor: '#e4e4e4',
  rotation: 90
}
