const fs = require('fs');
const path = require('path');
const assert = require('assert');
const loader = require('..');

const fixtureDirs = fs.readdirSync(__dirname).filter(f => f.indexOf('.') < 0);

fixtureDirs.forEach(d => describe(d, () => it('input should match output', () => {
  const input = fs.readFileSync(path.join(__dirname, d, 'input'), 'utf8');
  const output = fs.readFileSync(path.join(__dirname, d, 'output'), 'utf8');
  assert.equal(loader(input), output, d);
})))
