import fs from "fs";
import { IcarrerOfDepartement, Idepartment } from "../interface";
import { pathDepartments } from "../utils/routes";

class Departments {
	private departments = new Map<string, IcarrerOfDepartement[]>();
	private descriptionDepartments: Idepartment[] = [];

	constructor() {
		this.buildDepartments();
		this.readDescriptionDepartments();
	}

	private readDescriptionDepartments() {
		this.descriptionDepartments = JSON.parse(
			fs.readFileSync(pathDepartments(`/index.json`)).toString()
		);
	}

	private buildDepartments(): void {
		fs.readdir(pathDepartments(), (err, files: string[]) => {
			if (err) {
				console.log(err);
				return;
			}
			files.forEach((file: string) => {
				if (file.indexOf(".") > 0) return;
				this.addDepartment(
					file,
					JSON.parse(fs.readFileSync(pathDepartments(`/${file}/index.json`)).toString())
				);
			});
		});
	}

	private addDepartment(key: string, departmentCarrer: IcarrerOfDepartement[]): void {
		this.departments.set(key, departmentCarrer);
	}

	getDepartment(keyDepartment: string): IcarrerOfDepartement[] | null {
		const department = this.departments.get(keyDepartment);
		return department ? department : null;
	}

	getCarrerByDepartment(
		keyDepartment: string,
		urlCarrer: string
	): IcarrerOfDepartement | null {
		const department = this.getDepartment(keyDepartment);
		if (!department) return null;
		const carrer = department.find(({ semanticUrl }) => semanticUrl == urlCarrer);
		if (!carrer) return null;
		return carrer;
	}

	getDepartments(): Idepartment[] {
		return this.descriptionDepartments;
	}
}

export default new Departments();
