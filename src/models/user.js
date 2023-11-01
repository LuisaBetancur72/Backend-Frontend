const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstname: {type:String, required:true},
    lastname: {type:String, required:true},
    country: {type:String, required:true},
    department: {type:String, required:true},
    municipality: {type:String, required:true},
    document_type: {type:String, required:true},
    document: {type:String, required:true, unique:true},
    email: {type:String, required:true,validate:{validator:function(value){
        return /.+@(gmail|outlook)\.(com)$/.test(value);
    },message: 'Por favor ingrese un correo válido (solo se permiten correos de Gmail o Outlook)'
    }, unique:true},
    password: {type:String, required:true},
    avatar: {type:String, null:false},
    active: {type:Boolean, default:false},
    role: {type:String, default:"guess"}
});

module.exports = mongoose.model("User",userSchema);