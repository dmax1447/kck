import validate from 'jquery-validation'


$(document).ready(function() {
	function init() {
		fetch('/assets/data/points.json')
			.then(response => response.json())
			.then(data => console.log(data))
	}
	init()

});
