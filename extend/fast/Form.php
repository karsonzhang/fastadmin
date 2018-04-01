<?php

namespace fast;

use ArrayAccess;

/**
 * 表单元素生成
 * @class Form
 * @package fast
 * @method mixed token() static token
 * @method mixed close() static 关闭一个HTML表单
 * @method mixed setModel(mixed $model) static 设置HTML表单模型
 * @method mixed open(array $options) static 打开一个新的HTML表单
 * @method mixed file(string $name, array $options = array()) static 表单file
 * @method mixed reset(string $name, array $options = array()) static 表单reset
 * @method mixed password(string $name, array $options = array()) static 表单password
 * @method mixed button(string $value = null, array $options = array()) static 表单button
 * @method mixed model(mixed $model ,array $options = array()) static 打开一个新的HTML表单模型
 * @method mixed submit(string $value = null, array $options = array()) static 表单submit提交
 * @method mixed text(string $name, string $value = null, array $options = []) static 表单text
 * @method mixed label(string $name, string $value = null, array $options = []) static label标签
 * @method mixed url(string $name, string $value = null, array $options = array()) static 表单url
 * @method mixed email(string $name, string $value = null, array $options = array()) static 表单email
 * @method mixed hidden(string $name, string $value = null, array $options = array()) static 表单hidden
 * @method mixed image(string $url, string $name = null, array $attributes = array()) static 表单image提交
 * @method mixed textarea(string $name, string $value = null, array $options = array()) static 表单textarea
 * @method mixed checkbox(string $name, string $value = 1, string $checked = null, array $options = array()) static 表单checkbox
 * @method mixed radio(string $name, string $value = null, string $checked = null, array $options = array())) static 表单radio
 * @method mixed select(string $name, array $list = array(), string $selected = null, array $options = array()) static 表单textarea
 * @method mixed selectYear(string $name ,string $begin,string $end, string $selected = null ,array $options = array()) static select年
 * @method mixed selectMonth(string $name ,string $selected = null ,array $options = array() ,string $format = '%m') static select月
 */
class Form
{

    public function __construct()
    {

    }

    public static function __callStatic($name, $arguments)
    {
        return call_user_func_array([FormBuilder::instance(), $name], $arguments);
    }

}

/**
 *
 * 表单元素生成
 * @from https://github.com/illuminate/html
 * @package fast
 */
class FormBuilder
{

    /**
     * The CSRF token used by the form builder.
     *
     * @var string
     */
    protected $csrfToken = array('name' => '__token__');

    /**
     * The current model instance for the form.
     *
     * @var mixed
     */
    protected $model;

    /**
     * An array of label names we've created.
     *
     * @var array
     */
    protected $labels = array();

    /**
     * The reserved form open attributes.
     *
     * @var array
     */
    protected $reserved = array('method', 'url', 'route', 'action', 'files');

    /**
     * The form methods that should be spoofed, in uppercase.
     *
     * @var array
     */
    protected $spoofedMethods = array('DELETE', 'PATCH', 'PUT');

    /**
     * The types of inputs to not fill values on by default.
     *
     * @var array
     */
    protected $skipValueTypes = array('file', 'password', 'checkbox', 'radio');

    /**
     * Escape html
     * @var boolean
     */
    protected $escapeHtml = true;
    protected static $instance;

    /**
     * Create a new form builder instance.
     *
     * @return void
     */
    public function __construct()
    {

    }

    public static function instance($options = [])
    {
        if (is_null(self::$instance))
        {
            self::$instance = new static($options);
        }

        return self::$instance;
    }

    /**
     * Open up a new HTML form.
     *
     * @param  array   $options
     * @return string
     */
    public function open(array $options = array())
    {
        $method = array_get($options, 'method', 'post');

        // We need to extract the proper method from the attributes. If the method is
        // something other than GET or POST we'll use POST since we will spoof the
        // actual method since forms don't support the reserved methods in HTML.
        $attributes['method'] = $this->getMethod($method);

        $attributes['action'] = array_get($options, 'action', '');

        $attributes['accept-charset'] = 'UTF-8';

        // If the method is PUT, PATCH or DELETE we will need to add a spoofer hidden
        // field that will instruct the Symfony request to pretend the method is a
        // different method than it actually is, for convenience from the forms.
        $append = $this->getAppendage($method);

        if (isset($options['files']) && $options['files'])
        {
            $options['enctype'] = 'multipart/form-data';
        }

        // Finally we're ready to create the final form HTML field. We will attribute
        // format the array of attributes. We will also add on the appendage which
        // is used to spoof requests for this PUT, PATCH, etc. methods on forms.
        $attributes = array_merge(
                $attributes, array_except($options, $this->reserved)
        );
        // Finally, we will concatenate all of the attributes into a single string so
        // we can build out the final form open statement. We'll also append on an
        // extra value for the hidden _method field if it's needed for the form.
        $attributes = $this->attributes($attributes);

        return '<form' . $attributes . '>' . $append;
    }

    /**
     * Create a new model based form builder.
     *
     * @param  mixed  $model
     * @param  array  $options
     * @return string
     */
    public function model($model, array $options = array())
    {
        $this->model = $model;

        return $this->open($options);
    }

    /**
     * Set the model instance on the form builder.
     *
     * @param  mixed  $model
     * @return void
     */
    public function setModel($model)
    {
        $this->model = $model;
    }

    /**
     * Set the escape html mode
     * @param boolean $escape
     */
    public function setEscapeHtml($escape)
    {
        $this->escapeHtml = $escape;
    }

    /**
     * Escape HTML special characters in a string.
     * @return string
     */
    public function escape($value)
    {
        if (!$this->escapeHtml)
        {
            return $value;
        }
        if (is_array($value))
        {
            $value = json_encode($value, JSON_UNESCAPED_UNICODE);
        }
        return htmlspecialchars($value, ENT_QUOTES, 'UTF-8', false);
    }

    /**
     * Close the current form.
     *
     * @return string
     */
    public function close()
    {
        $this->labels = array();

        $this->model = null;

        return '</form>';
    }

    /**
     * Generate a hidden field with the current CSRF token.
     *
     * @return string
     */
    public function token($name = '__token__', $type = 'md5')
    {
        if (function_exists('token'))
        {
            return token($name, $type);
        }

        return '';
    }

    /**
     * Create a form label element.
     *
     * @param  string  $name
     * @param  string  $value
     * @param  array   $options
     * @return string
     */
    public function label($name, $value = null, $options = array())
    {
        $this->labels[] = $name;

        $options = $this->attributes($options);

        $value = $this->escape($this->formatLabel($name, $value));

        return '<label for="' . $name . '"' . $options . '>' . $value . '</label>';
    }

    /**
     * Format the label value.
     *
     * @param  string  $name
     * @param  string|null  $value
     * @return string
     */
    protected function formatLabel($name, $value)
    {
        return $value ? : ucwords(str_replace('_', ' ', $name));
    }

    /**
     * Create a form input field.
     *
     * @param  string  $type
     * @param  string  $name
     * @param  string  $value
     * @param  array   $options
     * @return string
     */
    public function input($type, $name, $value = null, $options = array())
    {
        if (!isset($options['name']))
            $options['name'] = $name;

        // We will get the appropriate value for the given field. We will look for the
        // value in the session for the value in the old input data then we'll look
        // in the model instance if one is set. Otherwise we will just use empty.
        $id = $this->getIdAttribute($name, $options);

        if (!in_array($type, $this->skipValueTypes))
        {
            $value = $this->getValueAttribute($name, $value);
        }

        // Once we have the type, value, and ID we can merge them into the rest of the
        // attributes array so we can convert them into their HTML attribute format
        // when creating the HTML element. Then, we will return the entire input.
        $merge = compact('type', 'value', 'id');

        $options = array_merge($options, $merge);

        return '<input' . $this->attributes($options) . '>';
    }

    /**
     * Create a text input field.
     *
     * @param  string  $name
     * @param  string  $value
     * @param  array   $options
     * @return string
     */
    public function text($name, $value = null, $options = array())
    {
        return $this->input('text', $name, $value, $options);
    }

    /**
     * Create a password input field.
     *
     * @param  string  $name
     * @param  array   $options
     * @return string
     */
    public function password($name, $options = array())
    {
        return $this->input('password', $name, '', $options);
    }

    /**
     * Create a hidden input field.
     *
     * @param  string  $name
     * @param  string  $value
     * @param  array   $options
     * @return string
     */
    public function hidden($name, $value = null, $options = array())
    {
        return $this->input('hidden', $name, $value, $options);
    }

    /**
     * Create an e-mail input field.
     *
     * @param  string  $name
     * @param  string  $value
     * @param  array   $options
     * @return string
     */
    public function email($name, $value = null, $options = array())
    {
        return $this->input('email', $name, $value, $options);
    }

    /**
     * Create a url input field.
     *
     * @param  string  $name
     * @param  string  $value
     * @param  array   $options
     * @return string
     */
    public function url($name, $value = null, $options = array())
    {
        return $this->input('url', $name, $value, $options);
    }

    /**
     * Create a file input field.
     *
     * @param  string  $name
     * @param  array   $options
     * @return string
     */
    public function file($name, $options = array())
    {
        return $this->input('file', $name, null, $options);
    }

    /**
     * Create a textarea input field.
     *
     * @param  string  $name
     * @param  string  $value
     * @param  array   $options
     * @return string
     */
    public function textarea($name, $value = null, $options = array())
    {
        if (!isset($options['name']))
            $options['name'] = $name;

        // Next we will look for the rows and cols attributes, as each of these are put
        // on the textarea element definition. If they are not present, we will just
        // assume some sane default values for these attributes for the developer.
        $options = $this->setTextAreaSize($options);

        $options['id'] = $this->getIdAttribute($name, $options);

        $value = (string) $this->getValueAttribute($name, $value);

        unset($options['size']);

        // Next we will convert the attributes into a string form. Also we have removed
        // the size attribute, as it was merely a short-cut for the rows and cols on
        // the element. Then we'll create the final textarea elements HTML for us.
        $options = $this->attributes($options);

        return '<textarea' . $options . '>' . $this->escape($value) . '</textarea>';
    }

    /**
     * Set the text area size on the attributes.
     *
     * @param  array  $options
     * @return array
     */
    protected function setTextAreaSize($options)
    {
        if (isset($options['size']))
        {
            return $this->setQuickTextAreaSize($options);
        }

        // If the "size" attribute was not specified, we will just look for the regular
        // columns and rows attributes, using sane defaults if these do not exist on
        // the attributes array. We'll then return this entire options array back.
        $cols = array_get($options, 'cols', 50);

        $rows = array_get($options, 'rows', 10);

        return array_merge($options, compact('cols', 'rows'));
    }

    /**
     * Set the text area size using the quick "size" attribute.
     *
     * @param  array  $options
     * @return array
     */
    protected function setQuickTextAreaSize($options)
    {
        $segments = explode('x', $options['size']);

        return array_merge($options, array('cols' => $segments[0], 'rows' => $segments[1]));
    }

    /**
     * Create a select box field.
     *
     * @param  string  $name
     * @param  array   $list
     * @param  string  $selected
     * @param  array   $options
     * @return string
     */
    public function select($name, $list = array(), $selected = null, $options = array())
    {
        // When building a select box the "value" attribute is really the selected one
        // so we will use that when checking the model or session for a value which
        // should provide a convenient method of re-populating the forms on post.
        $selected = $this->getValueAttribute($name, $selected);

        $options['id'] = $this->getIdAttribute($name, $options);

        if (!isset($options['name']))
            $options['name'] = $name;

        // We will simply loop through the options and build an HTML value for each of
        // them until we have an array of HTML declarations. Then we will join them
        // all together into one single HTML element that can be put on the form.
        $html = array();

        foreach ($list as $value => $display)
        {
            $html[] = $this->getSelectOption($display, $value, $selected);
        }

        // Once we have all of this HTML, we can join this into a single element after
        // formatting the attributes into an HTML "attributes" string, then we will
        // build out a final select statement, which will contain all the values.
        $options = $this->attributes($options);

        $list = implode('', $html);

        return "<select{$options}>{$list}</select>";
    }

    /**
     * Create a select range field.
     *
     * @param  string  $name
     * @param  string  $begin
     * @param  string  $end
     * @param  string  $selected
     * @param  array   $options
     * @return string
     */
    public function selectRange($name, $begin, $end, $selected = null, $options = array())
    {

        $range = array_combine($range = range($begin, $end), $range);

        return $this->select($name, $range, $selected, $options);
    }

    /**
     * Create a select year field.
     *
     * @param  string  $name
     * @param  string  $begin
     * @param  string  $end
     * @param  string  $selected
     * @param  array   $options
     * @return string
     */
    public function selectYear()
    {
        return call_user_func_array(array($this, 'selectRange'), func_get_args());
    }

    /**
     * Create a select month field.
     *
     * @param  string  $name
     * @param  string  $selected
     * @param  array   $options
     * @param  string  $format
     * @return string
     */
    public function selectMonth($name, $selected = null, $options = array(), $format = '%m')
    {
        $months = array();

        foreach (range(1, 12) as $month)
        {
            $months[$month] = strftime($format, mktime(0, 0, 0, $month, 1));
        }

        return $this->select($name, $months, $selected, $options);
    }

    /**
     * Get the select option for the given value.
     *
     * @param  string  $display
     * @param  string  $value
     * @param  string  $selected
     * @return string
     */
    public function getSelectOption($display, $value, $selected)
    {
        if (is_array($display))
        {
            return $this->optionGroup($display, $value, $selected);
        }

        return $this->option($display, $value, $selected);
    }

    /**
     * Create an option group form element.
     *
     * @param  array   $list
     * @param  string  $label
     * @param  string  $selected
     * @return string
     */
    protected function optionGroup($list, $label, $selected)
    {
        $html = array();

        foreach ($list as $value => $display)
        {
            $html[] = $this->option($display, $value, $selected);
        }

        return '<optgroup label="' . $this->escape($label) . '">' . implode('', $html) . '</optgroup>';
    }

    /**
     * Create a select element option.
     *
     * @param  string  $display
     * @param  string  $value
     * @param  string  $selected
     * @return string
     */
    protected function option($display, $value, $selected)
    {
        $selected = $this->getSelectedValue($value, $selected);

        $options = array('value' => $this->escape($value), 'selected' => $selected);

        return '<option' . $this->attributes($options) . '>' . $this->escape($display) . '</option>';
    }

    /**
     * Determine if the value is selected.
     *
     * @param  string  $value
     * @param  string  $selected
     * @return string
     */
    protected function getSelectedValue($value, $selected)
    {
        if (is_array($selected))
        {
            return in_array($value, $selected) ? 'selected' : null;
        }

        return ((string) $value == (string) $selected) ? 'selected' : null;
    }

    /**
     * Create a checkbox input field.
     *
     * @param  string  $name
     * @param  mixed   $value
     * @param  bool    $checked
     * @param  array   $options
     * @return string
     */
    public function checkbox($name, $value = 1, $checked = null, $options = array())
    {
        return $this->checkable('checkbox', $name, $value, $checked, $options);
    }

    /**
     * Create a radio button input field.
     *
     * @param  string  $name
     * @param  mixed   $value
     * @param  bool    $checked
     * @param  array   $options
     * @return string
     */
    public function radio($name, $value = null, $checked = null, $options = array())
    {
        if (is_null($value))
            $value = $name;

        return $this->checkable('radio', $name, $value, $checked, $options);
    }

    /**
     * Create a checkable input field.
     *
     * @param  string  $type
     * @param  string  $name
     * @param  mixed   $value
     * @param  bool    $checked
     * @param  array   $options
     * @return string
     */
    protected function checkable($type, $name, $value, $checked, $options)
    {
        $checked = $this->getCheckedState($type, $name, $value, $checked);

        if ($checked)
            $options['checked'] = 'checked';

        return $this->input($type, $name, $value, $options);
    }

    /**
     * Get the check state for a checkable input.
     *
     * @param  string  $type
     * @param  string  $name
     * @param  mixed   $value
     * @param  bool    $checked
     * @return bool
     */
    protected function getCheckedState($type, $name, $value, $checked)
    {
        switch ($type)
        {
            case 'checkbox':
                return $this->getCheckboxCheckedState($name, $value, $checked);

            case 'radio':
                return $this->getRadioCheckedState($name, $value, $checked);

            default:
                return $this->getValueAttribute($name) == $value;
        }
    }

    /**
     * Get the check state for a checkbox input.
     *
     * @param  string  $name
     * @param  mixed  $value
     * @param  bool  $checked
     * @return bool
     */
    protected function getCheckboxCheckedState($name, $value, $checked)
    {
        if (isset($this->session) && !$this->oldInputIsEmpty() && is_null($this->old($name)))
            return false;

        if ($this->missingOldAndModel($name))
            return $checked;

        $posted = $this->getValueAttribute($name);

        return is_array($posted) ? in_array($value, $posted) : (bool) $posted;
    }

    /**
     * Get the check state for a radio input.
     *
     * @param  string  $name
     * @param  mixed  $value
     * @param  bool  $checked
     * @return bool
     */
    protected function getRadioCheckedState($name, $value, $checked)
    {
        if ($this->missingOldAndModel($name))
            return $checked;

        return $this->getValueAttribute($name) == $value;
    }

    /**
     * Determine if old input or model input exists for a key.
     *
     * @param  string  $name
     * @return bool
     */
    protected function missingOldAndModel($name)
    {
        return (is_null($this->old($name)) && is_null($this->getModelValueAttribute($name)));
    }

    /**
     * Create a HTML reset input element.
     *
     * @param  string  $value
     * @param  array   $attributes
     * @return string
     */
    public function reset($value, $attributes = array())
    {
        return $this->input('reset', null, $value, $attributes);
    }

    /**
     * Create a HTML image input element.
     *
     * @param  string  $url
     * @param  string  $name
     * @param  array   $attributes
     * @return string
     */
    public function image($url, $name = null, $attributes = array())
    {
        $attributes['src'] = $url;

        return $this->input('image', $name, null, $attributes);
    }

    /**
     * Create a submit button element.
     *
     * @param  string  $value
     * @param  array   $options
     * @return string
     */
    public function submit($value = null, $options = array())
    {
        return $this->input('submit', null, $value, $options);
    }

    /**
     * Create a button element.
     *
     * @param  string  $value
     * @param  array   $options
     * @return string
     */
    public function button($value = null, $options = array())
    {
        if (!array_key_exists('type', $options))
        {
            $options['type'] = 'button';
        }

        return '<button' . $this->attributes($options) . '>' . $value . '</button>';
    }

    /**
     * Parse the form action method.
     *
     * @param  string  $method
     * @return string
     */
    protected function getMethod($method)
    {
        $method = strtoupper($method);

        return $method != 'GET' ? 'POST' : $method;
    }

    /**
     * Get the form action from the options.
     *
     * @param  array   $options
     * @return string
     */
    /* protected function getAction(array $options)
      {
      // We will also check for a "route" or "action" parameter on the array so that
      // developers can easily specify a route or controller action when creating
      // a form providing a convenient interface for creating the form actions.
      if (isset($options['url']))
      {
      return $this->getUrlAction($options['url']);
      }

      if (isset($options['route']))
      {
      return $this->getRouteAction($options['route']);
      }

      // If an action is available, we are attempting to open a form to a controller
      // action route. So, we will use the URL generator to get the path to these
      // actions and return them from the method. Otherwise, we'll use current.
      elseif (isset($options['action']))
      {
      return $this->getControllerAction($options['action']);
      }

      return $this->url->current();
      } */

    /**
     * Get the action for a "url" option.
     *
     * @param  array|string  $options
     * @return string
     */
    /* protected function getUrlAction($options)
      {
      if (is_array($options))
      {
      return $this->url->to($options[0], array_slice($options, 1));
      }

      return $this->url->to($options);
      } */

    /**
     * Get the action for a "route" option.
     *
     * @param  array|string  $options
     * @return string
     */
    /* protected function getRouteAction($options)
      {
      if (is_array($options))
      {
      return $this->url->route($options[0], array_slice($options, 1));
      }

      return $this->url->route($options);
      } */

    /**
     * Get the action for an "action" option.
     *
     * @param  array|string  $options
     * @return string
     */
    /* protected function getControllerAction($options)
      {
      if (is_array($options))
      {
      return $this->url->action($options[0], array_slice($options, 1));
      }

      return $this->url->action($options);
      } */

    /**
     * Get the form appendage for the given method.
     *
     * @param  string  $method
     * @return string
     */
    protected function getAppendage($method)
    {
        list($method, $appendage) = array(strtoupper($method), '');

        // If the HTTP method is in this list of spoofed methods, we will attach the
        // method spoofer hidden input to the form. This allows us to use regular
        // form to initiate PUT and DELETE requests in addition to the typical.
        if (in_array($method, $this->spoofedMethods))
        {
            $appendage .= $this->hidden('_method', $method);
        }


        // If the method is something other than GET we will go ahead and attach the
        // CSRF token to the form, as this can't hurt and is convenient to simply
        // always have available on every form the developers creates for them.
        if ($method != 'GET')
        {
            $appendage .= $this->token(array_get($this->csrfToken, 'name'), array_get($this->csrfToken, 'type'));
        }

        return $appendage;
    }

    /**
     * Get the ID attribute for a field name.
     *
     * @param  string  $name
     * @param  array   $attributes
     * @return string
     */
    public function getIdAttribute($name, $attributes)
    {

        if (array_key_exists('id', $attributes))
        {
            return $attributes['id'];
        }

        if (in_array($name, $this->labels))
        {
            return $name;
        }
    }

    /**
     * Get the value that should be assigned to the field.
     *
     * @param  string  $name
     * @param  string  $value
     * @return string
     */
    public function getValueAttribute($name, $value = null)
    {
        if (is_null($name))
            return $value;

        if (!is_null($this->old($name)))
        {
            return $this->old($name);
        }

        if (!is_null($value))
            return $value;

        if (isset($this->model))
        {
            return $this->getModelValueAttribute($name);
        }
    }

    /**
     * Get the model value that should be assigned to the field.
     *
     * @param  string  $name
     * @return string
     */
    protected function getModelValueAttribute($name)
    {
        if (is_object($this->model))
        {
            return object_get($this->model, $this->transformKey($name));
        }
        elseif (is_array($this->model))
        {
            return array_get($this->model, $this->transformKey($name));
        }
    }

    /**
     * Get a value from the session's old input.
     *
     * @param  string  $name
     * @return string
     */
    public function old($name)
    {
        if (isset($this->session))
        {
            return $this->session->getOldInput($this->transformKey($name));
        }
    }

    /**
     * Determine if the old input is empty.
     *
     * @return bool
     */
    public function oldInputIsEmpty()
    {
        return (isset($this->session) && count($this->session->getOldInput()) == 0);
    }

    /**
     * Transform key from array to dot syntax.
     *
     * @param  string  $key
     * @return string
     */
    protected function transformKey($key)
    {
        return str_replace(array('.', '[]', '[', ']'), array('_', '', '.', ''), $key);
    }

    /**
     * 数组转换成一个HTML属性字符串。
     *
     * @param  array  $attributes
     * @return string
     */
    public function attributes($attributes)
    {
        $html = array();
        // 假设我们的keys 和 value 是相同的,
        // 拿HTML“required”属性来说,假设是['required']数组,
        // 会已 required="required" 拼接起来,而不是用数字keys去拼接
        foreach ((array) $attributes as $key => $value)
        {
            $element = $this->attributeElement($key, $value);
            if (!is_null($element))
                $html[] = $element;
        }
        return count($html) > 0 ? ' ' . implode(' ', $html) : '';
    }

    /**
     * 拼接成一个属性。
     *
     * @param  string  $key
     * @param  string  $value
     * @return string
     */
    protected function attributeElement($key, $value)
    {
        if (is_numeric($key))
            $key = $value;
        if (!is_null($value))
            return $key . '="' . $value . '"';
    }

}

class Arr
{

    /**
     * Determine whether the given value is array accessible.
     *
     * @param  mixed  $value
     * @return bool
     */
    public static function accessible($value)
    {
        return is_array($value) || $value instanceof ArrayAccess;
    }

    /**
     * Determine if the given key exists in the provided array.
     *
     * @param  \ArrayAccess|array  $array
     * @param  string|int  $key
     * @return bool
     */
    public static function exists($array, $key)
    {
        if ($array instanceof ArrayAccess)
        {
            return $array->offsetExists($key);
        }
        return array_key_exists($key, $array);
    }

    /**
     * Get an item from an array using "dot" notation.
     *
     * @param  \ArrayAccess|array  $array
     * @param  string  $key
     * @param  mixed   $default
     * @return mixed
     */
    public static function get($array, $key, $default = null)
    {
        if (!static::accessible($array))
        {
            return $default;
        }
        if (is_null($key))
        {
            return $array;
        }
        if (static::exists($array, $key))
        {
            return $array[$key];
        }
        foreach (explode('.', $key) as $segment)
        {
            if (static::accessible($array) && static::exists($array, $segment))
            {
                $array = $array[$segment];
            }
            else
            {
                return $default;
            }
        }
        return $array;
    }

    /**
     * Get all of the given array except for a specified array of items.
     *
     * @param  array  $array
     * @param  array|string  $keys
     * @return array
     */
    public static function except($array, $keys)
    {
        static::forget($array, $keys);
        return $array;
    }

    /**
     * Remove one or many array items from a given array using "dot" notation.
     *
     * @param  array  $array
     * @param  array|string  $keys
     * @return void
     */
    public static function forget(&$array, $keys)
    {
        $original = &$array;
        $keys = (array) $keys;
        if (count($keys) === 0)
        {
            return;
        }
        foreach ($keys as $key)
        {
            // if the exact key exists in the top-level, remove it
            if (static::exists($array, $key))
            {
                unset($array[$key]);
                continue;
            }
            $parts = explode('.', $key);
            // clean up before each pass
            $array = &$original;
            while (count($parts) > 1)
            {
                $part = array_shift($parts);
                if (isset($array[$part]) && is_array($array[$part]))
                {
                    $array = &$array[$part];
                }
                else
                {
                    continue 2;
                }
            }
            unset($array[array_shift($parts)]);
        }
    }

}

if (!function_exists('array_get'))
{

    /**
     * Get an item from an array using "dot" notation.
     *
     * @param  \ArrayAccess|array  $array
     * @param  string  $key
     * @param  mixed   $default
     * @return mixed
     */
    function array_get($array, $key, $default = null)
    {
        return Arr::get($array, $key, $default);
    }

}
if (!function_exists('e'))
{

    /**
     * Escape HTML special characters in a string.
     *
     *
     * @return string
     */
    function e($value)
    {
        if (is_array($value))
        {
            $value = json_encode($value, JSON_UNESCAPED_UNICODE);
        }
        return htmlspecialchars($value, ENT_QUOTES, 'UTF-8', false);
    }

}
if (!function_exists('array_except'))
{

    /**
     * Get all of the given array except for a specified array of items.
     *
     * @param  array  $array
     * @param  array|string  $keys
     * @return array
     */
    function array_except($array, $keys)
    {
        return Arr::except($array, $keys);
    }

}
