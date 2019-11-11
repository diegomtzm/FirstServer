let mongoose = require('mongoose');

mongoose.Promise = global.Promise;

let studentSchema = mongoose.Schema({
	firstName : { type : String },
	lastName : { type : String },
	id : { 
			type : Number,
			required : true }
});

let Student = mongoose.model( 'Student', studentSchema );


let StudentList = {
	get : function(){
		return Student.find()
				.then( students => {
					return students;
				})
				.catch( error => {
					throw Error( error );
				});
	},
	getByID : function(id){
		return Student.findOne({id : id})
			.then(student => {
				return student;
			})
			.catch( error => {
				throw Error( error );
			});

	},
	post : function( newStudent ){
		return Student.create( newStudent )
				.then( student => {
					return student;
				})
				.catch( error => {
					throw Error(error);
				});
	},
	put : function( updatedStudent ){
		return StudentList.getByID( updatedStudent.id )
			.then( student => {
				if ( student ){
					return Student.findOneAndUpdate( {id : student.id}, {$set : updatedStudent}, {new : true})
						.then( newStudent => {
							return newStudent;
						})
						.catch(error => {
							throw Error(error);
						});
				}
				else{
					throw Error( "404" );
				}
			})
			.catch( error => {
				throw Error(error);
			});
	}
};

module.exports = { StudentList };
