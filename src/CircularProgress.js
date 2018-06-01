
import React from 'react';
import PropTypes from 'prop-types';
import { View, ViewPropTypes, ART, AppState } from 'react-native';
const { Surface, Shape, Path, Group } = ART;

export default class CircularProgress extends React.Component {

  state = {
    // We need to track this to mitigate a bug with RN ART on Android.
    // After being unlocked the <Surface> is not rendered.
    // To mitigate this we change the key-prop to forcefully update the <Surface>
    // It's horrible.
    // See https://github.com/facebook/react-native/issues/17565
    appState: AppState.currentState,
  }

  circlePath(cx, cy, r, startDegree, endDegree) {
    const p = Path();
    p.moveTo(cx + r, cy);
    p.path.push(4, cx, cy, r, startDegree * Math.PI / 180, (endDegree * .9999) * Math.PI / 180, 1);
    return p;
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

  componentDidMount = () => AppState.addEventListener('change', this.handleAppStateChange);

  componentWillUnmount = () => AppState.removeEventListener('change', this.handleAppStateChange);

  handleAppStateChange = appState => this.setState({ appState });

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
      renderChild,
      fill,
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
        <Surface
          width={size}
          height={size}
          key={this.state.appState}
          style={{ backgroundColor: 'transparent' }}
        >
          <Group rotation={rotation - 90} originX={size/2} originY={size/2}>
            { backgroundColor && (
              <Shape
                d={backgroundPath}
                stroke={backgroundColor}
                strokeWidth={backgroundWidth || width}
                strokeCap={lineCap}
              />
            )}
            <Shape
              d={circlePath}
              stroke={tintColor}
              strokeWidth={width}
              strokeCap={lineCap == 'point' ? 'butt' : lineCap}
            />
          { lineCap == 'point' && (
            <Shape
              d={pointPath}
              fill={tintColor}
              stroke={tintColor}
              strokeWidth={1}
            />
          )}
          </Group>
        </Surface>
        {renderChild && (
          <View style={childContainerStyle}>
            {renderChild(fill)}
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
  renderChild: PropTypes.func
};

CircularProgress.defaultProps = {
  tintColor: 'black',
  rotation: 90,
  lineCap: 'butt',
  arcSweepAngle: 360
};
