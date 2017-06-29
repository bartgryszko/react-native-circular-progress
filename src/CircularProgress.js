import React, { PropTypes } from 'react';
import { View, Platform } from 'react-native';
import { Surface, Shape, Path, Group } from '../../react-native/Libraries/ART/ReactNativeART';
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
    const { size, width, tintColor, backgroundColor, style, rotation, linecap, children } = this.props;
    const backgroundPath = this.circlePath(size / 2, size / 2, size / 2 - width / 2, 0, 360 * 99.9 / 100);

    const fill = this.extractFill(this.props.fill);    
    const circlePath = this.circlePath(size / 2, size / 2, size / 2 - width / 2, 0, (360 * .99) * fill / 100);

    return (
      <View style={style}>
        <Surface
          width={size}
          height={size}>
          <Group rotation={rotation - 90} originX={size/2} originY={size/2}>
            <Shape d={backgroundPath}
                   stroke={backgroundColor}
                   strokeWidth={width}/>
            <Shape d={circlePath}
                   stroke={tintColor}
                   strokeWidth={width}
                   strokeCap={linecap}/>
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
  tintColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  rotation: PropTypes.number,
  linecap: PropTypes.string,
  children: PropTypes.func
}

CircularProgress.defaultProps = {
  tintColor: 'black',
  backgroundColor: '#e4e4e4',
  rotation: 90,
  linecap: 'butt'
}
