export const validationMessages = {
	name: {
		required: 'Введите имя',
		cyrillic: 'Только кириллица',
		minlength: 'не короче 2 символов'
	},
	phone: {
		required: 'Введите номер телефона',
		phoneru: 'Неверный номер телефона'
	},
	address: {
		required: true
	}
}

export const validationRulesConfig = {
	name: {
		required: true,
		minlength: 2,
		cyrillic: true
	},
	phone: {
		required: true,
		phoneru: true,
		minlength: 10
	},
	address: {
		required: true,
	}
}
