import express, { Router } from 'express';
const router: Router = express.Router();
import { container } from 'tsyringe';
import { CertificateController } from '../../controller/certificate.controller';
import authMiddleware from '../../middleware/auth.middleware';
const certificateController: any = container.resolve(CertificateController);

router.get('/', authMiddleware, certificateController.getAllCertificates);

export default router;
