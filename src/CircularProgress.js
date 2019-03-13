import React from 'react';
import PropTypes from 'prop-types';
import { View, ViewPropTypes } from 'react-native';
import { Svg, Path, G } from 'react-native-svg';

export default class CircularProgress extends React.PureComponent {
  polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians))
    };
  }

  circlePath(x, y, radius, startAngle, endAngle){
    var start = this.polarToCartesian(x, y, radius, endAngle * 0.9999);
    var end = this.polarToCartesian(x, y, radius, startAngle);
    var largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
    var d = [
        'M', start.x, start.y,
        'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ];
    return d.join(' ');
  }

  clampFill = fill => Math.min(100, Math.max(0, fill));

  render() {
    const {
      size,
      width,
      backgroundWidth,
      tintColor,
      backgroundColor,
      style,
      rotation,
      lineCap,
      arcSweepAngle,
      fill,
      children,
    } = this.props;

    const backgroundPath = this.circlePath(size / 2, size / 2, size / 2 - width / 2, 0, arcSweepAngle);
    const circlePath = this.circlePath(size / 2, size / 2, size / 2 - width / 2, 0, arcSweepAngle * this.clampFill(fill) / 100);
    const offset = size - (width * 2);
    const adjustedSize = backgroundWidth > width ? size + width : size;
    const adjustedOrigin = backgroundWidth > width ? width / 2 : 0;
    const adjustedPosition = backgroundWidth > width ? width * 1.5 : width;

    const childContainerStyle = {
      position: 'absolute',
      left: adjustedPosition,
      top: adjustedPosition,
      width: offset,
      height: offset,
      borderRadius: offset / 2,
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden'
    };

    return (
      <View style={style}>
        <Svg
          width={adjustedSize}
          height={adjustedSize}
          style={{ backgroundColor: 'transparent' }}
        >
          <G rotation={rotation} originX={adjustedSize/2} originY={adjustedSize/2}>
            { backgroundColor && (
              <Path
                x={adjustedOrigin}
                y={adjustedOrigin}
                d={backgroundPath}
                stroke={backgroundColor}
                strokeWidth={backgroundWidth || width}
                strokeLinecap={lineCap}
                fill="transparent"
              />
            )}
            {fill > 0 && (
              <Path
                x={adjustedOrigin}
                y={adjustedOrigin}
                d={circlePath}
                stroke={tintColor}
                strokeWidth={width}
                strokeLinecap={lineCap}
                fill="transparent"
              />
            )}
          </G>
        </Svg>
        {children && (
          <View style={childContainerStyle}>
            {children(fill)}
          </View>
        )}
      </View>
    );
  }
}

CircularProgress.propTypes = {
  style: ViewPropTypes.style,
  size: PropTypes.number.isRequired,
  fill: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  backgroundWidth: PropTypes.number,
  tintColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  rotation: PropTypes.number,
  lineCap: PropTypes.string,
  arcSweepAngle: PropTypes.number,
  children: PropTypes.func,
};

CircularProgress.defaultProps = {
  tintColor: 'black',
  rotation: 90,
  lineCap: 'butt',
  arcSweepAngle: 360
};
