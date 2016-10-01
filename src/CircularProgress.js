import React, { PropTypes } from 'react';
import { View, Platform } from 'react-native';
import { Surface, Shape, Path, Group } from '../../react-native/Libraries/ART/ReactNativeART';
import MetricsPath from 'art/metrics/path';

export default class CircularProgress extends React.Component {

  circlePath(cx, cy, r, startDegree, endDegree) {

    let p = Path();
    if (Platform.OS === 'ios') {
      p.path.push(0, cx + r, cy);
      p.path.push(4, cx, cy, r, startDegree * Math.PI / 180, endDegree * Math.PI / 180, 1);
    } else {
      // For Android we have to resort to drawing low-level Path primitives, as ART does not support
      // arbitrary circle segments. It also does not support strokeDash.
      // Furthermore, the ART implementation seems to be buggy/different than the iOS one.
      // MoveTo is not needed on Android
      p.path.push(4, cx, cy, r, startDegree * Math.PI / 180, (startDegree - endDegree) * Math.PI / 180, 0);
    }
    return p;
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
    const { size, width, tintColor, backgroundColor, style, rotation, children, capWidth, capColor, strokeCap } = this.props;
    const borderWidth = capWidth > width ? capWidth : width;
    const radius = (size-borderWidth)/2;
    const center = size/2;
    const backgroundPath = this.circlePath(center, center, radius, 0, 360);

    const fill = this.extractFill(this.props.fill);
    const circlePath = this.circlePath(center, center, radius, 0, 360 * fill / 100);

    const radian = Math.PI * fill/50;
    const capX = radius * Math.cos(radian) + center;
    const capY = radius * Math.sin(radian) + center;

    return (
      <View style={style}>
        <Surface
          width={size}
          height={size}>
          <Group rotation={rotation - 90} originX={center} originY={center}>
            <Shape d={backgroundPath}
                   stroke={backgroundColor}
                   strokeWidth={width}/>
            <Shape d={circlePath}
                   stroke={tintColor}
                   strokeWidth={width}
                   strokeCap={strokeCap}/>
           <Shape d={this.circlePath(capX, capY, capWidth/4, 0, 360)}
                   stroke={capColor}
                   strokeWidth={capWidth/2}/>
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
  style: View.propTypes.style,
  size: PropTypes.number.isRequired,
  fill: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  strokeCap: PropTypes.string,
  capColor: PropTypes.string,
  capWidth: PropTypes.number,
  tintColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  rotation: PropTypes.number,
  children: PropTypes.func
}

CircularProgress.defaultProps = {
  tintColor: 'black',
  backgroundColor: '#e4e4e4',
  rotation: 90,
  strokeCap: 'butt',
  capColor: 'black',
  capWidth: 0
}
