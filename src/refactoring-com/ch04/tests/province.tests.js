const assert = require('assert');
const { expect } = require('chai');
const { province } = require('../src/province.js');
const { sampleProvinceData } = require('../datasource/sampleData.js');

describe('province', function() {
    let asia;

    beforeEach(function() {
    asia = new province(sampleProvinceData());
    });

    it('shortfall', function() {
        assert.equal(asia.shortfall, 5);
    });

    it('profit', function() {
        expect(asia.profit).equal(230);
    });

    it('change production', function() {
        asia.producers[0].production = 20;
        expect(asia.shortfall).to.equal(-6);
        expect(asia.profit).to.equal(292);
      });
    
    it('zero demand', function() {
        asia.demand = 0;
        expect(asia.shortfall).to.equal(-25);
        expect(asia.profit).to.equal(0);
    });

    it('negative demand', function() {
        asia.demand = -1;
        expect(asia.shortfall).to.equal(-26);
        expect(asia.profit).to.equal(-10);
    });
      
    it('empty string demand', function() {
        asia.demand = "";
        expect(asia.shortfall).to.be.NaN;
        expect(asia.profit).to.be.NaN;
    });
      
    
});


describe('no producers', function() {
    let noProducers;
  
    beforeEach(function() {
      const data = {
        name: "No producers",
        producers: [],
        demand: 30,
        price: 20
      };
      noProducers = new province(data);
    });
  
    it('shortfall', function() {
      expect(noProducers.shortfall).to.equal(30);
    });
  
    it('profit', function() {
      expect(noProducers.profit).to.equal(0);
    });  
});


describe('string for producers', function() {
    it('', function() {
      const data = {
        name: "String producers",
        producers: "",
        demand: 30,
        price: 20
      };
      const prov = new province(data);
      expect(prov.shortfall).to.equal(0);
    });
  });
  
  