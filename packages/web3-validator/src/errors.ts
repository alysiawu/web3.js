import { Web3ValidationErrorObject } from './types';

const errorFormatter = (error: Web3ValidationErrorObject): string =>
	error.message ?? 'Unspecified error message.';

export class Web3ValidatorError extends Error {
	public readonly name: string;
	public readonly errors: Web3ValidationErrorObject[];

	public constructor(errors: Web3ValidationErrorObject[]) {
		super();
		this.name = this.constructor.name;
		this.errors = errors;

		this.message = `Lisk validator found ${
			this.errors.length
		} error[s]:\n${this._compileErrors().join('\n')}`;

		Error.captureStackTrace(this, Web3ValidatorError);
	}

	public toJSON() {
		return { name: this.name, message: this.message };
	}

	private _compileErrors(): string[] {
		const errorMsgs = this.errors.map(errorFormatter);
		return errorMsgs;
	}
}
