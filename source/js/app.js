import FormController from './components/FormController';

function init() {
	const $form = $('[data-form]');
	if ($form.length) {
		const formController = new FormController($form)
		formController.init()
	}
}

$(document).ready(function() {
	init()
});
