'use strict';


/**
 * practice Node.js Project
 * @author tigerxjtu
 **/

import {expect} from 'chai';
import {session} from '../test';

describe('topic', function () {

  // it('list', async function () {
  //
  //   const ret = await request.get('/api/topic/list');
  //   console.log(ret);
  //
  // });



  it('create topic', async function () { 
    const request = session();   

    {
      const ret = await request.post('/api/login', {
        name: 'test0',
        password: '12345678',
      });
      console.log(ret);
      expect(ret.token).to.be.a('string');
    }

    {
      const ret = await request.post('/api/topic/add', {
        title: '哈哈哈哈',
        content: '瓦赫哈哈哈',
        tags: 'test',
      });
      //console.log(ret);
      expect(ret.topic.title).to.equal('哈哈哈哈');
      expect(ret.topic.content).to.equal('瓦赫哈哈哈');
      console.log(ret.topic.tags);
      expect(ret.topic.tags).to.have.members(['test']);
    }


  });

  it(`create comment`,async function(){
    const request = session();
    {
      const ret = await request.post('/api/login', {
        name: 'test0',
        password: '12345678',
      });
      console.log(ret);
      expect(ret.token).to.be.a('string');
    }
    //test comment add
    {
      const ret = await request.post('/api/topic/item/578702f6abd194780b21aac8/comment/add', {
        content: 'comment test',
      });
      console.log(ret);
      
      expect(ret.comment.ok).to.equal(1);
      

    }

  });

});
