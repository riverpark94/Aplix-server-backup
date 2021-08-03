const { User } = require("../models")
const jwt = require("jsonwebtoken");
let secretObj = require("../config/jwt");


module.exports={
    signIn : (req, res) => {
        const { email, password } = req.body;
        const secret = secretObj.secret  

        const token = jwt.sign(
            {email : email},
            secret ,    // 비밀 키
            {expiresIn: '24h'}    // 유효 시간은 7일
            )

        User
            .findOne({
                where: {email, password}
            }).then(data => {
                if(!data){
                    res.status(404).send("invalid request")
                }
                res.cookie("sid", token);
                // req.session.userId =data.id
                res.status(200).json({
                    id: data.id,
                    token: token,
                    nickName: data.nickName
                })
            }).catch((err) => {
                console.log("err")
            })
},

    signOut : (req, res) => {
        req.session.destroy();
        // 세션 삭제 성공 시 redirect
        res.clearCookie('sid');
        res.status(205).send("logged out success")
    },
    
    signUp :  (req, res) => {
        const { email, password, nickName} = req.body;

        if(!email || !password || !nickName){
            res.status(422).send("not enough user information");
        }
         User.findOrCreate({
            where: {
                email,
            },
            defaults:{
                password, nickName
            }
        }).then(([data, created]) => {
            if(!created){
                res.status(409).send("existed email");
            }
            res.status(201).json(data);
        })

    }
}