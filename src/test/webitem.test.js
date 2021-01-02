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
      const css = `h1 { color: red; }`
      webitem.defineElement({nameWithDash: name, html, css})
      createAndAddElement(name)
      const found = document.getElementsByTagName(name)

      expect(found.length).to.equal(1)
      expect(found[0].shadowRoot.innerHTML).to.equal(`<style>${css}</style>${html}`)
    });

    it('creates element with html function', () => {
      const nameWithDash = 'wi-t3'
      function html(el) {
        const h = el.innerHTML
        return `<b>${h}</b>`
      }
      webitem.defineElement({nameWithDash, html})
      createAndAddElement(nameWithDash, 42)

      const found = document.getElementsByTagName(nameWithDash)
      expect(found[0].shadowRoot.innerHTML).to.equal(`<b>42</b>`)
    })

    it('creates element with proerties', ()=> {

    })

  })


})

function createAndAddElement(name, content) {
  const el = DomUtils.createElement({name, content})

  document.body.appendChild(el)
  return el
}