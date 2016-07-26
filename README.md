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

    Lorem ipsum dolor sit amet, consectetur adipisicing elit. At necessitatibus accusamus labore quisquam amet iure esse ullam expedita, quia voluptatum, debitis culpa eaque reprehenderit velit natus quas iusto repudiandae adipisci!

#### # data
- __Expect:__ `Object`

- __Usage:__

    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem assumenda at, excepturi, dicta voluptatem fugiat quaerat cum molestiae iure consequuntur modi. Quod numquam magnam accusamus autem hic neque voluptate. Laboriosam.

#### # validate-callback
- __Expect:__ `String`

- __Usage:__

    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur tempore quisquam excepturi cum sint impedit, maxime hic. Et modi nemo eos dolorem nisi tenetur animi impedit consectetur, veniam nam ducimus.

### # delete-button
- __Expect:__ `Boolean`

- __Usage:__

    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora eligendi nemo labore provident, ducimus, minus aliquid dolores laborum officia pariatur quibusdam distinctio natus! Distinctio explicabo veritatis culpa aut odit! Officia.

## Internal Data
#### # input
- __Description:__

    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus harum modi atque! Id velit dolores numquam aliquid vitae explicabo totam iure, laudantium debitis facere saepe non, neque et. Odit, similique!

#### # errors
- __Description:__

    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus harum modi atque! Id velit dolores numquam aliquid vitae explicabo totam iure, laudantium debitis facere saepe non, neque et. Odit, similique!

#### # isNew
- __Description:__

    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus harum modi atque! Id velit dolores numquam aliquid vitae explicabo totam iure, laudantium debitis facere saepe non, neque et. Odit, similique!

#### # eventPrefix
- __Description:__

    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus harum modi atque! Id velit dolores numquam aliquid vitae explicabo totam iure, laudantium debitis facere saepe non, neque et. Odit, similique!

## Event trigger methods
#### # onSave
- __Usage:__

    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore in quae, minus sapiente. Totam, corrupti quae pariatur. Suscipit totam sunt mollitia earum quam ipsum eum cum, placeat, aspernatur nemo exercitationem!

- __Description:__

    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Numquam officia omnis minima, odio aperiam vel, sed? Harum nisi, neque aspernatur illum, porro voluptate possimus numquam ullam ipsum deserunt, cum sint.

#### # onCancel
- __Usage:__

    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore in quae, minus sapiente. Totam, corrupti quae pariatur. Suscipit totam sunt mollitia earum quam ipsum eum cum, placeat, aspernatur nemo exercitationem!

- __Description:__

    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Numquam officia omnis minima, odio aperiam vel, sed? Harum nisi, neque aspernatur illum, porro voluptate possimus numquam ullam ipsum deserunt, cum sint.

#### # onDelete
- __Usage:__

    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore in quae, minus sapiente. Totam, corrupti quae pariatur. Suscipit totam sunt mollitia earum quam ipsum eum cum, placeat, aspernatur nemo exercitationem!

- __Description:__

    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Numquam officia omnis minima, odio aperiam vel, sed? Harum nisi, neque aspernatur illum, porro voluptate possimus numquam ullam ipsum deserunt, cum sint.


## Data related methods
#### # isNew
- __Returns:__ `boolean`

- __Description:__

    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore in quae, minus sapiente. Totam, corrupti quae pariatur. Suscipit totam sunt mollitia earum quam ipsum eum cum, placeat, aspernatur nemo exercitationem!

#### # isDirty
- __Returns:__ `boolean`

- __Description:__

    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore in quae, minus sapiente. Totam, corrupti quae pariatur. Suscipit totam sunt mollitia earum quam ipsum eum cum, placeat, aspernatur nemo exercitationem!

#### # hasError
- __Argument:__ `{String} name (optional)`

- __Returns:__ `boolean`

- __Description:__

    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore in quae, minus sapiente. Totam, corrupti quae pariatur. Suscipit totam sunt mollitia earum quam ipsum eum cum, placeat, aspernatur nemo exercitationem!

#### # getError
- __Argument:__ `{String} name`

- __Returns:__ `{Array}` -- array of error messages of the given field `name` or empty array if there is no error

- __Description:__

    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore in quae, minus sapiente. Totam, corrupti quae pariatur. Suscipit totam sunt mollitia earum quam ipsum eum cum, placeat, aspernatur nemo exercitationem!

#### # setErrors
- __Argument:__ `{Array} errors`

- __Description:__

    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti quae, delectus aperiam. Fugiat repudiandae perspiciatis corporis neque alias rem, aut provident blanditiis inventore suscipit magnam harum non saepe animi. At.

#### # clearErrors
- __Description:__

    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti quae, delectus aperiam. Fugiat repudiandae perspiciatis corporis neque alias rem, aut provident blanditiis inventore suscipit magnam harum non saepe animi. At.

#### # clearForm
- __Description:__

    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti quae, delectus aperiam. Fugiat repudiandae perspiciatis corporis neque alias rem, aut provident blanditiis inventore suscipit magnam harum non saepe animi. At.


## Input keypress filtering
#### # numericInputFilter
- __Arguments:__
    - `{String} value`
    - `{KeyboardEvent} event`
- __Usage:__

    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae reiciendis vel libero sequi ipsam dolor aliquam accusantium a minima recusandae dolore, ducimus blanditiis dolorem. Dolore quibusdam itaque earum laborum consequatur.

- __Description:__

    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores voluptatem, maxime ratione reprehenderit consectetur adipisci minus recusandae quia asperiores, officiis eos natus voluptate corrupti quidem dolorem in animi. Quibusdam, maxime?


## Events
#### # dataform:set-data
- __Argument:__ `{Object} data`


- __Description:__

    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, eligendi. Dolorum suscipit maiores cum atque praesentium ex, corrupti libero repellendus magni commodi nam, doloribus saepe. Veniam dolor porro voluptas natus.

#### # dataform:clear-form
- __Description:__

    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, eligendi. Dolorum suscipit maiores cum atque praesentium ex, corrupti libero repellendus magni commodi nam, doloribus saepe. Veniam dolor porro voluptas natus.

#### # dataform:set-errors
- __Argument:__ `{Array} errors`

- __Description:__

    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, eligendi. Dolorum suscipit maiores cum atque praesentium ex, corrupti libero repellendus magni commodi nam, doloribus saepe. Veniam dolor porro voluptas natus.

#### # dataform:clear-errors
- __Description:__

    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, eligendi. Dolorum suscipit maiores cum atque praesentium ex, corrupti libero repellendus magni commodi nam, doloribus saepe. Veniam dolor porro voluptas natus.


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
