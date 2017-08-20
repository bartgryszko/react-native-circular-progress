import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Surface, Shape, Path, Group, Filter } from '../../react-native/Libraries/ART/ReactNativeART';
import MetricsPath from 'art/metrics/path';

export default class CircularProgress extends React.Component {

  circlePath(cx, cy, r, startDegree, endDegree) {

    let p = Path();
    p.path.push(0, cx + r, cy);
    p.path.push(4, cx, cy, r, startDegree * Math.PI / 180, endDegree * Math.PI / 180, 1);

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
    const { size, width, tintColor, backgroundColor, style, rotation, linecap, arcSweepAngle, children, capWidth, capColor, strokeCap } = this.props;
      const borderWidth = capWidth > width ? capWidth : width;
      const radius = (size-borderWidth)/2;
      const center = size/2;
    const backgroundPath = this.circlePath(size / 2, size / 2, size / 2 - width / 2, 0, arcSweepAngle * .9999);

    const fill = this.extractFill(this.props.fill);
    const circlePath = this.circlePath(size / 2, size / 2, size / 2 - width / 2, 0, (arcSweepAngle * .9999) * fill / 100);

      const radian = Math.PI * fill/50;
      const capX = radius * Math.cos(radian) + center;
      const capY = radius * Math.sin(radian) + center;

    return (
      <View style={style}>
        <Surface
          width={size}
          height={size}>
          <Group rotation={rotation+(360-arcSweepAngle)/2} originX={center} originY={center}>
            <Shape d={backgroundPath}
                   stroke={backgroundColor}
                   strokeWidth={width}
                   strokeCap={linecap}/>
            <Shape d={circlePath}
                   stroke={tintColor}
                   strokeWidth={width}
                   strokeCap={linecap}/>
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
  capColor: PropTypes.string,
  capWidth: PropTypes.number,
  tintColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  rotation: PropTypes.number,
  linecap: PropTypes.string,
  children: PropTypes.func,
  arcSweepAngle: PropTypes.number
}

CircularProgress.defaultProps = {
  tintColor: 'black',
  backgroundColor: '#e4e4e4',
  rotation: 90,
  linecap: 'butt',
  arcSweepAngle: 360,
    capColor: 'black',
    capWidth: 0
}
