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

  describe('tag', ()=> {
    it('creates html for a tag with attributes', ()=> {
      const name = 'p'
      const attributes = {
        width: '10',
        color: 'blue'
      }
      const content = 'foo'
      const tag = DomUtils.tag({name, attributes, content})
      const expected = '<p width="10" color="blue">foo</p>'
      expect(tag).to.equal(expected)
    })

    it('creates html for a tag with no attributes', ()=> {
      const name = 'p'
      const content = 'foo'
      const tag = DomUtils.tag({name, content})
      const expected = '<p>foo</p>'
      expect(tag).to.equal(expected)
    })
  })

})