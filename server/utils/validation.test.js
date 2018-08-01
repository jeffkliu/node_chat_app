const expect = require('expect');
const {isRealString} = require('./validation')

describe('validaion test', ()=>{
	it('should reject non-string values', ()=>{
		var int = 123;
		expect(isRealString(int)).toBe(false);
	})
	it('should reject string with only spaces', ()=>{
		var spaces = '     ';
		expect(isRealString(spaces)).toBe(false);
	})
	it('should allow string with non-space characters', ()=>{
		var text = '    b u mm e r   ';
		expect(isRealString(text)).toBe(true);
	})
})