import {expect} from '@esm-bundle/chai'
import * as StringUtils from '../StringUtils'

describe('StringUtils', ()=> {

  describe('isEmpty', () => {
    it('checks for null of undefined or zero length', () => {
      expect(StringUtils.isEmpty()).to.be.true
      expect(StringUtils.isEmpty(undefined)).to.be.true
      expect(StringUtils.isEmpty(null)).to.be.true
      expect(StringUtils.isEmpty('')).to.be.true
      expect(StringUtils.isEmpty(' ')).to.be.false
    })
  })

  describe('trim', ()=> {
    it('returns empty string if given undefined, null or empty', ()=> {
      expect(StringUtils.trim()).to.equal('')
      expect(StringUtils.trim(null)).to.equal('')
      expect(StringUtils.trim('')).to.equal('')
    })

    it('trims strings', ()=> {
      expect(StringUtils.trim(' a ')).to.equal('a')
    })

    it('converts non-string then trim', ()=> {
      expect(StringUtils.trim(1)).to.equal('1')
    })
  })

})