// https://www.youtube.com/watch?v=kIi90ezPWIQ

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = mongoose.connection;
// var dbUrl = 'mongodb://username:password@mongodb:port/database';
var dbUrl = 'mongodb://mely:0000@ds125198.mlab.com:25198/humanresources';
// var dbUrl = 'mongodb://127.0.0.1:27017/humanresources';

var TeamSchema = new Schema({
    name: {
        type: String,
        required: true
    }
});
var Team = mongoose.model('Team', TeamSchema);

db.on('error', function () {
    console.log('there was an error communicating with the database');
});

mongoose.connect(dbUrl, function (err) {
    if (err) {
        return console.log('there was a problem connecting to the database!' + err);
    }
    console.log('connected!');
    var team = new Team({
        name: 'Product Development'
    });

    team.save(function (error, data) {
        if (error) {
            console.log(error);
        } else {
            console.dir(data);
        }
        db.close();
        process.exit();
    });
});


var EmployeeSchema = new Schema({
    name: {
        first: {
            type: String,
            required: true
        },
        last: {
            type: String,
            required: true
        }
    },
    team: {
        type: Schema.Types.ObjectId,
        ref: 'Team'
    },
    image: {
        type: String,
        default: 'images/user.png'
    },
    address: {
        lines: {
            type: [String]
        },
        postal: {
            type: String
        }
    }
});
