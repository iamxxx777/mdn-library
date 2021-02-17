var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var { DateTime } = require('luxon');

var AuthorSchema = new Schema(
    {
        first_name: {type: String, required: true, maxlength: 100},
        family_name: {type: String, required: true, maxlength: 100},
        date_of_birth: {type: Date},
        date_of_death: {type: Date}
    }
);

AuthorSchema.
    virtual('name').
    get(function () {
            return this.family_name + ', ' + this.first_name;
        });

AuthorSchema.
    virtual('lifespan').
    get(function () {
            return (this.date_of_death.getYear() - this.date_of_birth.getYear()).toString();
        });

AuthorSchema.
    virtual('lex_date_of_death').
    get(function() {
        return this.date_of_death ? DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED) : '';    
    });
    
AuthorSchema.
    virtual('lex_date_of_birth').
    get(function() {
        return this.date_of_birth ? DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED) : '';    
    });

AuthorSchema.
    virtual('url').
    get(function () {
            return '/catalog/author/' + this._id;
        });

module.exports = mongoose.model('Author', AuthorSchema);