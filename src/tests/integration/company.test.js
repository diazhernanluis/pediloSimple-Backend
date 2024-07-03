const { expect } = require('chai');
const supertest = require('supertest');
const { company_1 } = require('../mocks/companyMocks');
const companies = require('../../services/company.services');

const requester = supertest('http://localhost:8081');


describe(' Integration test - company.js', function() {
    this.timeout(5000);

    before( () => {
        companies.deleteAll();
        console.log("asdada");
    });

    it('get all companies', async () => {
        const result = await requester.get('/v1/clients');

        expect(result.body).to.be.an('array');
        expect(result.ok).to.be.true;
        expect(result.statusCode).to.be.equal(200);
    });

    it('insert user', async () => {

        const result = await requester.post('/v1/clients/register').send(company_1);
        console.log(result.status);
        console.log(result.text);

        expect(result.ok).to.be.true;
        expect(result.statusCode).to.be.equal(200);
        expect(result.body).to.be.an('object');
    });

    it('it should login user', async () => {
        const email = company_1.email;
        const password = company_1.password;

        const result = await requester.post('/v1/clients/login').send({email, password});

        expect(result.ok).to.be.true;
        expect(result.statusCode).to.be.equal(200);
        expect(result.body).to.be.an('object');
        expect(result.body.rol).to.be.equal('user')
    });

    // it('update user - debe fallar si no envio el Id', async () => {
    //     const result = await requester.put('/v1/clients').send(user1);

    //     expect(result.error.text).to.deep.equal('Id es mandatorio');
    //     expect(result.ok).to.be.false;
    //     expect(result.statusCode).to.be.equal(400);
    // });

    // it('update user - update correcto', async () => {
    //     const result = await requester.post('/v1/clients').send(user1);

    //     expect(result.ok).to.be.true;

    //     const id = result.body._id;

    //     const resultUpdate = await requester.put(`/v1/api/user?id=${id}`);
    //     expect(resultUpdate.ok).to.be.true;
    //     expect(result.statusCode).to.be.equal(200);
    // })
});