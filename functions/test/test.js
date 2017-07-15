const chai = require('chai');
const assert = chai.assert;

const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

const sinon = require('sinon');

describe('Cloud Functions', () => {
  var myFunctions, configStub, adminInitStub, functions, admin;

  before(() => {
    admin = require('firebase-admin');
    adminInitStub = sinon.stub(admin, 'initializeApp');
    functions = require('firebase-functions');
    configStub = sinon.stub(functions, 'config').returns({
      firebase: {
        databaseURL: 'https://not-a-project.firebaseio.com',
        storageBucket: 'not-a-project.appspot.com',
      }
    });
    myFunctions = require('../index');
  });

  after(() => {
    configStub.restore();
    adminInitStub.restore();
  });

  describe('makeUpperCase', () => {
    it('should upper case input and write it to /uppercase', () => {

      const fakeEvent = {
        data: new functions.database.DeltaSnapshot(null, null, null, 'input'),
      };

      const childParam = 'uppercase';
      const setParam = 'INPUT';
      const refStub = sinon.stub();
      const childStub = sinon.stub();
      const setStub = sinon.stub();
      Object.defineProperty(fakeEvent.data, 'ref', { get: refStub });
      refStub.returns({ parent: { child: childStub } });
      childStub.withArgs(childParam).returns({ set: setStub });
      setStub.withArgs(setParam).returns(true);
      return assert.eventually.equal(myFunctions.makeUppercase(fakeEvent), true);
    })
  });

  describe('addMessage', () => {
    it('should return a 303 redirect', (done) => {

      const refParam = '/messages';
      const pushParam = { original: 'input' };
      const refStub = sinon.stub();
      const pushStub = sinon.stub();

      databaseStub = sinon.stub(admin, 'database');
      databaseStub.returns({ ref: refStub });
      refStub.withArgs(refParam).returns({ push: pushStub });
      pushStub.withArgs(pushParam).returns(Promise.resolve({ ref: 'new_ref' }));

      const req = { query: { text: 'input' } };
      const res = {
        redirect: (code, url) => {
          assert.equal(code, 303);
          assert.equal(url, 'new_ref');
          done();
        }
      };

      myFunctions.addMessage(req, res);

      databaseStub.restore();
    });
  });
})