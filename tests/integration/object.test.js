const request = require('supertest');
const faker = require('faker');
const httpStatus = require('http-status');
const app = require('../../src/app');
const setupTestDB = require('../utils/setupTestDB');
const { keyValueOne, keyValueTwo } = require('../fixtures/object.fixture');
const { userOneAccessToken, adminAccessToken } = require('../fixtures/token.fixture');
const { userOne, userTwo, admin, insertUsers } = require('../fixtures/user.fixture');
const { createObject } = require('../../src/services/object.service');
const { sleep } = require('../../src/utils/helpers');

setupTestDB();

describe('keyValue routes', () => {
  describe('POST /v1/objects', () => {
    let newkeyValue;

    beforeEach(() => {
      newkeyValue = {
        book: faker.name.findName(),
        price: faker.commerce.price(),
      };
    });

    test('should return 201 and successfully create new object if data is ok', async () => {
      await insertUsers([admin]);
      const res = await request(app)
        .post('/v1/objects')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .send(newkeyValue)
        .expect(httpStatus.CREATED);
      const bodyFromPostRequest = res.body;
      expect(bodyFromPostRequest.length).toEqual(Object.keys(newkeyValue).length);
      bodyFromPostRequest.forEach((element) => {
        expect(Object.keys(newkeyValue)).toEqual(expect.arrayContaining([element.key]));
      });
    });

    test('should return 201 and successfully create new object if data is ok for 3 or more keys', async () => {
      await insertUsers([admin]);
      newkeyValue.length = faker.random.number();
      const res = await request(app)
        .post('/v1/objects')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .send(newkeyValue)
        .expect(httpStatus.CREATED);
      const bodyFromPostRequest = res.body;
      expect(bodyFromPostRequest.length).toEqual(Object.keys(newkeyValue).length);
      bodyFromPostRequest.forEach((element) => {
        expect(Object.keys(newkeyValue)).toEqual(expect.arrayContaining([element.key]));
      });
    });

    test('should return 401 error is access token is missing', async () => {
      await request(app).post('/v1/objects').send(newkeyValue).expect(httpStatus.UNAUTHORIZED);
    });

    test('should return 403 error if logged in object is not admin', async () => {
      await insertUsers([userOne]);
      await request(app)
        .post('/v1/objects')
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .send(newkeyValue)
        .expect(httpStatus.FORBIDDEN);
    });

    test('should return 201 error if key is already taken', async () => {
      await insertUsers([admin, userOne]);

      await request(app)
        .post('/v1/objects')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .send(newkeyValue)
        .expect(httpStatus.CREATED);
      newkeyValue.book = faker.name.findName();
      const res = await request(app)
        .post('/v1/objects')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .send(newkeyValue)
        .expect(httpStatus.CREATED);
      const bodyFromPostRequest = res.body;
      expect(bodyFromPostRequest.length).toEqual(Object.keys(newkeyValue).length);
      bodyFromPostRequest.forEach((element) => {
        expect(Object.keys(newkeyValue)).toEqual(expect.arrayContaining([element.key]));
      });
    });
  });
  describe('GET /v1/objects/:key', () => {
    test('should return 200 and the object if data is ok, passing data in param', async () => {
      await insertUsers([admin]);
      const objectFromDatabase = await createObject(keyValueOne);
      const res = await request(app)
        .get(`/v1/objects/${objectFromDatabase[0].key}`)
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .send()
        .expect(httpStatus.OK);
      expect(res.body).not.toHaveProperty('history');
      expect(res.body).toEqual({
        key: objectFromDatabase[0].key,
        value: objectFromDatabase[0].value,
        timestamp: objectFromDatabase[0].timestamp,
      });
    });

    test('should return 200 and the object if data is ok, passing data in param and query', async () => {
      await insertUsers([admin]);
      const objectFromDatabase = await createObject(keyValueOne);
      const res = await request(app)
        .get(`/v1/objects/${objectFromDatabase[0].key}?timestamp=${objectFromDatabase.timestamp}`)
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .send()
        .expect(httpStatus.OK);
      expect(res.body).not.toHaveProperty('history');
      expect(res.body).toEqual({
        key: objectFromDatabase[0].key,
        value: objectFromDatabase[0].value,
        timestamp: objectFromDatabase[0].timestamp,
      });
    });

    test('When given a key AND a timestamp, return whatever the value of the key at the time was.', async () => {
      await insertUsers([admin]);
      const obj = keyValueOne;
      const objectFromDatabase = await createObject(keyValueOne);
      const res = await request(app)
        .get(`/v1/objects/${objectFromDatabase[0].key}?timestamp=${objectFromDatabase.timestamp}`)
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .send()
        .expect(httpStatus.OK);
      expect(res.body).not.toHaveProperty('history');
      expect(res.body).toEqual({
        key: objectFromDatabase[0].key,
        value: objectFromDatabase[0].value,
        timestamp: objectFromDatabase[0].timestamp,
      });
      const x = objectFromDatabase[0].key;
      obj[x] = 'abcd';
      await sleep(500);
      const objectFromDatabase2 = await createObject(obj);
      const res2 = await request(app)
        .get(`/v1/objects/${objectFromDatabase2[0].key}?timestamp=${objectFromDatabase[0].timestamp}`)
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .send()
        .expect(httpStatus.OK);
      expect(res2.body).not.toHaveProperty('history');
      expect(res2.body).toEqual({
        key: objectFromDatabase[0].key,
        value: objectFromDatabase[0].value,
        timestamp: objectFromDatabase[0].timestamp,
      });
    });

    test('should return 401 error if access token is missing', async () => {
      await insertUsers([admin]);

      await request(app).get(`/v1/objects/${keyValueOne._id}`).send().expect(httpStatus.UNAUTHORIZED);
    });

    test('should return 403 error if object is trying to get another object', async () => {
      await insertUsers([userOne, userTwo]);

      await request(app)
        .get(`/v1/objects/${keyValueTwo._id}`)
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .send()
        .expect(httpStatus.FORBIDDEN);
    });

    test('should return 404 error if key is not found', async () => {
      await insertUsers([admin]);
      await request(app)
        .get(`/v1/objects/${faker.name.findName()}`)
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .send()
        .expect(httpStatus.NOT_FOUND);
    });
  });
});
