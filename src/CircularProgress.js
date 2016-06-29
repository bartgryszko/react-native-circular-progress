import React, { PropTypes } from 'react';
import { View, Platform, Text } from 'react-native';
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
    const { size, width, tintColor, backgroundColor, style, rotation, children } = this.props;
    const backgroundPath = this.circlePath(size / 2, size / 2, size / 2 - width / 2, 0, 360);

    const fill = this.extractFill(this.props.fill);
    const circlePath = this.circlePath(size / 2, size / 2, size / 2 - width / 2, 0, 360 * fill / 100);

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
                   strokeCap="butt"/>
          </Group>
        </Surface>
        {this.renderText()}
        {
          children && children(fill)
        }
      </View>
    )
  }

  renderText() {
    const { size, width, showText, textColor, textStyle } = this.props;
    if(!showText) {
      return null;
    }
    const fill = this.extractFill(this.props.fill);
    const textOffset = width;
    const textSize = size - 2 * textOffset;

    return (
      <View style={{
        position: 'absolute',
        left: textOffset,
        top: textOffset,
        width: textSize,
        height: textSize,
        borderRadius: textSize / 2,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Text style={textStyle}>
        {this.props.formatProgress(fill)}
        </Text>
      </View>
    );
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
  children: PropTypes.func,
  showText: PropTypes.bool,
  formatProgress: PropTypes.func,
  textStyle: Text.propTypes.style,
}

CircularProgress.defaultProps = {
  tintColor: 'black',
  backgroundColor: '#e4e4e4',
  rotation: 90,
  showText: false,
  formatProgress: (text) => {
    return Math.round(text) + '%';
  },
  textStyle: {
    color: 'black',
    fontSize: 18,
  }
}
