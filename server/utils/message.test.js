const expect = require('expect');
var {generateMessage} = require('./message');

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