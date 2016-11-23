import Vue from 'vue'
import DummyForm from './DummyForm'

describe('DataFormMixin.vue', () => {

  describe('props', () => {
    describe('keys props', () => {
      it('should be able to reference keys prop', () => {
        const vm = new Vue({
          template: '<dummy-form :keys="keys"></dummy-form>',
          components: {
            DummyForm
          },
          data: {
            keys: ['code', 'name']
          }
        }).$mount()
        expect(vm.$children[0].keys).not.to.be.undefine
      })
    })

    describe('#data prop', () => {
      it('should return empty object when data prop was not given', () => {
        const vm = new Vue({
          template: '<dummy-form :keys="keys"></dummy-form>',
          components: {
            DummyForm
          },
          data: {
            keys: ['code', 'name']
          }
        }).$mount()
        expect(vm.$children[0].data).to.be.empty
      })
      it('should return the correct object when data prop is given', () => {
        const vm = new Vue({
          template: '<dummy-form :keys="keys" :data="myData"></dummy-form>',
          components: {
            DummyForm
          },
          data: {
            keys: ['code', 'name'],
            myData: {code: 'foo', name: 'bar'}
          }
        }).$mount()
        expect(vm.$children[0].data).to.deep.equal(vm.myData)
      })
    })

    describe('#validateCallback prop', () => {
      it('should return empty string when the prop was not given', () => {
        const vm = new Vue({
          template: '<dummy-form :keys="keys"></dummy-form>',
          components: {
            DummyForm
          },
          data: {
            keys: ['code', 'name']
          }
        }).$mount()
        expect(vm.$children[0].validateCallback).to.be.empty
      })
      it('should return the correct value when the prop is given', () => {
        const vm = new Vue({
          template: '<dummy-form :keys="keys" validate-callback="myCallback"></dummy-form>',
          components: {
            DummyForm
          },
          data: {
            keys: ['code', 'name'],
          },
          methods: {
            myCallback: () => {
              return true
            }
          }
        }).$mount()
        expect(vm.$children[0].validateCallback).to.equal('myCallback')
      })
    })

    describe('#deleteButton prop', () => {
      it('should return false when the prop was not given', () => {
        const vm = new Vue({
          template: '<dummy-form :keys="[\'code\']"></dummy-form>',
          components: {
            DummyForm
          }
        }).$mount()
        expect(vm.$children[0].deleteButton).to.be.false
      })
      it('should return correct value when the prop is given', () => {
        const vm = new Vue({
          template: '<dummy-form :keys="[\'code\']" delete-button="true"></dummy-form>',
          components: {
            DummyForm
          }
        }).$mount()
        expect(vm.$children[0].deleteButton).to.be.true
      })
    })
  }) // --------------------------------- props

  // ************************************
  describe('methods', () => {
    describe('#setData()', () => {
      const vm = new Vue({
        template: '<dummy-form :keys="[\'code\', \'name\']" :data="myData"></dummy-form>',
        components: {
          DummyForm
        },
        data: {
          myData: null
        }
      }).$mount()
      let comp = vm.$children[0]

      it('should set isNew to true when the given data is null', () => {
        // setData() was called during the 'created' life-cycle
        expect(comp.isNew).to.be.true
      })
      it('should set isNew to false when the given data is not null', () => {
        comp.setData({code: 'foo'})
        expect(comp.isNew).to.be.false
      })
      it('should use given data to set input property correctly', () => {
        let data = {code: 'foo', name: 'bar'}
        comp.setData(data)
        expect(comp.input).to.deep.equal(data)
      })
      it('should use given data to only set input property that was defined in keys prop', () => {
        let data = {code: 'foo', name: 'bar', age: 30}
        comp.setData(data)
        expect(comp.input).to.deep.equal({code: 'foo', name: 'bar'})
      })
      it('should set all given keys in input property to empty string when the given data is null', () => {
        comp.setData(null)
        expect(comp.input).to.deep.equal({code: '', name: ''})
      })
    })

    describe('#clearErrors()', () => {
      it('should set errors property to null when called', () => {
        const vm = new Vue({
          template: '<dummy-form :keys="[\'code\', \'name\']"></dummy-form>',
          components: {
            DummyForm
          }
        }).$mount()
        let comp = vm.$children[0]

        comp.clearErrors()
        expect(comp.errors).to.be.null
      })
    })

    describe('#getEmptyInput()', () => {
      it('should return an object with all the given keys each with empty string value', () => {
        const vm = new Vue({
          template: '<dummy-form :keys="[\'code\', \'name\']"></dummy-form>',
          components: {
            DummyForm
          }
        }).$mount()
        let comp = vm.$children[0]

        expect(comp.getEmptyInput()).to.deep.equal({code: '', name: ''})
      })

      it('should return an object with nested keys each with empty string value', () => {
        const vm = new Vue({
          template: '<dummy-form :keys="[\'code\', \'name\', { name: \'obj\', value: [\'aa\']}]"></dummy-form>',
          components: {
            DummyForm
          }
        }).$mount()
        let comp = vm.$children[0]

        expect(comp.getEmptyInput()).to.deep.equal({code: '', name: '', obj: {aa: ''}})
      })
    })

    describe('#dispatchEvent()', () => {
      it('should dispatch an event with correct arguments', () => {
        const vm = new Vue({
          template: '<dummy-form :keys="[\'code\', \'name\']"></dummy-form>',
          components: {
            DummyForm
          }
        }).$mount()
        let comp = vm.$children[0]

        let spy = sinon.spy(comp, '$dispatch')

        comp.dispatchEvent('test', 'testing')
        expect(spy).to.be.calledWith(comp.eventPrefix+'test', 'testing')
      })
    })

    describe('#isDirty()', () => {
      const vm = new Vue({
        template: '<dummy-form :keys="[\'code\', \'name\']" :data="myData"></dummy-form>',
        components: {
          DummyForm
        },
        data: {
          myData: {code: 'foo', name: 'bar'}
        }
      }).$mount()
      let comp = vm.$children[0]

      it('should return false when data have not been modified', () => {
        expect(comp.isDirty()).to.be.false
      })
      it('should return true when data have been modified', () => {
        comp.input['name'] = 'baz'
        expect(comp.isDirty()).to.be.true
      })
    })

    describe('#callCallback()', () => {
      const vm = new Vue({
        template: '<dummy-form :keys="[\'code\', \'name\']" validate-callback="validate"></dummy-form>',
        components: {
          DummyForm
        },
        methods: {
          'validate': (args) => {
            return true
          }
        }
      }).$mount()
      let comp = vm.$children[0]

      it('should return true when the first argument evaluates to empty string', () => {
        expect(comp.callCallback('')).to.be.true
      })
      it('should return the result of the callback function when the callback is present', () => {
        expect(comp.callCallback('validate', 'foo')).to.be.true
      })
      it('should log error and return true when the given function does not exist', () => {
        sinon.spy(console, 'error')
        let result = comp.callCallback('dummy')
        expect(console.error).to.have.been.calledWith('Method "dummy" does not exist!')
        expect(result).to.be.true
      })
    })

    describe('#validationPasses()', () => {
      it('should return the correct result of validate-callback', () => {
        const vm = new Vue({
          template: '<dummy-form :keys="[\'code\', \'name\']" validate-callback="validate"></dummy-form>',
          components: {
            DummyForm
          },
          methods: {
            'validate': (args) => {
              return true
            }
          }
        }).$mount()
        expect(vm.$children[0].validationPasses()).to.be.true
      })
    })

    describe('#onSave()', () => {
      const vm = new Vue({
        template: '<dummy-form :keys="[\'code\', \'name\']" :data="myData"></dummy-form>',
        components: {
          DummyForm
        },
        data: {
          myData: {code: 'foo', name: 'bar'}
        }
      }).$mount()
      let comp = vm.$children[0]

      it('should dispatchEvent "no-changed" when data haven not been modified', () => {
        sinon.spy(comp, 'dispatchEvent')
        comp.onSave()
        expect(comp.dispatchEvent).to.have.been.calledWith('no-changed')
        comp.dispatchEvent.restore()
      })
      it('should dispatchEvent "stored" when data have been modified and isNew prop is true', () => {
        sinon.spy(comp, 'dispatchEvent')
        comp.isNew = true
        comp.input.name = 'baz'
        comp.onSave()
        expect(comp.dispatchEvent).to.have.been.calledWith('stored', comp.data)
        comp.dispatchEvent.restore()
      })
      it('should dispatchEvent "updated" when data have been modified and isNew prop is false', () => {
        sinon.spy(comp, 'dispatchEvent')
        comp.isNew = false
        comp.input.name = 'hello'
        comp.onSave()
        expect(comp.dispatchEvent).to.have.been.calledWith('updated', comp.data)
        comp.dispatchEvent.restore()
      })
      it('should just return when validate-callback returned false', () => {
        const vm = new Vue({
          template: '<dummy-form :keys="[\'code\', \'name\']" :data="myData" validate-callback="validate"></dummy-form>',
          components: {
            DummyForm
          },
          data: {
            myData: {code: 'foo', name: 'bar'}
          },
          methods: {
            validate: () => {
              return false
            }
          }
        }).$mount()
        let comp = vm.$children[0]

        comp.input.name = 'baz'
        expect(comp.onSave()).to.be.undefine
      })
    })

    describe('#onCancel()', () => {
      const vm = new Vue({
        template: '<dummy-form :keys="[\'code\', \'name\']" :data="myData"></dummy-form>',
        components: {
          DummyForm
        },
        data: {
          myData: {code: 'foo', name: 'bar'}
        }
      }).$mount()
      let comp = vm.$children[0]

      it('should dispatchEvent "cancelled"', () => {
        sinon.spy(comp, 'dispatchEvent')
        comp.onCancel()
        expect(comp.dispatchEvent).to.have.been.calledWith('cancelled')
        comp.dispatchEvent.restore()
      })
    })

    describe('#onDelete()', () => {
      const vm = new Vue({
        template: '<dummy-form :keys="[\'code\', \'name\']" :data="myData"></dummy-form>',
        components: {
          DummyForm
        },
        data: {
          myData: {code: 'foo', name: 'bar'}
        }
      }).$mount()
      let comp = vm.$children[0]

      it('should dispatchEvent "request-delete" with the original data as an argument', () => {
        sinon.spy(comp, 'dispatchEvent')
        comp.onDelete()
        expect(comp.dispatchEvent).to.have.been.calledWith('request-delete', vm.myData)
        comp.dispatchEvent.restore()
      })
    })

    describe('#clearForm()', () => {
      const vm = new Vue({
        template: '<dummy-form :keys="[\'code\', \'name\']" :data="myData"></dummy-form>',
        components: {
          DummyForm
        },
        data: {
          myData: {code: 'foo', name: 'bar'}
        }
      }).$mount()
      let comp = vm.$children[0]

      it('should set all input data to empty string', () => {
        expect(comp.input).to.deep.equal({code: 'foo', name: 'bar'})
        comp.clearForm()
        expect(comp.input).to.deep.equal({code: '', name: ''})
      })
    })

    describe('#setErrors()', () => {
      const vm = new Vue({
        template: '<dummy-form :keys="[\'code\', \'name\']" :data="myData"></dummy-form>',
        components: {
          DummyForm
        },
        data: {
          myData: {code: 'foo', name: 'bar'}
        }
      }).$mount()
      let comp = vm.$children[0]

      it('should given warning on console when the parameter type is not an object', () => {
        sinon.spy(console, 'warn')
        comp.setErrors('error message')
        expect(console.warn).to.have.been.calledWith('[warning] setErrors: the given parameter should be an object, "string" is given.')
        console.warn.restore()
      })
      it('should set errors property to the given parameter', () => {
        let errors = {code: 'required'}
        comp.setErrors(errors)
        expect(comp.errors).to.deep.equal(errors)
      })
    })

    describe('#hasError()', () => {
      const vm = new Vue({
        template: '<dummy-form :keys="[\'code\', \'name\']" :data="myData"></dummy-form>',
        components: {
          DummyForm
        },
        data: {
          myData: {code: 'foo', name: 'bar'}
        }
      }).$mount()
      let comp = vm.$children[0]

      it('should return false if no parameter is given and there is no error', () => {
        expect(comp.hasError()).to.be.false
      })
      it('should return true if the given key is null but errors property has been set', () => {
        let errors = {code: 'required'}
        comp.setErrors(errors)
        expect(comp.hasError(null)).to.be.true
      })
      it('should return true if the given key exists in the errors property', () => {
        let errors = {code: 'required'}
        comp.setErrors(errors)
        expect(comp.hasError('code')).to.be.true
      })
      it('should return false if the given key does not exist but the errors property has been set', () => {
        let errors = {code: 'required'}
        comp.setErrors(errors)
        expect(comp.hasError('name')).to.be.false
      })
    })

    describe('#getError()', () => {
      const vm = new Vue({
        template: '<dummy-form :keys="[\'code\', \'name\']" :data="myData"></dummy-form>',
        components: {
          DummyForm
        },
        data: {
          myData: {code: 'foo', name: 'bar'}
        }
      }).$mount()
      let comp = vm.$children[0]
      let errors = {code: 'this field is required'}
      comp.setErrors(errors)

      it('should return error message if the given key exists in the errors property', () => {
        expect(comp.getError('code')).to.equal(errors.code)
      })
      it('should return empty array if the errors property has been set but the given key is not in it', () => {
        expect(comp.getError('name')).to.deep.equal([])
      })
    })

    describe('#numericInputFilter()', () => {
      const vm = new Vue({
        template: '<dummy-form :keys="[\'code\', \'name\']"></dummy-form>',
        components: {
          DummyForm
        }
      }).$mount()
      let comp = vm.$children[0]
      let event = {
        key: '',
        preventDefault: function() {
          return 'dummy'
        }
      }

      it('should accept numeric character 0..9', () => {
        let spy = sinon.spy(event, 'preventDefault')

        let acceptables = '0123456789.-'
        let i = 0
        let chr
        while ((chr = acceptables.charAt(i)) !== '') {
          event.key = chr
          comp.numericInputFilter('', event)
          i++
        }

        expect(spy).to.have.not.been.called
        spy.restore()
      })
      it('should not accept any other character', () => {
        let spy = sinon.spy(event, 'preventDefault')

        let acceptables = 'abcDEF+,=/'
        let i = 0
        let chr
        while ((chr = acceptables.charAt(i)) !== '') {
          event.key = chr
          comp.numericInputFilter('', event)
          i++
        }

        expect(spy).to.have.callCount(acceptables.length)
        spy.restore()
      })
      it('should not accept another decimal point char "." if one is already existed', () => {
        let spy = sinon.spy(event, 'preventDefault')

        event.key = '.'
        comp.numericInputFilter('123.45', event)

        expect(spy).to.have.been.calledOnce
        spy.restore()
      })
      it('should not accept minus char "-" if it is not in the first position', () => {
        let spy = sinon.spy(event, 'preventDefault')

        event.key = '-'
        comp.numericInputFilter('12', event)

        expect(spy).to.have.been.calledOnce
        spy.restore()
      })
    })

  }) //---------------------------- methods

  describe('events', () => {
    const vm = new Vue({
      template: '<dummy-form :keys="[\'code\', \'name\']"></dummy-form>',
      components: {
        DummyForm
      }
    }).$mount()
    let comp = vm.$children[0]

    describe('#set-data', () => {
      it('should call setData() with correct argument', () => {
        let data = {code: 'foo', name: 'bar'}
        sinon.spy(comp, 'setData')
        vm.$broadcast('dataform:set-data', data)
        vm.$nextTick( () => {
          expect(comp.setData).to.have.been.calledWith(data)
        })
        comp.setData.restore()
      })
    })

    describe('#clear-form', () => {
      it('should call clearForm()', () => {
        sinon.spy(comp, 'clearForm')
        vm.$broadcast('dataform:clear-form')
        vm.$nextTick( () => {
          expect(comp.clearForm).to.have.been.called()
        })
        comp.clearForm.restore()
      })
    })

    describe('#set-errors', () => {
      it('should call setErrors() with correct argument', () => {
        let errors = {code: 'required'}
        sinon.spy(comp, 'setErrors')
        vm.$broadcast('dataform:set-errors', errors)
        vm.$nextTick( () => {
          expect(comp.setErrors).to.have.been.calledWith(error)
        })
        comp.setErrors.restore()
      })
    })

    describe('#clear-errors', () => {
      it('should call clearErrors()', () => {
        sinon.spy(comp, 'clearErrors')
        vm.$broadcast('dataform:clear-errors')
        vm.$nextTick( () => {
          expect(comp.clearErrors).to.have.been.called()
        })
        comp.clearErrors.restore()
      })
    })

  }) //----------------------------- events

}) //------------------------------- main
