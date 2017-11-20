[![license](https://img.shields.io/github/license/mashape/apistatus.svg)]()
[![Version](https://img.shields.io/npm/v/react-native-circular-progress.svg)](https://www.npmjs.com/package/react-native-circular-progress)
[![npm](https://img.shields.io/npm/dt/react-native-circular-progress.svg)](https://www.npmjs.com/package/react-native-circular-progress)
[![Twitter Follow](https://img.shields.io/twitter/follow/bgryszko.svg?style=social&label=Follow)](https://twitter.com/bgryszko)

# react-native-circular-progress

React Native component for creating animated, circular progress with ReactART. Useful for displaying users points for example. **Works on iOS & Android.**

---
**Looking for a circular slider?** Take a look at my other component – [react-native-circular-slider](https://github.com/bgryszko/react-native-circular-slider) :alarm_clock:

----

## Example app
![image](screenshot.gif)

## Installation

1. Install library `npm i --save react-native-circular-progress`
2. As Expo user you are good to go right now, or alternatively install ART:
3. Link ART library to your ReactNative project ([how to link a library?](https://facebook.github.io/react-native/docs/linking-libraries-ios.html#content)). You'll find ReactART library in `node_modules/react-native/Libraries/ART/ART.xcodeproj`

## Usage

Import CircularProgress or AnimatedCircularProgress.

```js
import { AnimatedCircularProgress } from 'react-native-circular-progress';
```

Use as follows:

```jsx
<AnimatedCircularProgress
  size={120}
  width={15}
  fill={100}
  tintColor="#00e0ff"
  onAnimationComplete={() => console.log('onAnimationComplete')}
  backgroundColor="#3d5875" />
```

You can also define a function, that'll receive current progress and for example display it inside the circle:

```jsx
<AnimatedCircularProgress
  size={200}
  width={3}
  fill={this.state.fill}
  tintColor="#00e0ff"
  backgroundColor="#3d5875">
  {
    (fill) => (
      <Text style={styles.points}>
        { this.state.fill }
      </Text>
    )
  }
</AnimatedCircularProgress>
```

Finally, you can manually trigger a duration-based timing animation by putting a ref on the component and calling the `performLinearAnimation(toValue, duration)` function like so:
```jsx
<AnimatedCircularProgress
  ref='circularProgress'
  ...
/>
```
```javascript
this.refs.circularProgress.performLinearAnimation(100, 8000); // Will fill the progress bar linearly in 8 seconds
```

## Configuration

You can configure the passing by following props:

- **size** – width and height of the circle
- **width** - thickness of the lines
- **backgroundWidth** - thickness of the background line
- **fill** - current, percentage fill (from 0 to 100)
- **prefill** - percentage fill before the animation (from 0 to 100)
- **tintColor** - color of a progress line
- **backgroundColor** - color of a background for progress line
- **rotation** - by default, progress starts from the angle = 90⦝, you can change it by setting value from -360 to 360
- **tension** - the tension value for the spring animation (see [here](https://facebook.github.io/react-native/docs/animations.html#core-api))
- **friction** - the friction value for the spring animation (see [here](https://facebook.github.io/react-native/docs/animations.html#core-api))
- **linecap** - the shape to be used at the ends of the circle. Possible values: butt (default), round or square. (see [here](https://developer.mozilla.org/en/docs/Web/SVG/Attribute/stroke-linecap))
- **children(fill)** - you can pass function as a child to receive current fill
- **onAnimationComplete** - you can pass a callback function that will be invoked when animation is complete. (see [here](https://facebook.github.io/react-native/docs/animated.html#working-with-animations))
- **onLinearAnimationComplete** - you can pass a callback function that will be invoked when linear animation is complete. (see [here](https://facebook.github.io/react-native/docs/animated.html#working-with-animations))

## Running example app

```sh
git clone https://github.com/bgryszko/react-native-circular-progress.git
cd  react-native-circular-progress/example
yarn
yarn start
```

## Author

Bartosz Gryszko (b@gryszko.com)

For new components and updates [follow me on twitter](http://twitter.com/bgryszko).


## License

MIT

## Special thanks
Special thanks to [Chalk+Chisel](http://chalkchisel.com) for creating working environment where people grow. This component was created for one of the projects we're working on.
