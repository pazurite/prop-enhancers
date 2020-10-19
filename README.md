<p align="center">
  <a href="https://github.com/pazurite/prop-enhancers/blob/main/dist/vue-prop-enhancers.js"><img src="https://img.shields.io/bundlephobia/minzip/@pazurite/prop-enhancers" alt="Minified Size"></a>
  <a href="https://github.com/pazurite/prop-enhancers/blob/main/dist/vue-prop-enhancers.js"><img src="https://img.shields.io/bundlephobia/min/@pazurite/prop-enhancers" alt="Minzipped Size"></a>
  <a href="https://www.npmjs.com/package/@pazurite/prop-enhancers"><img src="https://img.shields.io/npm/v/@pazurite/prop-enhancers" alt="Version"></a>
  <a href="https://www.npmjs.com/package/@pazurite/prop-enhancers"><img src="https://img.shields.io/npm/l/@pazurite/prop-enhancers" alt="License"></a>
</p>

# Vue Prop Enhancers

A series of useful enhancements to Vue components props:

- [Enum-type props](#enum-type-props)
- [Numeric-type props](#numeric-type-props)

## Install

### Package

```bash
# yarn
yarn add @pazurite/prop-enhancers

# npm
npm i @pazurite/prop-enhancers
```

## Usage

### Install mixin

#### Globally

```js
// main.js
import Vue from 'vue';
import Enhancers from '@pazurite/prop-enhancers';

Vue.mixin(Enhancers);
```

#### Locally

```js
// Component.vue
import Enhancers from '@pazurite/prop-enhancers';

export default {
  mixins: [Enhancers],
  // ...
};
```

### Enum-type props

To define a enum-type prop, add a `enum` array to its descriptor, and its `default` value will be `enum[0]` if the descriptor doesn't contain `default` attribute. e.g.

#### before

```js
export default {
  props: {
    size: {
      type: String,
      default: 'small',
      validator: (value) => ['small', 'large'].indexOf(value) >= 0,
    },
  },
};
```

#### after

```js
export default {
  props: {
    size: {
      type: String,
      enum: ['small', 'large'],
    },
  },
};
```

### Numeric-type props

To define a numeric-type prop, add `numeric: true` to its descriptor.

#### before

```js
export default {
  props: {
    count: {
      type: [Number, String],
      default: 0,
      validator: (value) => !isNaN(value - parseFloat(value)),
    },
  },
};
```

#### after

```js
export default {
  props: {
    count: {
      numeric: true,
      default: 0,
    },
  },
};
```
