
import React from 'react';
import PropTypes from 'prop-types';
import { View, ViewPropTypes, Platform, ART } from 'react-native';
const { Surface, Shape, Path, Group } = ART;
import MetricsPath from 'art/metrics/path';

export default class CircularProgress extends React.Component {

  circlePath(cx, cy, r, startDegree, endDegree, counterClockwise) {
    let p = Path();
    p.path.push(0, cx + r, cy);
    p.path.push(4, cx, cy, r, startDegree * Math.PI / 180, endDegree * Math.PI / 180, counterClockwise);
    return p;
  }

  extractFill(fill, counterClockwise) {
    if (counterClockwise) {
        return Math.min(100, Math.max(0, fill));
    }

    return -Math.min(100, Math.max(0, fill));
  }

  render() {
    const {
      size,
      counterClockwise,
      width,
      backgroundWidth,
      tintColor,
      backgroundColor,
      style,
      rotation,
      linecap,
      children
    } = this.props;

    const counterClockwisePath = (counterClockwise) ? 1 : 0;
    const fill = this.extractFill(this.props.fill, counterClockwisePath);
    const backgroundFill = (counterClockwise) ? 100 : -100;
    const backgroundPath = this.circlePath(size / 2, size / 2, size / 2 - width / 2, 0, (360 * .9999) * backgroundFill / 100, counterClockwisePath);
    const circlePath = this.circlePath(size / 2, size / 2, size / 2 - width / 2, 0, (360 * .9999) * fill / 100, counterClockwisePath);
    const offset = size - (width * 2);

    const childContainerStyle = {
      position: 'absolute',
      left: width,
      top: width,
      width: offset,
      height: offset,
      borderRadius: offset / 2,
      alignItems: 'center',
      justifyContent: 'center'
    }

    return (
      <View style={style}>
        <Surface
          width={size}
          height={size}
        >
          <Group rotation={rotation - 90} originX={size/2} originY={size/2}>
            { backgroundColor !== 'transparent' && (
              <Shape
                d={backgroundPath}
                stroke={backgroundColor}
                strokeWidth={backgroundWidth != null ? backgroundWidth : width}
              />
            )}
            <Shape
              d={circlePath}
              stroke={tintColor}
              strokeWidth={width}
              strokeCap={linecap}
            />
          </Group>
        </Surface>
        {children && (
          <View style={childContainerStyle}>
            {children(fill)}
          </View>
        )}
      </View>
    )
  }
}

CircularProgress.propTypes = {
  style: ViewPropTypes.style,
  counterClockwise: PropTypes.bool,
  size: PropTypes.number.isRequired,
  fill: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  backgroundWidth: PropTypes.number,
  tintColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  rotation: PropTypes.number,
  linecap: PropTypes.string,
  children: PropTypes.func
};

CircularProgress.defaultProps = {
  tintColor: 'black',
  backgroundColor: '#e4e4e4',
  rotation: 90,
  linecap: 'butt'
};
