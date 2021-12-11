import FormController from './components/FormController';

$(document).ready(function() {
	function init() {
		const $form = $('[data-form]');
		if ($form.length) {
			new FormController($form)
		}

	}
	init()

});
