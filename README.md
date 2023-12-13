# smooth-horizontal-scroll-slider

[![NPM version][npm-image]][npm-url]
[![License][github-license]][github-license-url]

"Smooth Horizontal Scroll Slider" is a lightweight npm package designed for React projects with TypeScript. It seamlessly integrates smooth horizontal scrolling in vertical containers, simplifying dynamic layouts and enhancing UI animations. The package includes a scroll progress bar for visual position indication in the horizontal scroll.

Notably, the package allows for each slide to have dynamic sizes, providing flexibility in adjusting the appearance of individual slides. Another key feature is the control over tracking the active state of each slide, enabling you to manage and control slide activation, performing UI animations.

[**Live Demo**](https://smooth-horizontal-scroll-slider.vercel.app/)

## Installation:

```bash
npm i smooth-horizontal-scroll-slider
```

or

```bash
yarn add smooth-horizontal-scroll-slider
```

## Usage :

Add `Shss, ShssWrapper and ShssSlide` to your component:

```js
import { Shss, ShssWrapper, ShssSlide } from 'smooth-horizontal-scroll-slider'

export const MyComponent = () => {
    return (
        <Shss>
            <ShssWrapper>
                <ShssSlide>Slide One</ShssSlide>
                <ShssSlide>Slide Two</ShssSlide>
                <ShssSlide>Slide Three</ShssSlide>
            </ShssWrapper>
        </Shss>
    );
}
```

## Props

### Shss:

- **`speed`**: 
  - Description: The speed property, starting at 1, accelerates browser scrolling proportionally with higher values, such as 2 representing twice the default browser speed.
  - Type: Number
  - Default value: `1`

- **`progressBar`**: 
  - Description: Object with properties for the progress bar.
  - Type: Object
  - Properties:
    - **`show`**:
      - Description: Whether to display the progress bar
      - Type: Boolean
      - Default value: `true`
    - **`position`**:
      - Description: Position of the progress bar
      - Type: `'top' | 'bottom'`
      - Default value: `'top'`

### ShssWrapper:

- **`direction`**: 
  - Description: Direction of the scroll.
  - Type: `'ltr' | 'rtl'`
  - Default value: `'ltr'`



[npm-url]: https://www.npmjs.com/package/smooth-horizontal-scroll-slider
[npm-image]: https://img.shields.io/npm/v/smooth-horizontal-scroll-slider
[github-license]: https://img.shields.io/github/license/davidsavaneli/smooth-horizontal-scroll-slider
[github-license-url]: https://github.com/davidsavaneli/smooth-horizontal-scroll-slider/blob/master/LICENSE
