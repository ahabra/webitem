import {expect} from '@esm-bundle/chai'
import * as webitem from '../webitem'
import {Domer} from "@techexp/jshelper";

describe('webitem performance tests', () => {
  const pathToLocalCss = 'src/test/perf-test.css'
  const propertyList = [ {name: 'life', value:42} ]
  const count = 10000

  console.log(`Each benchmark repeats ${count} times:`)

  it('benchmark with no css', () => {
    const nameWithDash = 'wi-perf-no-css'
    const html = `<h1>${nameWithDash}</h1>`

    const wasCreated = webitem.defineElement({nameWithDash, html, propertyList})
    expect(wasCreated).to.be.true
    const el = createAndAddElement(nameWithDash, `hello`)
    expect(getH1Color(el)).to.equal('rgb(0, 0, 0)')

    const usualDelay = 80
    benchmark('No CSS', nameWithDash, count, usualDelay)
  })

  it('benchmark with style in body', () => {
    const nameWithDash = 'wi-perf-style-in-body'
    const html = `
      <style>
        h1 { color: red; }
      </style>
      <h1>${nameWithDash}</h1>`

    const wasCreated = webitem.defineElement({nameWithDash, html, propertyList})
    expect(wasCreated).to.be.true
    const el = createAndAddElement(nameWithDash, `hello`)
    expect(getH1Color(el)).to.equal('rgb(255, 0, 0)')

    const usualDelay = 80
    benchmark('CSS style in body', nameWithDash, count, usualDelay)
  })


  it('benchmark with css link in html', () => {
    const nameWithDash = 'wi-perf-css-in-html'
    const html = `
      <link rel="stylesheet" href="${pathToLocalCss}">
      <h1>${nameWithDash}</h1>`

    const wasCreated = webitem.defineElement({nameWithDash, html, propertyList})
    expect(wasCreated).to.be.true
    const el = createAndAddElement(nameWithDash, `hello`)
    // FIXME why does this fail?
    // expect(getH1Color(el)).to.equal('rgb(255, 0, 0)')

    const usualDelay = 140
    benchmark('CSS link in html', nameWithDash, count, usualDelay)
  })

  it('benchmark with constructable sheet', () => {
    const nameWithDash = 'wi-perf-constructable-sheet'
    const html = `<h1 id="title">${nameWithDash}</h1>`

    const sheet = new CSSStyleSheet()
    sheet.replaceSync('h1 { color: red; }')

    const styleSheets = [sheet]

    const wasCreated = webitem.defineElement({nameWithDash, html,
      styleSheets,
      propertyList})
    expect(wasCreated).to.be.true
    const el = createAndAddElement(nameWithDash, `hello`)
    expect(getH1Color(el)).to.equal('rgb(255, 0, 0)')

    const usualDelay = 70
    benchmark('Constructable sheet', nameWithDash, count, usualDelay)
  })

})

function benchmark(title, wiName, count, usualDelay) {
  // warm up
  for (let i=0; i< 100; i++) {
    const el = createAndAddElement(wiName, `hello ${i}`)
    expect(el.wi.properties.life).to.equal(42)
  }

  const t0 = Date.now()
  for (let i=0; i< count; i++) {
    createAndAddElement(wiName, `hello ${i}`)
  }
  const end = Date.now()
  console.log(`${title}: Duration=${end-t0} millis. Usually about ${usualDelay} millis.`)
}

function createAndAddElement(name, content) {
  const el = Domer.createElement(name, {}, content)
  document.body.appendChild(el)
  return el
}

function getH1Color(el) {
  const h1 = Domer.first('h1', el.shadowRoot)
  const style = window.getComputedStyle(h1)
  return style.color
}

