const _ = require('underscore');
var jwt = require('jsonwebtoken');
const moment = require('moment')
module.exports = () => {
    var _this = {
        checkReq: function (req, res, next) {
            const authorization = req.headers.authorization;
            if (!_.isUndefined(authorization) && !_.isNull(authorization) && !_.isEmpty(authorization)) {
                const token = authorization;

                jwt.verify(token, 'secret', (err, data) => {
                    if (err) {
                        req.token_status = 0;
                        res.status(403);
                        res.send("Token expired");

                    } else {
                          
                        res.token_status = 1;
                        req.iduser = data.iduser;
                        req.authorization = authorization;
                    }
                });
                next();
            } else {
                req.token_status = 0;
                res.status(403);
                res.send("Token Error");

            }
        }
    }

    return _this;
}