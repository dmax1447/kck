export const initValidatorDefaults = () => {
	$.validator.setDefaults({
		highlight: function(element) {
			$(element).closest(".form__input").addClass("has-error").removeClass('valid');
		},
		unhighlight: function(element) {
			$(element).closest(".form__input").removeClass("has-error");
		},
		errorElement: "span",
		errorClass: "form__input-error",
		validClass: 'valid',
		success: function(label) {
			label.closest('.form-group').addClass('valid')
		},

		errorPlacement: function(error, element) {
			const isRadio = element.attr('type') === 'radio'
			const $errorContainer = isRadio ? $(element).closest('fieldset') : element.closest('.form__input')
			$errorContainer.append(error)
		}
	});
	$.validator.addMethod('phoneru', function(value, element) {
		const phoneRegex = /\+\d{1}\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}/g
		const isValid = phoneRegex.test(value)
		return isValid;
	})
	$.validator.addMethod('cyrillic', function(value, element) {
		const phoneRegex = /[а-яА-я -]/g
		const isValid = phoneRegex.test(value)
		return isValid;
	})
}

export const getInputRadio = ({name, label, value}) => {
	const id = `${name}-${value}`
	return `
		<div class="input-radio form__input">
			<input class="input-radio__control visually-hidden" id="${id}" type="radio" name="${name}" value="${value}">
			<label class="input-radio__label" for="${id}">${label}</label>
		</div>
	`
}
