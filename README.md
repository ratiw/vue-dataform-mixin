# vue-dataform-mixin
[![Travis build](https://img.shields.io/travis/ratiw/vue-dataform-mixin.svg)](https://travis-ci.org/ratiw/vue-dataform-mixin)
[![Coverage Status](https://coveralls.io/repos/github/ratiw/vue-dataform-mixin/badge.svg?branch=master)](https://coveralls.io/github/ratiw/vue-dataform-mixin?branch=master)
[![npm](https://img.shields.io/npm/l/vue-dataform-mixin.svg)]()
[![npm version](https://img.shields.io/npm/v/vue-dataform-mixin.svg)](https://www.npmjs.com/package/vue-dataform-mixin)

> Vue Mixin util to help create data entry component

## Installation

### NPM
```
$ npm install vue-dataform-mixin
```

## Usage
- Create a component that will contains the HTML form (will call this a form component)
- Import `vue-dataform-mixin` and register it in the `mixins` section
- Apply `onSave`, `onCancel`, `onDelete` methods to the form component
- Add additional data and methods to the form component as necessary
- Register the form component to main Vue instance
- Pass following data via props (these props are defined in `vue-dataform-mixin`)
    - `data` -- the data object
    - `keys` -- the properties inside the data object that you want to map into form component
    - `validate-callback` -- the validation callback function defined in main Vue instance
    to be called by form component before the data are saved or updated
    - `delete-button` -- set to `true` if you want to show a delete button

## Properties
#### # keys
- __Required:__ `true`

- __Expect:__ `Array`

- __Usage:__

    Array of property names to be mapped to `input` object inside the data form.
    ```
    [ 'prop_a', 'prop_b', 'prop_c' ]
    ```
    
    If the property has nested object, use the following format:
    ```
    [ 'prop_a', 'prop_b', { name: 'prop_c', value: ['prop_c_1', 'prop_c_2'] } ]
    ```
    
    The nested object can also contain nested object as well.
    

#### # data
- __Expect:__ `Object`

- __Default:__ `{}`

- __Usage:__

    The data which its value will be used to populate in the data form. This data will not be modified until the changes have been committed (saved) by the user.

#### # validate-callback
- __Expect:__ `String`

- __Default:__ `''`

- __Usage:__

    Name of the callback to be called for the data validation. If no callback is defined, the validation will always return `true` (which is considered as passed)

#### # delete-button
- __Expect:__ `Boolean`

- __Default:__ `false`

- __Usage:__

    Whether to display the `delete` button or not?

    > __Note:__ You need to make sure that the delete button will be conditionally displayed in your template and the its click event is bound to `onDelete()` method.

## Internal Data
#### # input
- __Default:__ `null`

- __Description:__

    This is where the values in the `data` prop will be copied to and used inside data form.

    > __Note:__ Only the values of property given in the `keys` prop will be copied, the rests are ignored.

#### # errors
- __Default:__ `null`

- __Description:__

    If it is not `null`, it will contain all the validation errors of the fileds not passing validation.

    > __Note:__ Normally, this property can be set via `dataform:set-errors` event, which will internally call `setErrors()` method.

#### # isNew
- __Default:__ `false`

- __Description:__

    Its value will be automatically set by `setData()` method. If the pass-in data is null, it will be set to `true` to indicate a new data. Otherwise, its value will be set to `false`.

#### # eventPrefix
- __Default:__ `dataform:`

- __Description:__

    The prefix string that should be applied to all event emitted by the data form.

## Event trigger methods
In order for the data form to work, you will need to correctly bind these methods to the corresponding buttons.

#### # onSave
- __Usage:__

    ```javascript
      <template>
        ...
        <button @click="onSave">Save</button>
        ...
      </template>
    ```

- __Description:__

    When triggered, it will do the following, in order:
    - Check if the data in the form has been modified (e.g. different from the original values). If not, the `dataform:no-changed` event will be dispatched and exit.
    - Call the validation callback (if defined). If the validation fails, then exit.
    - Copy all the changes from `input` to `data`
    - Dispatch the `dataform:stored` or `dataform:updated` event depending on the valid of `isNew`.

#### # onCancel
- __Usage:__

    ```javascript
      <template>
        ...
        <button @click="onCancel">Cancel</button>
        ...
      </template>
    ```

- __Description:__

    When triggered, it will dispatch the `dataform:cancelled` event, then exit.

#### # onDelete
- __Usage:__

    ```javascript
      <template>
        ...
        <button @click="onDelete">Delete</button>
        ...
      </template>
    ```

- __Description:__

    When triggered, it will dispatch the `dataform:request-delete` event, then exit.


## Data related methods
#### # setData
- __Argument:__ `{Object} data`

- __Description:__

    This method will copy the values of the provided `keys` prop in the given `data` to the `input` object. It will also set the value of `isNew` property depending on the content of the given argument.

    > __Note:__ This method is called when `dataform:set-data` event was received. You should use `dataform:set-data` event when possible.

#### # isDirty
- __Returns:__ `boolean`

- __Description:__

    Return `true` if the data in the data form has been modified to be different than the original value. Otherwise, return `false`.

#### # hasError
- __Argument:__ `{String} name (optional)`

- __Returns:__ `boolean`

- __Description:__

    Check if there is any error from validation when called without an argument.

    Or, check if there is any error for the given field.

#### # getError
- __Argument:__ `{String} name`

- __Returns:__ `{Array}` -- array of error messages of the given field `name` or empty array if there is no error

- __Description:__

    Get the array of validation error message(s) for the given field.

#### # setErrors
- __Argument:__ `{Array} errors`

- __Description:__

    Set the internal `errors` property to the given object.

    > __Note:__ This method is called when `dataform:set-errors` event was received. You should use `dataform:set-errors` event when possible.

#### # clearErrors
- __Description:__

    Set the internal `errors` property to `null`.

#### # clearForm
- __Description:__

    Set all input inside data form to empty string `''`.


## Input keypress filtering
#### # numericInputFilter
- __Arguments:__
    - `{String} value`
    - `{KeyboardEvent} event`
- __Usage:__

    ```javascript
      <template>
        ...
        <input type="text" v-model="input.price"
            id="inputPrice"
            @keypress="numericInputFilter(input.price, $event)">
        ...
      </template>
```

- __Description:__

    Filter the input to accept only numeric digits, decimal, and minus sign.


## Events
#### # dataform:set-data
- __Argument:__ `{Object} data`

- __Type:__ Listening

- __Description:__

    You can use this event to set the data to be used in the form.

#### # dataform:clear-form
- __Type:__ Listening

- __Description:__

    Use this event to clear all the input value in the data form.

#### # dataform:set-errors
- __Argument:__ `{Array} errors`

- __Type:__ Listening

- __Description:__

    Use this event to send the validation errors to the data form component.

#### # dataform:clear-errors
- __Type:__ Listening

- __Description:__

    Use this event to clear all the errors by setting `errors` object to `null`.


## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# run unit tests
npm run unit

# run all tests
npm test
```

## License
`vue-dataform-mixin` is open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT).
