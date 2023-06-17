# Node Deepl API Translation

## To translate languages with Deepl Translation API

- **[Installation](#installation)**
- **[Usage](#usage)**

## Installation
Install this package via [npm](https://npmjs.com/).

```
npm install deepltranslate
```
## Usage
- import the package and create a new object by passing token 
```
let deeplApi = require("deepltranslate")

let deeplTranslation = new deeplApi({token: 'this is token'})
```
- default hostname is 'api.deepl.com' and you can also pass hostname like this :
```
let deeplTranslation = new deeplApi({token: 'this is token', hostname: 'this is hostname'})
```
### Translate
```
deeplTranslation.translate("hello", "en", "ja").then((res)=>{
    console.log(res);
})
```
### Get supported languages
```
deeplTranslation.getLanguages().then((res)=>{
    console.log(res);
})
```
## Security

If you discover any security related issues, please email them to [waithawoocw@gmail.com](mailto:waithawoocw@gmail.com) instead of using the issue tracker.

## License

The MIT License (MIT). Please see the [License File](LICENSE) for more information.

