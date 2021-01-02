import {expect} from '@esm-bundle/chai'
import * as DomUtils from '../DomUtils.js'


describe('DomUtils', ()=> {

  describe('createElement', ()=> {
    it('creates simple element', () => {
      const name = 'p'
      const attributes = {
        width: '10',
        color: 'blue'
      }
      const content = 'foo'
      const el = DomUtils.createElement({name, attributes, content})
      expect(el.tagName).to.equal(name.toUpperCase())
      expect(el.innerHTML).to.equal(content)
      const atts = el.attributes
      expect(atts.length).to.equal(2)
      expect(el.getAttribute('width')).to.equal(attributes.width)
      expect(el.getAttribute('color')).to.equal(attributes.color)
    })
  })

})