const UserFactory = require('./userFactory');

let userData = {
    Email: "example@example.com",
    
};

let consumer = UserFactory.createUser('consumer', userData);
let farmer = UserFactory.createUser('farmer', userData);
let landowner = UserFactory.createUser('landowner', userData);


