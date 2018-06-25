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

  pointPath(circlePath, cx, cy, r, width, startDegree, endDegree) {
    const {x1, y1, x2, y2, x3, y3} = this.getPointPoints(circlePath, cx, cy, r, width, startDegree, endDegree);

    const p = Path();
    p.moveTo(x1, y1);
    p.lineTo(x2, y2);
    p.lineTo(x3, y3);
    p.lineTo(x1, y1);
    return p;
  }

  getPointPoints(circlePath, cx, cy, r, width, startDegree, endDegree) {
    // get the ending point of the circle
    let aDeg = endDegree - startDegree;
    if (aDeg >= 360) {
      aDeg -= 360;
    }
    const aRad = aDeg * Math.PI / 180;
    const px = cx + (r * Math.cos(aRad));
    const py = cy + (r * Math.sin(aRad));

    // get the radius line between the center of the circle and the ending point
    const {rise, run} = this.getSlope(cx, cy, px, py);
    const slope = rise / (run || 0.0000000001);
    const b = -(slope*cx) + cy;

    // get the two points half the width away from the center along the radius line
    const bump = this.getXBump((width - 2) / 2, slope);
    const x1 = px + bump;
    const x2 = px - bump;
    const y1 = (slope*x1) + b;
    const y2 = (slope*x2) + b;

    const {tx, ty} = this.getTriangleTip(x1, y1, x2, y2, rise, run, width/2, aDeg <= 180);
    const x3 = tx, y3 = ty;

    return {x1, y1, x2, y2, x3, y3};
  }

  // for getting a point a certain distance away
  // x = x_0 +- getXBump(distance, slope);
  getXBump(distance, slope) {
    return distance / (Math.sqrt(1 + Math.pow(slope, 2)));
  }

  getTriangleTip(x1, y1, x2, y2, rise, run, height, up) {
    // midpoint between the base points
    const mx = (x1 + x2) / 2;
    const my = (y1 + y2) / 2;

    // perpendicular line
    const pslope = -1 * run / (rise || 0.0000000001);
    const b = -(pslope*mx) + my;

    // point distance away
    let bump = this.getXBump(height, pslope);
    if (up) {
      bump = -1 * bump;
    }
    const tx = mx + bump;
    const ty = (pslope*tx) + b;

    return {tx, ty};
  }

  getSlope(cx, cy, px, py) {
    const rise = cy - py;
    const run = cx - px;
    const slope = this.reduce(rise, run);
    return {rise: slope[0], run: slope[1]};
  }

  reduce(numerator,denominator){
    const getgcd = (a,b) => {
      return b ? getgcd(b, a%b) : a;
    };
    const gcd = getgcd(numerator,denominator);
    return [numerator/gcd, denominator/gcd];
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

    const halfSize = size / 2;
    const angleFill = arcSweepAngle * this.clampFill(fill) / 100;
    const backgroundPath = this.circlePath(halfSize, halfSize, halfSize - width / 2, 0, arcSweepAngle);
    const circlePath = this.circlePath(halfSize, halfSize, halfSize - width / 2, 0, angleFill);
    const pointPath = lineCap == 'point' && this.pointPath(circlePath, halfSize, halfSize, halfSize - width / 2, width, 0, angleFill);
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
    };

    return (
      <View style={style}>
        <Svg
          width={size}
          height={size}
          style={{ backgroundColor: 'transparent' }}
        >
          <G rotation={rotation} originX={size/2} originY={size/2}>
            { backgroundColor && (
              <Path
                d={backgroundPath}
                stroke={backgroundColor}
                strokeWidth={backgroundWidth || width}
                strokeCap={lineCap}
                fill="transparent"
              />
            )}
            <Path
              d={circlePath}
              stroke={tintColor}
              strokeWidth={width}
              strokeCap={lineCap}
              fill="transparent"
            />
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
