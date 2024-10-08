import { Router } from 'express';
import { createPaymentIntent } from './payment.controller';
import validateRequest from '../../midddleware/validateRequest';
import { paymentValidation } from './payment.validation';
import auth from '../../midddleware/auth';
import { USER_ROLE } from '../user/user.constant';



const router = Router();

router.post('/create-payment-intent', auth(USER_ROLE.admin, USER_ROLE.user), validateRequest(paymentValidation), createPaymentIntent);

export const paymentRouters = router