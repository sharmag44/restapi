const jwt = require("jsonwebtoken");
const token = jwt.sign({
    user_id:user_id,email,role},
process.env.TOKEN_KEY,{
    expiresIn:"2h"
}
);
module.export=token;