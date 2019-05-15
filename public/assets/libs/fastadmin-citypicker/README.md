# City Picker

> A simple jQuery plugin for picking provinces, cities and districts of China.

- [Demo](http://tshi0912.github.io/city-picker)

##Release History

###v1.1.0
Add function to get the code：

```javascript
// type: null or undefined(get the full code path, separated with /), province, city, district
$('.city-picker').data('citypicker').getCode(type);
```

## Main

```
dist/
├── city-picker.js          ( 7 KB)
├── city-picker.min.js      ( 4 KB)
├── city-picker.data.js     (98 KB)
└── city-picker.data.min.js (68 KB)
```



## Getting started


### Quick start

Four quick start options are available:

- [Download the latest release](https://github.com/tshi0912/city-picker/archive/master.zip).
- Clone the repository: `git clone https://github.com/tshi0912/city-picker.git`.
- Install with [NPM](http://npmjs.org): `npm install city-picker`.
- Install with [Bower](http://bower.io): `bower install city-picker`.


### Installation

Include files:

```html
<script src="/path/to/jquery.js"></script><!-- jQuery is required -->
<script src="/path/to/city-picker.data.js"></script>
<script src="/path/to/city-picker.js"></script>
```


Create HTML elements:

```html
<div style="position:relative;"><!-- container -->
  <input readonly type="text">
</div>
```



### Usage

#### Initialize with `data-toggle="city-picker"` attribute


Basic

```html
<div style="position:relative;">
  <input readonly type="text" data-toggle="city-picker">
</div>
```


Custom placeholders

```html
<div style="position:relative;">
  <input readonly type="text" data-toggle="city-picker" placeholder="customized placeholder...">
</div>
```

Responsive width

```html
<div style="position:relative;">
  <input readonly type="text" data-toggle="city-picker" data-responsive="true" style="width:50%;">
</div>
```


Custom province/city/district

```html
<div style="position:relative;">
  <input readonly type="text" data-toggle="city-picker" value="江苏省/常州市/溧阳市">
</div>
```


#### Initialize with `$.fn.city-picker` method

Basic

```js
$('#target').citypicker();
```

Custom districts

```js
$('#target').citypicker({
  province: '江苏省',
  city: '常州市',
  district: '溧阳市'
});
```



## Options

- Change the default options with `$().citypicker(options)`.
- Change the global default options with `$.fn.citypicker.setDefaults(options)`.


### simple

- Type: `Boolean`
- Default: `false`

Make the address level more simple, e.g. `内蒙古` instead of `内蒙古自治区`.

### level

- Type: `String`
- Default: `district`

Only province, province + city, or province + city + district.

### responsive

- Type: `Boolean`
- Default: `false`

make the drop down and mask span responsive on width.

### placeholder

- Type: `Boolean`
- Default: `请输入省/市/区`

Show placeholder (with an `<option>` element).


### province

- Type: `String`
- Default: `null`

Defines the initial value of province. If it is a existing province in `city-picker.data.js`, it will be selected. If not, it will be used as a placeholder.


### city

- Type: `String`
- Default: `null`

Defines the initial value of city. If it is a existing city under the selected province, it will be selected. If not, it will be used as a placeholder.


### district

- Type: `String`
- Default: `null`

Defines the initial value of district. If it is a existing district under the selected city, it will be selected. If not, it will be used as a placeholder.



## Methods

### reset()

Reset the selects to the initial states (Undo changed).

**Examples:**

```js
$().citypicker('reset');
```

### destroy()

Destroy the city-picker instance, but keep the selected districts.

If you want to remove the selected districts, you can call `reset` method first and then call this method.



## No conflict

If you have to use other plugin with the same namespace, just call the `$.fn.city-picker.noConflict` method to revert to it.

```html
<script src="other-plugin.js"></script>
<script src="city-picker.js"></script>
<script>
  $.fn.citypicker.noConflict();
  // Code that uses other plugin's "$().citypicker" can follow here.
</script>
```



## Browser support

- Chrome (latest 2)
- Firefox (latest 2)
- Internet Explorer 8+
- Opera (latest 2)
- Safari (latest 2)

As a jQuery plugin, you also need to see the [jQuery Browser Support](http://jquery.com/browser-support/).



## License

[MIT](http://opensource.org/licenses/MIT) © [Tao Shi](http://shitao.me)
