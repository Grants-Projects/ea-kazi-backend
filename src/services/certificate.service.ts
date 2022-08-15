/** @format */

import { CourseRepository } from '../repository/course.repository';
import { injectable } from 'tsyringe';
import { Certificate } from '../models/certificates';
import { CertificateRepository } from '../repository/certificate.repository';

@injectable()
export class CertificateService {
	constructor(private certificateRepository: CertificateRepository) {}

	getAllCertificates = async (): Promise<Certificate[]> => {
		return await this.certificateRepository.getAllCertificates();
	};
}
