# nice-validator
[![Build Status](https://travis-ci.org/niceue/nice-validator.svg)](https://travis-ci.org/niceue/nice-validator)
[![Downloads](https://img.shields.io/github/downloads/niceue/nice-validator/total.svg)](https://github.com/niceue/nice-validator/releases)
[![Version](https://img.shields.io/npm/v/nice-validator.svg)](https://www.npmjs.com/package/nice-validator)
[![License MIT](https://img.shields.io/badge/license-MIT-blue.svg)](http://niceue.com/licenses/MIT-LICENSE.txt)

Simple, smart and pleasant validation solution.

[Download](https://github.com/niceue/nice-validator/releases) the latest release
or install package via [npm](https://www.npmjs.com/) or [bower](http://bower.io/)
```bash
$ npm install nice-validator
```
```bash
$ bower install nice-validator
```

## Getting started
#### 1. Include [jQuery 1.7+](http://jquery.com)
#### 2. Include nice-validator
width `<script>` tag:
```html
<script src="path/to/nice-validator/jquery.validator.min.js?local=en"></script>
```
via [webpack](http://webpack.github.io/)
```javascript
require('nice-validator')
require('nice-validator/local/zh-CN')
```

via module loader [Requirejs](http://requirejs.org/):
```javascript
requirejs.config({
    paths: {
        jquery: 'http://cdn.jsdelivr.net/jquery/1.12.3/jquery.min',
        validator: 'path/to/nice-validator/local/en'
    },
    shim: {
        validator: ['path/to/nice-validator/jquery.validator.js?css']
    }
});

require(['validator']);
```

#### 3. Config rules
```html
<form id="form1">
<input type="text" name="field1" data-rule="required;email;remote(checkEmail.php)">
<input type="text" name="field2" data-rule="required;length(6~16)">
<input type="text" name="field3" data-rule="match(field2)">
<input type="text" name="field4" data-rule="range(0~100)" id="field4">
<input type="text" name="field5" data-rule="required(#field4:filled)">
<input type="text" name="field6" data-rule="required; mobile|email;" data-msg="Please fill mobile or email">
<input type="text" name="field7"
    data-rule="required; !digits; length(6~)"
    data-msg-digits="Please not fill pure digits"
    data-msg-length="Please fill at least {1} characters.">
<input type="checkbox" name="field8" data-rule="checked">
... yadda yadda ...
</form>
```
It has started to work when you use native submitting.
#### 4. Handle submit (Optional)
```javascript
$("#form1").on('valid.form', function(){
    // You can do something, then submit form by native
    // this.submit();
    // or submit form by ajax
    $.post("path/to/server", $(this).serialize())
        .done(function(d){
            // do something
        });
});
```

## Documention
- [English](https://github.com/niceue/nice-validator/wiki/Getting-Started)
- [简体中文](http://validator.niceue.com/)

## Browser Support
  * IE6+
  * Chrome
  * Safari 4+
  * Firefox 9+
  * Opera


## Bugs / Contributions
- [Report a bug](https://github.com/niceue/nice-validator/issues)
- To contribute or send an idea, github message me or fork the project

## Build
Install dependencies:
```bash
$ npm install -g gulp
$ npm install
```
Run test and build:
```bash
$ gulp
```


## License
nice-validator is available under the terms of the [MIT License](http://niceue.com/licenses/MIT-LICENSE.txt).
