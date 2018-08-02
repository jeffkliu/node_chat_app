const expect = require('expect');
const {Users} = require('./users');
const {preUserList} = require('./seed')

describe('Testing users data structure', ()=>{
	var userList = new Users();

	beforeEach(function(){
		preUserList.forEach((element)=>{
			userList.addUser(element.id, element.name, element.room);
		})
	})

	afterEach(function(){
		userList.removeAll();
		expect(userList.getNumberOfUsers()).toBe(0);
	})

	it('should successfully add user', ()=>{
		var newUser = userList.addUser(11111, 'Jeff', 'Test');
		expect(newUser).toInclude({id: 11111, name: 'Jeff', room:'Test'})
	})

	it('should successfully get user', ()=>{
		expect(userList.getNumberOfUsers()).toBe(7);
		expect(userList.getUser(111)).toInclude({name: 'Jeff1'})
	})

	it('should not find user', ()=>{
		expect(userList.getUser(999)).toNotExist();
	})

	it('should successfully remove user', ()=>{
		userList.removeUser(111);
		//expect().toNotInclude({name:'Jeff1'});
		expect(userList.getNumberOfUsers()).toBe(6);
		expect(userList.getUser(111)).toBe(undefined);
	})

	it('should not removed user', ()=>{
		expect(userList.removeUser(999)).toNotExist();
	})

	it('should successly return users in particular room', ()=>{
		var filtered = userList.getUserList('Test1');
		expect(filtered.length).toBe(7);
		expect(filtered).toInclude('Jeff2');
		expect(filtered).toExclude('Hamburger');
	})
})