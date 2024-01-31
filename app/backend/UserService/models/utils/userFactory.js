const User = mongoose.model('User', userSchema);

const UserFactory = {
    createUser: function (role, userData) {
        const newUser = new User(userData);
        switch (role) {
            case 'consumer':
                newUser.consumerSpecificMethod = function() {
                    // Consumer
                };
                break;
            case 'farmer':
                newUser.farmerSpecificMethod = function() {
                    // Farmer
                };
                break;
            case 'landowner':
                newUser.landownerSpecificMethod = function() {
                    // Landowner
                };
                break;
            default:
                // Default behavior for unspecified roles
                break;
        }
        
        return newUser;
    }
};

module.exports = UserFactory;
