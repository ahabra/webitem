import {expect} from '@esm-bundle/chai'
import * as webitem from '../webitem'


describe('webitem', () => {

  describe('defineElement', () => {
    it('creates a new element', () => {
      const name = 'test-el1'
      webitem.defineElement({nameWithDash: name})
      const el = document.createElement(name)
      document.body.appendChild(el)
      const found = document.getElementsByTagName(name)

      expect(found.length).to.equal(1)
    })


  })


})

