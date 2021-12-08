export default class FormController {
	constructor(el) {
		this.$el = $(el)
		this.init()
	}

	init() {
		this.$el.on('submit', function (evt) {
		})

		this.$el.validate({
			rules: {
				name: {
					required: true,
					minlength: 2
				},

				phone: {
					required: true,
					phoneru: true,
					minlength: 10
				},
				email: {
					required: true,
					email: true,
					maxlength: 255
				},
			},

			messages: {
				email: {
					required: "Введите адрес электронной почты",
				},
				phone: {
					phoneru: 'неверный номер телефона'
				}
			}
		});
		this.$el.find('[name="phone"]').mask('+7 (000) 000-00-00')
	}
}
