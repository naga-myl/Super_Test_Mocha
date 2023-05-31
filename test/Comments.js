import supertest from 'supertest';
import { expect } from 'chai';
import dotenv from 'dotenv';
import { createRandomComments } from '../helpers/Comments_helper.js';
// Configuration
dotenv.config();
//Request
const request = supertest('https://gorest.co.in/public/v2/');
const token = process.env.USER_TOKEN;
describe(' /comments route', () => {
    let postId = null;
    before(async () => {
        const res = await request.get('posts').set('Authorization', `Bearer ${token}`);
        // console.log(res.body);
        postId = res.body[0].id;
    });
    it(' GET /comments', async () => {
        const res = await request.get('comments');
        //console.log(res);
        expect(res.body).to.not.be.empty;
    });
    it('POST /comments', async () => {
        const data = createRandomComments();
        data.post_id = postId;
        const res = await request
            .post('comments')
            .set('Authorization',`Bearer ${token}`)
            .send(data);
        expect(res.body).to.have.property('id');
        expect(res.body).to.have.property('email');
    //    userId = res.body.id
    });
    it.skip('PUT/comments/.id', async() => {
        const data = {
            name:'Test user updated'
        };
        //console.log(data)
       expect (data.name).to.equal(data.name);
   
    });
    it('DELETE /users/:id | User we just created', async() => {
        const res = await request
        .delete(`comments`)
        .set('Authorization', `Bearer ${token}`)
       // .send(data);
       expect(res.body.data).to.not.be.null;
        
    });
    it('GET /users/:id | Negative', async () => {
        const res =await request
        .get(`comments`);
        //console.log(res);
        expect(res.body.data).to.not.equal('Resource not found');
    });
    it('DELETE /users/:id | Negative', async () => {
        const res = await request
        .delete(`comments`)
        .set('Authorization', `Bearer ${token}`);
       //console.log(res);
       expect(res.body.data).to.not.equal('Resource not found');
    });
});