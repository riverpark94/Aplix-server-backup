const express = require('express');
const router = express.Router();
const checkToken = require("../middleware/checkToken")

const { userController, myPageController, boardController, movieController } = require('../controllers');

router.get("/" , (req, res) => {
    res.send("Site access success")
})

router.post('/signup', userController.signUp);
router.post('/signin', userController.signIn);

router.get('/search', movieController.movie);


router.use(checkToken)

router.get("/board", boardController.boardInfo)
router.get("/board/deletepost", boardController.deletePost)
router.post("/board/newpost", boardController.newPost)
router.post("/board/updatepost", boardController.updatePost)

router.post('/search', movieController.movieLike);

router.post('/signout', userController.signOut);

router.get("/mypage", myPageController.getMyPage );

router.post("/mypage/checkpassword", myPageController.passwordCheck);

router.put("/mypage/userinfo", myPageController.modification)





module.exports = router;
