import {
	Icarrer,
	Irepository,
	Idepartment,
	IdepartementCarrer,
	Iservice,
} from "./interfaces";

class Service implements Iservice {
	private repository: Irepository;

	constructor(repository: Irepository) {
		this.repository = repository;
	}

	async getDepartments(): Promise<Idepartment[]> {
		return this.repository.getDepartments();
	}

	async getDepartmentCarrer(department: string, carrer: string): Promise<Icarrer | null> {
		const indexCarrer = await this.repository.getIndexCarrerByDepartment(
			department,
			carrer
		);
		if (!indexCarrer) return null;
		return this.repository.getDepartmentCarrer(department, indexCarrer);
	}

	async getDepartmentCarrers(department: string): Promise<IdepartementCarrer[] | null> {
		return await this.repository.getDepartmentCarrers(department);
	}
}

export default Service;
