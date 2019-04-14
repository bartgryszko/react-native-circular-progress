declare module 'react-native-circular-progress' {
  import React from 'react';
  import { Animated, Easing } from 'react-native';

  export interface AnimatedCircularProgressProps {
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
     * Thickness of background circle
     * 
     * @type {number}
     * @default width
     */
    backgroundWidth?: number;

    /**
     * Current progress / fill
     * 
     * @type {number}
     * @default 0
     */
    fill?: number;

    /**
     * Color of the progress line
     * 
     * @type {string}
     * @default 'black'
     */
    tintColor?: string;

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
    children?: (fill: number) => JSX.Element;

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
     * 
     * @type {Function}
     * @default Easing.out(Easing.ease)
     */
    easing?: () => void;

    /**
     * Function that's invoked when the animation completes (both on mount and if called with .animate())
     * 
     */
    onAnimationComplete?: () => void
  }

  export class AnimatedCircularProgress extends React.Component<AnimatedCircularProgressProps> {
    /**
     * Animate the progress bar to a specific value
     * 
     * @param {number} toVal 
     * @param {number} duration
     * @param {Function} ease
     */
    animate: (toVal: number, duration: number, ease: Function) => void

    /**
     * Re-run animation with a specified prefill-value
     * 
     * @param {number} prefill
     * @param {number} toVal
     * @param {number} duration
     * @param {Function} ease
     */
    reAnimate: (prefill: number, toVal: number, duration: number, ease: Function) => void
  }
}