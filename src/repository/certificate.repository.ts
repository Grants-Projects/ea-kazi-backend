/** @format */

import { injectable } from 'tsyringe';
import { Certificate } from '../models/certificates';
import { AppDataSource } from '../utils/data-source';

const certificateRepository = AppDataSource.getRepository(Certificate);

@injectable()
export class CertificateRepository {
	getAllCertificates = async (): Promise<Certificate[]> => {
		return await certificateRepository.find();
	};
}
