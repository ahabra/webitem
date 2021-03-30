import {expect} from '@esm-bundle/chai'
import * as webitem from '../webitem'
import {Domer, Objecter} from '@techexp/jshelper'


describe('webitem.defineElement()', () => {

  it('creates a new element', () => {
    const name = 'wi-t1'
    webitem.defineElement({nameWithDash: name})
    createAndAddElement(name)
    createAndAddElement(name)
    const found = document.getElementsByTagName(name)

    expect(found.length).to.equal(2)
  })

  it('creates element with html and css', () => {
    const nameWithDash = 'wi-t2'
    const html = '<h1>42</h1>'
    const css = 'h1 { color: red; }'
    webitem.defineElement({nameWithDash, html, css})
    createAndAddElement(nameWithDash)
    const found = findElementByName(nameWithDash)

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

  it('creates element with simple properties', () => {
    const nameWithDash = 'wi-t4'
    const propertyList = [
      {name: 'p1', value: 'v1'},
      {name: 'p2', value: 'v2'}
    ]
    webitem.defineElement({nameWithDash, propertyList})
    createAndAddElement(nameWithDash)

    const found = findElementByName(nameWithDash)
    expect(found.wi.properties.p1).to.equal('v1')
    expect(found.wi.properties.p2).to.equal('v2')

    found.wi.properties.p1 = 10
    expect(found.wi.properties.p1).to.equal(10)
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
    const country = Domer.first('#country', found.shadowRoot)

    it('populates properties values', () => {
      expect(found.wi.properties.country).to.equal('Syria')
      expect(found.wi.properties.capital).to.equal('Damascus')
      expect(found.wi.properties.style).to.equal('color:green')
    })

    it('populates DOM elements from properties', () => {
      expect(country.value).to.equal('Syria')
      const h3 = Domer.first('h3', found.shadowRoot)
      expect(h3.style.color).to.equal('green')
    })

    it('supports 2-way binding', () => {
      found.wi.properties.country = 'Japan'
      expect(country.value).to.equal('Japan')

      country.value = 'USA'
      expect(found.wi.properties.country).to.equal('USA')
    })

  })

  describe('event handling', () => {
    const nameWithDash = 'wi-t6'
    const html = `
        <div>
          <h3>${nameWithDash} - Events</h3>
          <button>Click Me</button>
          <span id="counter">0<span>
        </div>
      `
    const propertyList = [{name: 'counter', value: '0', sel: '#counter'}]

    function listener(ev, el) {
      const counter = parseInt(el.wi.properties.counter, 10)
      el.wi.properties.counter = counter + 1
    }

    const eventHandlerList = [{sel: 'button', eventName: 'click', listener}]

    webitem.defineElement({nameWithDash, html, propertyList, eventHandlerList})
    createAndAddElement(nameWithDash)

    it('listens to events', () => {
      const found = findElementByName(nameWithDash)
      expect(found.wi.properties.counter).to.equal('0')
      const button = Domer.first('button', found.shadowRoot)
      button.click()
      button.click()
      expect(found.wi.properties.counter).to.equal('2')
    })

  })

  describe('property onChange', () => {
    const nameWithDash = 'wi-t9'
    const html = `<h3>${nameWithDash} - onChange</h3>`
    const record = {}
    const propertyList = [{
      name: 'color', value: 'green',
      onChange: (el, oldValue, newValue) => {
        record.el = el
        record.oldValue = oldValue
        record.newValue = newValue
      }
    }]
    webitem.defineElement({nameWithDash, html, propertyList})
    const el = createAndAddElement(nameWithDash)

    it('runs onChange when a property value is changed', () => {
      el.wi.properties.color = 'red'

      expect(record.el).to.equal(el)
      expect(record.oldValue).to.equal('green')
      expect(record.newValue).to.equal('red')
    })
  })

  describe('attempt to recreate item', () => {
    it('recreation returns false', () => {
      const nameWithDash = 'wi-t10'
      const html = `<h3>${nameWithDash} - recreate</h3>`
      let result = webitem.defineElement({nameWithDash, html})
      expect(result).to.be.true
      result = webitem.defineElement({nameWithDash, html})
      expect(result).to.be.false
    })
  })

  describe('addProperty', ()=> {

    it('adds a simple property', ()=> {
      const nameWithDash = 'wi-t11'
      const html = `<h3>${nameWithDash} - addProperty</h3>`
      const propertyList = [
        {name: 'p1', value: 'v1'}
      ]
      webitem.defineElement({nameWithDash, html, propertyList})
      const el = createAndAddElement(nameWithDash)

      el.wi.addProperty('p2', 'v2')
      expect(el.wi.properties.p1).to.equal('v1')
      expect(el.wi.properties.p2).to.equal('v2')
    })

    it('adds a bounded property', ()=> {
      const nameWithDash = 'wi-t12'
      const html = `<h3>${nameWithDash} - addProperty - bounded</h3>`
      const propertyList = [
        {name: 'p1', value: 'v1'}
      ]
      webitem.defineElement({nameWithDash, html, propertyList})
      const el = createAndAddElement(nameWithDash)

      el.wi.addProperty('p2', undefined, 'h3')
      el.wi.properties.p2 = 'v2'

      expect(Domer.first('h3', el).innerHTML).to.equal('v2')
    })

  })

  describe('addAction', ()=> {
    it('adds action on the DOM  instance', ()=> {
      const nameWithDash = 'wi-t13'
      const html = `<h3>${nameWithDash} - addAction</h3>`
      webitem.defineElement({nameWithDash, html})
      const el = createAndAddElement(nameWithDash)

      expect(el.wi.actions.foo).to.be.undefined
      el.wi.addAction('foo', ()=> 42)
      expect(Objecter.isFunction(el.wi.actions.foo)).to.be.true
      expect(el.wi.actions.foo()).to.equal(42)
    })

    it('added action has its [this] equal to the webelement instance', ()=> {
      const nameWithDash = 'wi-t14'
      const html = `<h3>${nameWithDash} - addAction - THIS</h3>`
      webitem.defineElement({nameWithDash, html})
      const el = createAndAddElement(nameWithDash)

      el.wi.addAction('foo', function() {
        return this
      })

      expect(el.wi.actions.foo()).to.equal(el)
    })

  })

  describe('addEventListener', ()=> {
    it('adds an event listener to the element', ()=> {
      const nameWithDash = 'wi-t15'
      const html = `<h3>${nameWithDash} - addEventListener</h3>
      <button>Click Me</button>`

      webitem.defineElement({nameWithDash, html})
      const el = createAndAddElement(nameWithDash)
      let counter = 0
      el.wi.addEventListener('button', 'click', (ev, root)=> counter++ )

      const button = Domer.first('button', el)
      button.click()

      expect(counter).to.equal(1)
    })
  })

}) // webitem.defineElement()

function findElementByName(name) {
  const found = document.getElementsByTagName(name)
  if (found.length === 0) return null
  return found[0]
}

function createAndAddElement(name, content) {
  const el = Domer.createElement(name, {}, content)

  document.body.appendChild(el)
  return el
}