# react-native-swipebox

A simple swipe box component. Allows to be fully customizable.

![alt text](https://github.com/flyandi/react-native-swipebox/raw/master/docs/swipebox.gif "react-native-swipebox")


## Installation

**React Native >= 0.49**

```bash
yarn add react-native-swipebox
```

## Attributes

| Prop | Description | Default |
|---|---|---|
|`string` **`backgroundColor`**|Specifies the background color of the component|`#828186`|
|`string` **`borderColor`**|Specifies the border color of the component|`undefined`|
|`number` **`borderWidth`**|Specifies the border width of the component|`undefined`|
|`number` **`borderRadius`**|Specifies the border radius of the component|`3`|
|`string` **`textColor`**|The text color used when strings are rendered|`#ffffff`|
|`number` **`fontSize`**|The font size of the text|`auto`|
|`array/object` **`tiles`**|An array or component object of the tiles to be rendered|`required`|
|`object` **`style`**|A standard style object, refer below for more information|`undefined`|
|`number` **`size`**|The size of each tile. Used when `width` and `height` are not specified.|`120`|
|`number` **`width`**|The width of each tile|`undefined`|
|`number` **`height`**|The height of each tile|`undefined`|

## Events

| Prop | Description |
|---|---|
|**`onChange`**|Executed when the tile was changed. Passes the index in the tiles array and the actual value|
|**`onSwipeDown`**|Executed when the user swipes down.|
|**`onSwipeUp`**|Executed when the user swipes up.|


## Examples

Import the component:

```es6
import SwipeBox from 'react-native-swipebox';
```


**Simple Example**

```es6
<SwipeBox
    tiles={[12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
    onChange={(index, value) => console.log(index, value)}
/>
```


**Images**

```es6
 <SwipeBox
    tiles={[
        <Image source={{url: 'ok.png'}} />,
        <Image source={{url: 'cancel.png'}} />,
    ]}
    onChange={(index, value) => console.log(index, value)}
/>
```

