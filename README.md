# MMM-sight-words

This is a module for the [MagicMirror²](https://github.com/MichMich/MagicMirror/).

Displays a daily word from [Sight Word](http://www.sightwords.com/) based on the age group set in the config.

## Using the module

To use this module, add the following configuration block to the modules array in the `config/config.js` file:
```js
var config = {
    modules: [
        {
            module: 'MMM-sight-words',
            config: {
                // See below for configurable options
            }
        }
    ]
}
```

## Configuration options

| Option           | Description
|----------------- |-----------
| `group`          | *Optional* Age group of words to display <br><br>**Type:** `string` <br>Default `"prek"`<br>Valid options `"prek"`, `"kindergarten"`, `"first"`, `"second"`, `"third"`, `"noun"`
