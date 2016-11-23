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
      input: null,
      errors: null,
      isNew: false
    }
  },
  created: function () {
    this.setData(this.data)
  },
  methods: {
    setData: function (data) {
      this.isNew = data === null ? true : false
      // clear errors
      this.clearErrors()
      // create empty object
      this.data = data || this.getEmptyInput()
      this.input = this.getEmptyInput()
      if (data !== null) {
        var self = this
        this.keys.forEach(function(key) {
          if (data[key] !== undefined) {
            self.input[key] = data[key]
          }
        })
      }
    },
    getEmptyInput: function () {
      return this.getEmptyObject(this.keys)
    },
    getEmptyObject: function(keys) {
      var self = this
      var obj = {}
      keys.forEach(function(key) {
        if (typeof(key) === 'object') {
          obj[key.name] = self.getEmptyObject(key.value)
        } else {
          obj[key] = ''
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

      if (! this.validationPasses()) {
        return
      }

      var self = this
      this.keys.forEach(function(key) {
        self.data[key] = self.input[key]
      })
      var event = this.isNew ? 'stored' : 'updated'
      this.dispatchEvent(event, this.data)
    },
    onCancel: function () {
      this.dispatchEvent('cancelled')
    },
    onDelete: function () {
      this.dispatchEvent('request-delete', this.data)
    },
    validationPasses: function() {
      return this.callCallback(this.validateCallback, [this.input, this.isNew])
    },
    callCallback: function (func, args) {
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
      var dirty = false
      var self = this
      this.keys.forEach(function(key) {
        if (self.data[key] !== self.input[key]) {
          dirty = true
          return
        }
      })
      return dirty
    },
    setErrors: function(errors) {
      if (typeof(errors) !== 'object') {
        console.warn('[warning] setErrors: the given parameter should be an object, "' + typeof(errors) + '" is given.')
      }

      this.errors = errors
    },
    hasError: function(name) {
      name = name || null
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
