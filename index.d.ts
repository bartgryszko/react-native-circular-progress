declare module 'react-native-circular-progress' {
  import * as React from 'react';
  import {
    Animated,
    EasingFunction,
    StyleProp,
    ViewStyle
  } from 'react-native';

  export interface AnimatedCircularProgressProps extends CircularProgressProps {

    /**
     * Angle from which the progress starts from
     *
     * @type {number}
     * @default 90
     */
    rotation?: number;

    /**
     * Initial fill-value before animation starts
     *
     * @type {number}
     * @default 0
     */
    prefill?: number;

    /**
     * Duration of animation in ms
     *
     * @type {number}
     * @default 500
     */
    duration?: number;

    /**
     * Delay of animation in ms
     *
     * @type {number}
     * @default 0
     */
    delay?: number;

    /**
     *
     * @type {Function}
     * @default Easing.out(Easing.ease)
     */
    easing?: EasingFunction;

    /**
     * Function that's invoked when the animation completes (both on mount and if called with .animate())
     *
     */
    onAnimationComplete?: (event: { finished: boolean }) => void;
  }

  export class AnimatedCircularProgress extends React.Component<
    AnimatedCircularProgressProps
  > {
    /**
     * Animate the progress bar to a specific value
     *
     * @param {number} toVal
     * @param {number} duration
     * @param {Function} ease
     */
    animate: (toVal: number, duration: number, ease?: EasingFunction) => Animated.CompositeAnimation;

    /**
     * Re-run animation with a specified prefill-value
     *
     * @param {number} prefill
     * @param {number} toVal
     * @param {number} duration
     * @param {Function} ease
     */
    reAnimate: (
      prefill: number,
      toVal: number,
      duration: number,
      ease?: EasingFunction
    ) => void;
  }

  export interface CircularProgressProps {
    /**
     * Style of the entire progress container
     *
     * @type {StyleProp<ViewStyle>}
     */
    style?: StyleProp<ViewStyle>;
    /**
     * Width and height of circle
     *
     * @type {number | Animated.Value}
     */
    size: number | Animated.Value;

    /**
     * Thickness of the progress line
     *
     * @type {number}
     */
    width: number;

    /**
     * Current progress / fill
     *
     * @type {number}
     */
    fill: number;

    /**
     * Thickness of background circle
     *
     * @type {number}
     * @default width
     */
    backgroundWidth?: number;

    /**
     * Color of the progress line
     *
     * @type {string}
     * @default 'black'
     */
    tintColor?: string;


    /**
     * Current progress / tint transparency
     *
     * @type {boolean}
     * @default true
     */
    tintTransparency?: boolean;

    /**
     * If unspecified, no background line will be rendered
     *
     * @type {string}
     */
    backgroundColor?: string;

    /**
     * Angle from which the progress starts from
     *
     * @type {number}
     * @default 90
     */
    rotation?: number;

    /**
     * Shape used at ends of progress line.
     *
     * @type {('butt' | 'round' | 'square')}
     * @default 'butt'
     */
    lineCap?: 'butt' | 'round' | 'square';

    /**
     * Shape used at ends of progress line.
     *
     * @type {('butt' | 'round' | 'square')}
     * @default lineCap - which is 'butt'
     */
    fillLineCap?: 'butt' | 'round' | 'square';

    /**
     * If you don't want a full circle, specify the arc angle
     *
     * @type {number}
     * @default 360
     */
    arcSweepAngle?: number;

    /**
     * Pass a function as a child. It receiveds the current fill-value as an argument
     *
     * @type {Function}
     * @param {number} fill current fill-value
     * @return {JSX.Element} the element inside the circle
     */
    children?: ((fill: number) => JSX.Element) | React.ReactChild;

    /**
     * Style of the children container
     *
     * @type {StyleProp<ViewStyle>}
     */
    childrenContainerStyle?: StyleProp<ViewStyle>;

    /**
     * Padding applied around the circle to allow for a cap that bleeds outside its boundary
     *
     * @type {number}
     * @default 0
     */
    padding?: number;

    /**
     * Function that's invoked during rendering to draw at the tip of the progress circle
     *
     */
    renderCap?: (payload: {
      center: { x: number; y: number };
    }) => React.ReactNode;

    /**
     * Use dashed type for tint/progress line
     *
     * @type { width: number; gap: number }
     * @default '{ width: 0, gap: 0 }'
     */
    dashedTint?: { width: number; gap: number };

    /**
     * Use dashed type for background
     *
     * @type { width: number; gap: number }
     * @default '{ width: 0, gap: 0 }'
     */
    dashedBackground?: { width: number; gap: number };
  }

  export class CircularProgress extends React.Component<CircularProgressProps> {

  }
}
