const fs = require('fs')

const updateAtFile = './updated_at.txt';

(async () => {
	if (!fs.existsSync(updateAtFile)) {
		fs.writeFileSync(updateAtFile, '')
    process.env.mgUpdatedAt = ''
	} else {
    process.env.mgUpdatedAt = fs.readFileSync(updateAtFile).toString()
  }
})()

const Utils = {
  updatedAt: '',
  get updatedAt() {
    return process.env.mgUpdatedAt
  },
  set updatedAt(value) {
    process.env.mgUpdatedAt = value
    fs.writeFileSync(updateAtFile, value)
  }
}

module.exports = Utils