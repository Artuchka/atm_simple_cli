const FileSystem = require("./FileSystem")

module.exports = class Account {
	constructor(accountName) {
		this.#name = accountName
	}

	#name
	#balance

	get balance() {
		return this.#balance
	}

	get #filePath() {
		return `accounts/${this.#name}.txt`
	}

	deposit(value) {
		try {
			FileSystem.write(this.#filePath, this.#balance + parseFloat(value))
		} catch (e) {
			return
		}
		this.#balance = this.#balance + parseFloat(value)
	}
	withdraw(value) {
		if (this.#balance - parseFloat(value) < 0) return
		try {
			FileSystem.write(this.#filePath, this.#balance - parseFloat(value))
		} catch (e) {
			return
		}
		this.#balance = this.#balance - parseFloat(value)
	}

	async load() {
		this.#balance = parseFloat(await FileSystem.read(this.#filePath))
	}

	static async find(accountName) {
		const account = new Account(accountName)

		try {
			await account.load()
			return account
		} catch (e) {
			return
		}
	}

	static async create(accountName) {
		const account = new Account(accountName)

		try {
			await FileSystem.write(account.#filePath, 0)
		} catch (e) {
			console.error(e)
		}
		return account
	}
}
