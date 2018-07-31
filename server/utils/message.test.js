const expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', ()=>{
	it('should generate the correct message object', ()=>{
		// store res in variable
		// assert from match
		// assert text match
		// assert createdAt is number

		var res = generateMessage('jeff', 'where you at?');

		expect(res.from).toBe('jeff');
		expect(res.text).toBe('where you at?');
		expect(res.createdAt).toBeA('number');

	});
});

describe('generateLocationMessage', ()=>{
	it('should generate correct location object', ()=>{
		var from = 'Jeff';
		var longitude = 99;
		var latitude = 99;

		var res = generateLocationMessage(from, latitude, longitude);

		expect(res.from).toBe('Jeff');
		expect(res).toInclude({from, url:`https://www.google.com/maps?q=99,99`});
	});
});