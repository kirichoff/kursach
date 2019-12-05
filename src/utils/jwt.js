const jsonwebtoken = require('jsonwebtoken');
const privateKey = 'Kursachk po bd';
 function generate(user) {
    return jsonwebtoken.sign({
        data: user
    }, privateKey, { expiresIn: '1h' });
}
function verify(token) {
     try {
         return jsonwebtoken.verify(token, privateKey)
     }
     catch (e) {
         return false
     }
}

const jwt = {generate,verify};
module.exports = jwt;
