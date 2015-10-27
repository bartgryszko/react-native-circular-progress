# react-native-circular-progress

React Native component for creating animated, circular progress with ReactART. Useful for displaying users points for example.


## Installation

1. Install library `npm i --save react-native-circular-progress`
2. Link ART library to your ReactNative project ([how to link a library?](https://facebook.github.io/react-native/docs/linking-libraries-ios.html#content)). You'll find ReactART library in `node_modules/react-native/Libraries/ART/ART.xcodeproj`

## Usage

Import CircularChart or AnimatedCircularChart.

```js
import { AnimatedCircularChart } from 'react-native-progress-chart';
```

Use as follows:

```jsx
<AnimatedCircularChart
  size={120}
  width={15}
  fill={100}
  tintColor="#00e0ff"
  backgroundColor="#3d5875" />
```

You can also define a function, that'll receive current progress and for example display it inside the circle:

```jsx
<AnimatedCircularChart
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
</AnimatedCircularChart>
```

## Configuration

You can configure the passing by following props:

- **size** – width and height of the circle
- **width** - thickness of the line
- **fill** - current, percentage fill (from 0 to 100)
- **tintColor** - color of a progress line
- **backgroundColor** - color of a background for progress line
- **children(fill)** - you can pass function as a child to receive current fill


## Working example

You can find working example in the `example` directory of this repository. You can run it by:

```sh
git clone https://github.com/bgryszko/react-native-circular-progress.git
cd  react-native-circular-progress/example/ProgressChart
npm install
open ios/ProgressChart.xcodeproj
```
XCode will open. Click Run button and that's it.

## Screenshot of the example
![image](screenshot.gif)

## Special thanks
Special thanks to [Chalk+Chisel](http://chalkchisel.com) for creating working environment where people grow. This component was created for one of the projects we're working on.
