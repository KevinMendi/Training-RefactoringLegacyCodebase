const assert = require('assert');
const { province } = require('../src/province.js');
const { sampleProvinceData } = require('../datasource/sampleData.js');

describe('province', function() {
  it('shortfall', function() {
    const asia = new province(sampleProvinceData());
    assert.equal(asia.shortfall, 5);
  });
});
