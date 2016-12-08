<script>
export default {
  props: {
    keys: {
      type: Array,
      required: true
    },
    data: {
      type: Object,
      default: function () {
        return {}
      }
    },
    validateCallback: {
      type: String,
      default: ''
    },
    deleteButton: {
      type: Boolean,
      default: false,
      coerce: function(val) {
        return JSON.parse(val)
      }
    }
  },
  data: function () {
    return {
      eventPrefix: 'dataform:',
      input: {},
      errors: null,
      isNew: false
    }
  },
  created: function () {
    this.setData(this.data)
  },
  methods: {
    setData: function (data) {
      this.beforeSetData()
      this.isNew = false
      // clear errors
      this.clearErrors()

      if (this.isEmptyObject(data)) {
        this.isNew = true
        // create empty input
        this.data = this.getEmptyInput()
        this.input = this.getEmptyInput()
      } else {
        // this.data = data
        this.copyObject(this.input, data, this.keys)
        this.copyObject(this.data, this.input, this.keys)
      }

      this.afterSetData()
    },
    beforeSetData: function() {},
    afterSetData: function() {},
    isEmptyObject: function(obj) {
      return obj === undefined || obj === null || Object.keys(obj).length === 0
    },
    copyObject: function(target, source, keys) {
      var self = this
      keys.forEach(function(key) {
        if (typeof(key) === 'object') {
          target[key.name] = {}
          self.copyObject(target[key.name], source[key.name], key.value)
        } else {
          if (source[key]) {
            target[key] = source[key]
          }
        }
      })
    },
    getEmptyInput: function () {
      return this.getEmptyObject(this.keys)
    },
    getEmptyObject: function(keys, defaultValue) {
      defaultValue = defaultValue === undefined ? '' : defaultValue
      var self = this
      var obj = {}
      keys.forEach(function(key) {
        if (typeof(key) === 'object') {
          obj[key.name] = self.getEmptyObject(key.value, defaultValue)
        } else {
          obj[key] = defaultValue
        }
      })
      return obj
    },
    dispatchEvent: function(eventName, args) {
      args = args || []
      this.$dispatch(this.eventPrefix + eventName, args)
    },
    onSave: function () {
      if (!this.isDirty()) {
        this.dispatchEvent('no-changed')
        return
      }

      this.beforeValidate()

      if (! this.validationPasses()) {
        return
      }

      this.afterValidate()

      var modifiedData = this.getEmptyInput()
      this.copyObject(modifiedData, this.input, this.keys)

      var event = this.isNew ? 'stored' : 'updated'

      // allow data transformation before dispatching modified data
      modifiedData = this.transform(modifiedData)
      this.dispatchEvent(event, modifiedData)
    },
    beforeValidate: function() {},
    afterValidate: function() {},
    transform: function(data) {
      return data
    },
    onCancel: function () {
      this.dispatchEvent('cancelled')
    },
    onDelete: function () {
      this.dispatchEvent('request-delete', this.data)
    },
    validationPasses: function() {
      return this.callValidationCallback(this.validateCallback, [this.input, this.isNew])
    },
    callValidationCallback: function (func, args) {
      if (func.trim() === "") return true

      args = args || []
      if (!(args instanceof Array)) {
        args = [args]
      }
      if (typeof this.$parent[func] == 'function') {
        return this.$parent[func].apply(this.$parent, args)
      }

      console.error('Method "'+func+'" does not exist!')
      return true
    },
    clearForm: function () {
      this.input = this.getEmptyInput()
    },
    isDirty: function () {
      return ! this.isEqual(this.data, this.input, this.keys)
    },
    isEqual: function(obj1, obj2, keys, deep) {
      deep = deep === undefined ? true : deep
      var self = this
      var result = true

      keys.forEach(function(key) {
        // if there is any false, don't bother continue
        if (result === false) { return }

        if (typeof(key) === 'object' && deep === true) {
          result = self.isEqual(obj1[key.name], obj2[key.name], key.value)
        } else {
          if (obj1[key] !== obj2[key]) {
            result = false
          }
        }
      })

      return result
    },
    setErrors: function(errors) {
      if (typeof(errors) !== 'object') {
        console.warn('[warning] setErrors: the given parameter should be an object, "' + typeof(errors) + '" is given.')
      }

      this.errors = errors
    },
    hasError: function(name) {
      name = name === undefined ? null : name
      if (this.errors === null) return false
      if (name === null && this.errors) return true
      if (this.errors[name] !== undefined) return true

      return false
    },
    getError: function(name) {
      if (this.errors && this.errors[name] !== undefined) {
        return this.errors[name]
      }
      return []
    },
    clearErrors: function() {
      this.errors = null
    },
    numericInputFilter: function(value, event) {
      var valid = true
      // check valid characters first
      if ('0123456789.-'.indexOf(event.key) < 0) {
        valid = false
      }
      // do not allow decimal if it's already exist
      if (event.key === '.' && value.indexOf('.') >= 0) {
        valid = false
      }
      if (event.key === '-' && value.trim() !== '') {
        valid = false
      }

      if (!valid) {
        event.preventDefault()
      }
    },
  },
  events: {
    'dataform:set-data': function (data) {
      this.setData(data)
    },
    'dataform:clear-form': function () {
      this.clearForm()
    },
    'dataform:set-errors': function(errors) {
      this.setErrors(errors)
    },
    'dataform:clear-errors': function() {
      this.clearErrors()
    }
  }
}
</script>
