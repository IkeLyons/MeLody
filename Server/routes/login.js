import  express  from "express";


const router = express.Router();


let user_data = {
    'users' : [{
        'user_name': 'Mukesh',
        'password': 'Test123',
        },
        {
        'user_name': 'Ike',
        'password': 'Test123',
        },
    ]
};

router.post('/api/validateLogin',(req,res)=>{

    var pass = {
        message : 'OK'
    }
    var incorrect_user = {
        message : 'User is not registered.'
    }
    var incorrect_pass = {
        message : 'Incorrect Password Entered.'
    }

    var error_message = {
        message : 'Request Service Error.'
    }

    if(req.body._username.length === 0) res.status(400).send(error_message)

    var user_name = req.body._username;
    var user_pass = req.body._password;
    var is_Found = false;

    user_data.users.forEach(element => {
        console.log(element.user_name);
        if(user_name === element.user_name){
            is_Found = true;
            if(user_pass === element.password){
                res.status(200).send(pass);
            }
            else{
                res.status(401).send(incorrect_pass);
            }
        }
    });

    if(!is_Found){
        res.status(402).send(incorrect_user);
    }

})


export default router;