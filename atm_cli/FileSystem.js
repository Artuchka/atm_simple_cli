const fs = require("fs")

module.exports = class FileSystem {
	static async read(path) {
		return new Promise((resolve, reject) => {
			fs.readFile(path, (err, data) => {
				if (err) reject(err)
				resolve(data)
			})
		})
	}

	static async write(path, data) {
		return new Promise((resolve, reject) => {
			fs.writeFile(path, data.toString(), (err) => {
				if (err) reject(err)
				resolve()
			})
		})
	}
}
