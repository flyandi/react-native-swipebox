# react-native-swipebox

A simple swipe box component

![alt text](https://github.com/flyandi/react-native-swipebox/raw/master/docs/default.png "react-native-swipebox")


## Installation

**React Native >= 0.49**

```bash
yarn add react-native-swipebox
```

## Attributes

| Prop | Description | Default |
|---|---|---|
|`string` **`backgroundColor`**|Specifies the background color of the component|`transparent`|
|`string` **`borderColor`**|Specifies the border color of the component|`#828186`|
|`number` **`borderWidth`**|Specifies the border width of the component|`1`|
|`number` **`borderRadius`**|Specifies the border radius of the component|`3`|
|`number` **`contentPadding`**|The text padding between the boxes|`10`
|`string` **`inverseTextColor`**|The text color used when a option is selected|`#ffffff`|
|`array/object` **`options`**|An array or object with the values|`required`|
|`any` **`selected`**|The current selected item|`undefined`|
|`any` **`defaultValue`**|Same as `selected`|`undefined`|
|`object` **`style`**|A standard style object, refer below for more information|`undefined`|
|`string` **`useLabelValue`**|A string indicating which key should be used for the label in an array object.|`undefined`|
|`string` **`useKeyValue`**|A string indicating which key should be used for the key in an array object.|`undefined`|
|`string` **`theme`**|One of the following theme strings: `red`, `yellow`, `blue` or `green`|`undefined`|
|`bool` **`invertKeyLabel`**|If true the label becomes the key and the key becomes the label|`false`|

## Events

| Prop | Description |
|---|---|
|**`onChange`**|Executed when another option value was selected|


## Examples

Import the component:

```es6
import OptionGroup from 'react-native-optiongroup';
```


**Array Options**

```es6
<OptionGroup
    options={['Yes', 'No', 'Maybe']}
    onChange={(value) => console.log(value, 'selected')}
/>
```


**Object Options**

```es6
<OptionGroup
    options={{'Yes': 0, 'No': 1, 'Maybe': 2}}
    onChange={(value) => console.log(value, 'selected')}
/>
```


**Complex Object Options**

```es6
<OptionGroup
    options={[
    	{
    		'answerResult': 0,
    		'label': 'Yes'
    	},
    	{
    		'answerResult': 1,
    		'label': 'No'
    	},
    	{
    		'answerResult': 2,
    		'label': 'Maybe'
    	},
    ]}
    useLabelValue={'label'}
    useKeyValue={'answerResult'}
    onChange={(value) => console.log(value, 'selected')}
/>
```


**Inverted Options**

```es6
<OptionGroup
    options={{yes: 'Yes, no: 'No', maybe: 'Maybe'}}
    onChange={(value) => console.log(value, 'selected')}
    invertKeyLabel={true}
/>
```

**Attribute Styles**

![alt text](https://github.com/flyandi/react-native-optiongroup/raw/master/docs/styled.png "react-native-optiongroup")

```es6
<OptionGroup
	borderColor={'green'}
	borderWidth={2}
	borderRadius={5}
	backgroundColor={'white'}
    options={{'Yes': 0, 'No': 1, 'Maybe': 2}}
    onChange={(value) => console.log(value, 'selected')}
/>
```


**Standard Styles**

![alt text](https://github.com/flyandi/react-native-optiongroup/raw/master/docs/large.png "react-native-optiongroup")

```es6
<OptionGroup
	style={{fontSize: 20, margin: 20}}
    options={{'Yes': 0, 'No': 1, 'Maybe': 2}}
    onChange={(value) => console.log(value, 'selected')}
/>
```

A subset of standard styles are supported including `margin`, `fontSize`, `fontFamily`, `backgroundColor`, `borderColor`, `borderWidth`, `borderRadius`, `contentPadding` and `inverseTextColor`.


**Theme Styles**

![alt text](https://github.com/flyandi/react-native-optiongroup/raw/master/docs/themes.png "react-native-optiongroup")


```es6
<OptionGroup
	defaultValue={0}
	theme={'red'}
    options={{'Yes': 0, 'No': 1, 'Maybe': 2}}
    onChange={(value) => console.log(value, 'selected')}
/>

<OptionGroup
	defaultValue={0}
	theme={'blue'}
    options={{'Yes': 0, 'No': 1, 'Maybe': 2}}
    onChange={(value) => console.log(value, 'selected')}
/>

<OptionGroup
	defaultValue={0}
	theme={'green'}
    options={{'Yes': 0, 'No': 1, 'Maybe': 2}}
    onChange={(value) => console.log(value, 'selected')}
/>

<OptionGroup
	defaultValue={0}
	theme={'yellow'}
    options={{'Yes': 0, 'No': 1, 'Maybe': 2}}
    onChange={(value) => console.log(value, 'selected')}
/>
```



