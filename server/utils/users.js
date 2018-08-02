// array to store user object

// addUser(od. name, room)

// removeUser(id)

// getUserList(room)

class Users {
	constructor(){
		this.users = [];
	}

	addUser(obj){
		if('id'in obj &&'name'in obj &&'room'in obj){
			this.users.push(obj)
		}
		return obj;
	}

	addUser(id, name, room){
		var user ={id, name, room};
		this.users.push(user);
		return user;
	}

	getUser(id){
		return this.users.find(user=>user.id === id);
	}

	removeUser(id){
		var removed = this.getUser(id);
		if(removed){
			this.users = this.users.filter((user)=>user.id!==id);
		}

		return removed;
	}

	removeAll(){
		if(this.users.length === 0 ){
			return false;
		}

		this.users = [];
		return true;
	}

	getUserList(room){
		var filtered=  this.users.filter(user=>user.room === room)
		return filtered.map(user=>user.name);
	}

	getNumberOfUsers(){
		return this.users.length;
	}
}

module.exports = {Users}