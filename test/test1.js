'use strict';

/**
* practice Node.js Project
* @author tigerxjtu
**/

const expect=require('chai').expect;

describe('my test', function(){
  it('#1',function(){
    expect(1).to.equal(1);
  });

  it('#2',function(){
    expect(1).to.equal(2);
  });

  it('#3',function(done){
    setTimeout(function(){
      expect(2).to.equal(2);
      done();
    },1000);  
  });

  it('#4',function(){
    return new Promise((resolve,reject)=>{
       setTimeout(function(){
          expect(2).to.equal(2);
          resolve();
        },1000);
    });
  });

});
