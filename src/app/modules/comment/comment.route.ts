import express from 'express';
import auth from '../../midddleware/auth';
import { USER_ROLE } from '../user/user.constant';
import { CommentController } from './comment.controller';
import validateRequest from '../../midddleware/validateRequest';
import { CommentSchemaValidation } from './comment.validation';

const router = express.Router()


router.get('/post/:id/comments', auth(USER_ROLE.user, USER_ROLE.admin), CommentController.getCommentsByPostId);



router.post('/post/:id/comment', auth(USER_ROLE.user, USER_ROLE.admin), validateRequest(CommentSchemaValidation.commentSchemaZod),CommentController.createComment);

router.post('/post/:id/comment/:commentId/reply', auth(USER_ROLE.user, USER_ROLE.admin), validateRequest(CommentSchemaValidation.replySchemaZod), CommentController.replyToComment);

router.put('/post/:id/comment/:commentId', auth(USER_ROLE.user), validateRequest(CommentSchemaValidation.updateSchemaZod), CommentController.editComment);


router.delete('/post/:id/comment/:commentId', auth(USER_ROLE.user, USER_ROLE.admin), CommentController.deleteComment);


export const commentRouters = router