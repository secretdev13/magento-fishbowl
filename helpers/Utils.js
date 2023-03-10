const fs = require('fs')

const updateAtFile = './updated_at.txt';

(async () => {
	if (!fs.existsSync(updateAtFile)) {
		fs.writeFileSync(updateAtFile, '')
	}
})()

const Utils = {
  updatedAt: '',
  get updatedAt() {
    return fs.readFileSync(updateAtFile).toString()
  },
  set updatedAt(value) {
    fs.writeFileSync(updateAtFile, value)
  }
}

module.exports = Utils