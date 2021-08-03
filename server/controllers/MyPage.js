const { User, Board, Movie, UsersLikeMovies } = require("../models");
const { Op } =require("sequelize");




module.exports = {
    getMyPage: (req, res) => {
        const userData = [];
        const boardData = [];
        const userLike = [];
        
        const email = req.user.email;
        User.sequelize.transaction(async (transaction) => {
            await User.findOne({
                where: {
                    email
                }
            }).then(data => {
                userData.push(data)
               
            }, {transaction})

            await Board.findAll({
                where: {
                    UserId :{ [Op.eq]: userData[0].id}
                }
            }).then(data => {
               data.map(el => {
                   boardData.push(el)
               })
            }, {transaction})

            await User.findAll({
                where: {
                    id : { [Op.eq] : UsersLikeMovies.userId }
                }
            }).then(data => {
                // console.log(data)
                Movie.findAll({
                    where: {
                        id: {[Op.eq] : data.MovieId}
                    }
                }).then(data => {
                    data.map(el => {
                        userLike.push(el)
                    })
                })
            },{transaction}).then(() => {
                res.status(200).json({userData,boardData,userLike});
            })
        })
    },

    passwordCheck: (req, res) => {  // 페스워드 일치시 요청한 user데이터 전송
        const { password } = req.body;
        const email = req.user.email

        User.findOne({
            where: {
                email, password 
            }
        }).then(data => {
            if(!data){
                res.status(403).send("forbidden");
            }
            res.status(200).json(data);
        }).catch(err => {
            console.log(err);
        })
    },

    modification: (req, res) => { // 데이터 업데이트
        const { password, nickName } = req.body;
        const email = req.user.email;
        User.update({
            password, nickName
        }, {
            where: {
                email
            }
        }).then(data => {
            res.status(200).json(data);
        }).catch(err => {
            console.log(err)
        })
    }
}
