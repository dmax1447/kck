export default {
	async getPoints() {
		return fetch('/assets/data/points.json')
			.then(response => response.json())
	},

	async postFormRequest(payload) {
		console.log('sending request...', payload)
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve({status: 'ok'})
			}, 1000)
		})
	}
}
