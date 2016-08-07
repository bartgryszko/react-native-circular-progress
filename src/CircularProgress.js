import React, { PropTypes } from 'react';
import { View, Platform } from 'react-native';
import Svg, { G, Path } from 'react-native-svg';

export default class CircularProgress extends React.Component {

  polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;

    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  }

  circlePath(x, y, radius, startAngle, endAngle) {
    const start = this.polarToCartesian(x, y, radius, endAngle);
    const end = this.polarToCartesian(x, y, radius, startAngle);

    const arcSweep = endAngle - startAngle <= 180 ? '0' : '1';

    const d = [
      'M', start.x, start.y,
      'A', radius, radius, 0, arcSweep, 0, end.x, end.y
    ].join(' ');

    return d;
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
    const { size, width, tintColor, backgroundColor, rotation, style, children } = this.props;
    const backgroundPath = this.circlePath(size / 2, size / 2, size / 2 - width / 2, 0, 360);

    const fill = this.extractFill((this.props.fill === 100) ? 99.999 : this.props.fill);
    const circlePath = this.circlePath(size / 2, size / 2, size / 2 - width / 2, 0, 360 * fill / 100);

    return (
      <View style={style}>
        <Svg
          width={size}
          height={size}
        >
          <G
            rotate={rotation - 90}
            originX={(size / 2)}
            originY={(size / 2)}
          >
            <Path
              d={backgroundPath}
              stroke={backgroundColor}
              strokeWidth={width}
              fill="none"
            />
            <Path
              d={circlePath}
              stroke={tintColor}
              strokeWidth={width}
              strokeLinecap="butt"
              fill="none"
            />
          </G>
        </Svg>
        {
          children && children(fill)
        }
      </View>
    );
  }

}

CircularProgress.propTypes = {
  backgroundColor: PropTypes.string,
  children: PropTypes.func,
  fill: PropTypes.number.isRequired,
  rotation: PropTypes.number,
  size: PropTypes.number.isRequired,
  style: View.propTypes.style,
  tintColor: PropTypes.string,
  width: PropTypes.number.isRequired
};

CircularProgress.defaultProps = {
  tintColor: 'black',
  backgroundColor: '#e4e4e4',
  rotation: 90
};
