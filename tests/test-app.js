const expect = require('node_modules/chai/chai.js').expect;
const render = require('../js/app.js').render;
const search = require('../js/app.js').search;

describe('search', function() {
    console.log('hello pls');
    // beforeEach(function() {
    //     this.server = sinon.fakeServer.create();
    //     this.car = new Car();
    //     sinon.stub(this.car, "moveForward");
    //     sinon.stub(this.car, "stayPut");
    // });
    // afterEach(function() {
    //     this.server.restore();
    //     this.car.moveForward.restore();
    //     this.car.stayPut.restore();
    //     delete this.car;
    // });
    // it("should call moveForward, when server responds with canMove as True", function(done) {
    //     this.server.respondWith("GET", "/check_forward_movement_ability.json", [200, {
    //             "Content-Type": "application/json"
    //         },
    //         '{ "canMove": true }'
    //     ]);
    //     this.car.driveForward(5);
    //     this.server.respond();
    //     sinon.assert.calledOnce(this.car.moveForward);
    //     //Tell mocha to wait for response, and then run the test
    //     //by calling done() callback
    //     done();
    // });
});
