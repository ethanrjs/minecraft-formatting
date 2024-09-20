# minecraft-formatting

For those who like the styling that Minecraft uses -- in the terminal.

## Guide

### Installation

Install the package using npm:

```bash
npm install minecraft-formatting
```

### Basic Usage

```javascript
const { colorize, colorPrint, stripColors } = require('minecraft-formatting');

// Print colored text to console
colorPrint('&aGreen &lBold &cRed &mUnderlined Text');

// Get colored string
console.log(colorize('&bAqua &nStrikethrough Text'));

// Remove all color codes
console.log(stripColors('&aGreen &lBold Text')); // Outputs: "Green Bold Text"
```

### Color Codes

Minecraft-formatting supports the following color and formatting codes:

#### Text Colors

-   `&0`: Black
-   `&1`: Dark Blue
-   `&2`: Dark Green
-   `&3`: Dark Aqua
-   `&4`: Dark Red
-   `&5`: Dark Purple
-   `&6`: Gold
-   `&7`: Gray
-   `&8`: Dark Gray
-   `&9`: Blue
-   `&a`: Green
-   `&b`: Aqua
-   `&c`: Red
-   `&d`: Light Purple
-   `&e`: Yellow
-   `&f`: White

#### Formatting

-   `&l`: Bold
-   `&m`: Strikethrough
-   `&n`: Underline
-   `&r`: Reset

#### Background Colors

-   `&!`: Black
-   `&@`: Dark Blue
-   `&#`: Dark Green
-   `&$`: Dark Aqua
-   `&%`: Dark Red
-   `&^`: Dark Purple
-   `&&`: Gold
-   `&*`: Gray
-   `&(`: Dark Gray
-   `&)`: Blue
-   `&A`: Green
-   `&B`: Aqua
-   `&C`: Red
-   `&D`: Light Purple
-   `&E`: Yellow
-   `&F`: White

### API Reference

#### `colorize(input: string): string`

Converts Minecraft color codes in the input string to ANSI color codes.

Example:

```javascript
const coloredString = colorize('&aThis is &lgreen and bold');
console.log(coloredString);
```

#### `colorPrint(...args: any[]): void`

Prints the input to the console, converting any Minecraft color codes to ANSI color codes.

Example:

```javascript
colorPrint('&bThis is &naqua and underlined');
```

#### `stripColors(input: string): string`

Removes all Minecraft color codes from the input string.

Example:

```javascript
const strippedString = stripColors('&cRed &lBold &mStrikethrough');
console.log(strippedString); // Outputs: "Red Bold Strikethrough"
```

### Advanced Usage

#### Nested Formatting

You can nest different formatting options:

```javascript
colorPrint('&a&lThis is green and bold &r&cThis is just red');
```

#### Background Colors

Combine foreground and background colors:

```javascript
colorPrint('&a&!This is green text on a black background');
```

#### Reset Formatting

Use `&r` to reset all formatting:

```javascript
colorPrint('&a&lGreen Bold &rNormal &cRed');
```

### Examples

1. Creating a colorful header:

    ```javascript
    colorPrint('&b==========================');
    colorPrint('&l&6       Welcome to My App       ');
    colorPrint('&b==========================');
    ```

2. Highlighting important information:

    ```javascript
    colorPrint('Status: &aONLINE');
    colorPrint('Errors: &c3');
    colorPrint('Warnings: &e10');
    ```

## Contributing

Just make a pull request idk I threw this together in 10 minutes because I got tired of using chalk

## License

This project is licensed under the MIT License.
