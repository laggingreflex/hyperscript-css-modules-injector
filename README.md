# hyperscript-css-modules-injector
[![npm](https://img.shields.io/npm/v/hyperscript-css-modules-injector.svg)](https://www.npmjs.com/package/hyperscript-css-modules-injector)

Automatically transform this:

```js
import h from 'preact-hyperscript-h'
import style from './style.styl'

h('div.class', {}, ...)
```

into this:

```js
import h from 'preact-hyperscript-h'
import style from './style.styl'

h(`div.class.${style['class']}`, {}, ...)
```

with this webpack loader!

It adds CSS Modules's classnames exported from style file automatically to the hyperscript's tag (1st) argument.

## Install

```
npm i hyperscript-css-modules-injector
```

## Usage

In your **`webpack.config.js:`**

```
{
  loaders: [{
    test: /\.js$/,
    include: sourceDir,
    loader: [
      'babel-loader',
      'hyperscript-css-modules-injector',
    ],
  }]
}

```
In your component

```
├───index.js
└───style.styl
```
**Make sure** your **`index.js`** imports **`style.styl`** (possible extensions: `/.*(?css|sass|less|styl)/`) **as** **`style`** and **uses** **`h`** (**from [preact-hyperscript]**), exactly like this:

```
import {createElement as h} from 'preact-hyperscript';
import style from './style.styl';

export default h('div.class', {}, [...])
```

### Detailed usage

If you're using `preact-hyperscript` and CSS with webpack like this:

**`some-component.js:`**
```
import {createElement as h} from 'preact-hyperscript';
import style from './style.styl';

export default h('div.class', {}, [...])
```
**`style.styl:`**
```styl
.class
  background: yellow
```

And you've configured you css-loader in webpack to use CSS Modules (`modules: true`) then you'll know that you have to somehow assign the value of `style.class` in your js file as a class name in your hyperscript component. Either by simply doing `h('div', {class: style.class}, [...])` or by using things like [hyperstyles] \(or [hyperstyles-loader]) (or in React/JSX you may have used [react-css-modules]).

This module tries to transparently apply the classname in your component with a simple regex-replace (at least for now).

So the above would be transformed to:

**`some-component.js:`**
```
import {createElement as h} from 'preact-hyperscript';
import style from './style.styl';

export default h(`div.class.${style.class}`, {}, [...])
```

It automatically transforms **`h('div.class')`** into <strong><code>h(\`div.class.${style['class']}`)</code></strong>

Right now it's logic is very simple. It replaces `/h('(.*)\.(.*)')/g` to <code>h(\`$1.${style.$2}`)</code> in regex.



## Future plans

* More versatile syntax parsing. Currently it only replaces `h('<tagname>.<class>')`. There may be loads of different use cases.
* Make it work with [hyperscript]. Currently it only works if `h` can parse classnames from 1st argument ([preact-hyperscript]).

## Other solutions:

* [hyperstyles] \(too much prerequisite (see [hyperstyles-loader]))
* [hyperstyles-loader] \(would cause issues server-side, when style files are set to be ignored)
* [react-css-modules] \(not for hyperscript)

[preact-hyperscript]: https://github.com/queckezz/preact-hyperscript
[hyperscript]: https://github.com/hyperhype/hyperscript
[hyperstyles]: https://github.com/colingourlay/hyperstyles
[hyperstyles-loader]: https://github.com/dtinth/hyperstyles-loader
[react-css-modules]: https://github.com/gajus/react-css-modules

