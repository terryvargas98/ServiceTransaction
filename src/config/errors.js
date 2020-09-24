const ERRORS = [
    {code: 400, type: 'BAD_REQUEST', message: 'The params are empty'},
    {code: 403, type: 'FORBIDDEN', message: 'The authentication for de microservice are incorrect'},
    {code: 400, type: 'ACCESS_DENIED', message: 'The authentication for de microservice are incorrect'},
];

exports.errorFormat = function (type, message = null) {
    const e = ERRORS.find(e => e.type == type); 
    return {  errorCode:e.code, errorName: e.type, message: e.message || message }
}