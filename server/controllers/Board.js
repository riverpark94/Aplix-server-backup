const { User, Board } = require("../models")
const { Op }  = require("sequelize")

module.exports = {
    // 데이터 뿌려주기
    boardInfo: (req, res) =>{
        Board.findAll()
            .then(data => {
                res.status(200).json(data);
            }).catch(err => {
                console.log(err)
            })
    },

    // 새글 쓰기
    newPost : (req, res) =>{
        const { genre, title, contents } = req.body;
        const email = req.user.email;
        const userData = []
        
        if(!genre || !title || !contents){
            res.status(422).send('not enough information')
        }

        User.sequelize.transaction(async(transaction)=>{
            await User.findOne({
                where: {
                    email
                }
            }).then(data => {
                // console.log(data)
                // console.log(data.nickName)
                userData.push(data)
            },{transaction})

            await Board.create({
                genre: genre,
                title: title,
                contents: contents,
                userName: userData[0].nickName,
                userId: userData.id // 데이터가 안들어감 (association)
            }).then(data => {
                res.status(201).json(data)
            },{transaction})
        })
    },

    // 수정
    updatePost : (req, res) =>{
        const { id, genre, title ,contents } = req.body;
        
        console.log(req.body)
        Board.update({
            genre,
            title,
            contents
        }, {
            where: {
                id
            }
        }).then(data => {
            res.status(201).json(data)
        })        
    },

    // 삭제
    deletePost : (req, res) =>{
        const { id } = req.query; // req.query
        // console.log("req체크 :" , req.query)
        Board.destroy({
            where: {
                id : id
            }
        }).then(() => {
            req.status(200).send('success delete')
        }).catch(err => {
            console.log(err)
        })
       
    },

    // 각각의 게시글 보기
    openPost : (req, res) =>{
        const { id } = req.query; // req.query
        // console.log("req체크 :" , req.query)
        Board.findOne({
            where: {
                id
            }
        }).then(data => {
            res.status(200).json(data);
        })
        
    }
}
