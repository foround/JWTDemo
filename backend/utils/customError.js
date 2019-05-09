class customError extends Error{
    constructor({errcode,errmsg}){
        super(errmsg);
        this.code = errcode
    }
    info(){
        let {code,message} = this;
        return {errcode: code,errMsg: message}
    }
}
module.exports = customError;