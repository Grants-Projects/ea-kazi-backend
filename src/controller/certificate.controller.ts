/** @format */

import { injectable } from 'tsyringe';
import { IRequest, IResponse } from '../common/http.interface';
import { CertificateService } from '../services/certificate.service';

@injectable()
export class CertificateController {
	constructor(private certificateService: CertificateService) {}

	getAllCertificates = async (req: IRequest, res: IResponse) => {
		try {
			const certicates = await this.certificateService.getAllCertificates();

			return res.ok(certicates, 'Certificates fetched successfully');
		} catch (error) {
			return res.serverError(
				error,
				error.message || 'An error occured while fetching certificates'
			);
		}
	};
}
