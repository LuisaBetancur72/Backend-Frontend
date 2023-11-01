const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const registrationSchema = new Schema({
  firstname: {type:String, required:true},
  lastname: {type:String, required:true},
  email: {type:String, required:true,validate:{validator:function(value){
    return /.+@(gmail|outlook)\.(com)$/.test(value);
  },message: 'Por favor ingrese un correo válido (solo se permiten correos de Gmail o Outlook)'
  }, unique:true},
  password: {type:String, required:true},
});

module.exports = mongoose.model("RegisterCollection",registrationSchema);
