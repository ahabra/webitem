import {expect} from '@esm-bundle/chai'
import * as webitem from '../webitem'
import * as DomUtils from '../utils/DomUtils'


describe('webitem', () => {

  describe('defineElement', () => {
    it('creates a new element', () => {
      const name = 'wi-t1'
      webitem.defineElement({nameWithDash: name})
      createAndAddElement(name)
      createAndAddElement(name)
      const found = document.getElementsByTagName(name)

      expect(found.length).to.equal(2)
    })

    it('creates element with html and css', () => {
      const name = 'wi-t2'
      const html = '<h1>42</h1>'
      const css = 'h1 { color: red; }'
      webitem.defineElement({nameWithDash: name, html, css})
      createAndAddElement(name)
      const found = findElementByName(name)

      expect(found.shadowRoot.innerHTML).to.equal(`<style>${css}</style>${html}`)
    })

    it('creates element with html function', () => {
      const nameWithDash = 'wi-t3'
      function html(el) {
        const h = el.innerHTML
        return `<b>${h}</b>`
      }
      webitem.defineElement({nameWithDash, html})
      createAndAddElement(nameWithDash, 42)

      const found = findElementByName(nameWithDash)
      expect(found.shadowRoot.innerHTML).to.equal('<b>42</b>')
    })

    it('creates element with simple properties', ()=> {
      const nameWithDash = 'wi-t4'
      const propertyList = [
        {name: 'p1', value: 'v1'},
        {name: 'p2', value: 'v2'}
      ]
      webitem.defineElement({nameWithDash, propertyList})
      createAndAddElement(nameWithDash)

      const found = findElementByName(nameWithDash)
      expect(found.properties.p1).to.equal('v1')
      expect(found.properties.p2).to.equal('v2')

      found.properties.p1 = 10
      expect(found.properties.p1).to.equal(10)
    })

    describe('bounded properties', () => {
      const nameWithDash = 'wi-t5'
      const propertyList = [
        {name: 'country', value: 'Syria', sel: '#country'},
        {name: 'capital', value: 'Damascus', sel: '#capital'},
        {name: 'style', value: 'color:green', sel: 'h3', attr: 'style'}
      ]
      const html = `
      <div>
        <h3>Bound Properties</h3>
        <p>Country: <input id="country" type="text"></p>
        <p>Capital: <input id="capital" type="text"></p>
      </div>
      `
      webitem.defineElement({nameWithDash, html, propertyList})
      createAndAddElement(nameWithDash)
      const found = findElementByName(nameWithDash)
      const country = DomUtils.select('#country', found.shadowRoot)[0]

      it('populates properties values', () => {
        expect(found.properties.country).to.equal('Syria')
        expect(found.properties.capital).to.equal('Damascus')
        expect(found.properties.style).to.equal('color:green')
      })

      it('populates DOM elements from properties', () => {
        expect(country.value).to.equal('Syria')
        const h3 = DomUtils.select('h3', found.shadowRoot)[0]
        expect(h3.style.color).to.equal('green')
      })

      it('supports 2-way binding', () => {
        found.properties.country = 'Japan'
        expect(country.value).to.equal('Japan')

        country.value = 'USA'
        expect(found.properties.country).to.equal('USA')
      })

    })

    describe('event handling', () => {
      const nameWithDash = 'wi-t6'
      const html = `
        <div>
          <h3>wi-t6 - Events</h3>
          <button>Click Me</button>
          <span id="counter">0<span>
        </div>
      `
      const propertyList = [ {name: 'counter', value: '0', sel: '#counter'} ]

      function listener(ev, el) {
        const counter = parseInt(el.properties.counter, 10)
        el.properties.counter = counter + 1
      }

      const eventHandlerList = [ {sel: 'button', eventName: 'click', listener} ]

      webitem.defineElement({nameWithDash, html, propertyList, eventHandlerList})
      createAndAddElement(nameWithDash)

      it('listens to events', () => {
        const found = findElementByName(nameWithDash)
        expect(found.properties.counter).to.equal('0')
        const button = DomUtils.select('button', found.shadowRoot)[0]
        button.click()
        button.click()
        expect(found.properties.counter).to.equal('2')
      })

    })

    describe('property onChange', ()=> {
      const nameWithDash = 'wi-t9'
      const html = `
        <div>
          <h3>wi-t9 - onChange</h3>
        </div>
      `
      const record = {}
      const propertyList = [ {name: 'color', value: 'green',
        onChange: (el, oldValue, newValue) => {
          record.el = el
          record.oldValue = oldValue
          record.newValue = newValue
        }
      }]
      webitem.defineElement({nameWithDash, html, propertyList})
      const el = createAndAddElement(nameWithDash)

      it('runs onChange when a property value is changed', () => {
        el.properties.color = 'red'

        expect(record.el).to.equal(el)
        expect(record.oldValue).to.equal('green')
        expect(record.newValue).to.equal('red')
      })
    })

    describe('attempt to recreate item', ()=> {
      it('recreation returns false', ()=> {
        const nameWithDash = 'wi-t10'
        const html = '<h3>wi-t10 - recreate</h3>'
        let result = webitem.defineElement({nameWithDash, html})
        expect(result).to.be.true
        result = webitem.defineElement({nameWithDash, html})
        expect(result).to.be.false
      })
    })

  })  // defineElement

}) // webitem

function findElementByName(name) {
  const found = document.getElementsByTagName(name)
  if (found.length === 0) return null
  return found[0]
}

function createAndAddElement(name, content) {
  const el = DomUtils.createElement({name, content})

  document.body.appendChild(el)
  return el
}