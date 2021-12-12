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
		required: 'Адрес обязателен'
	},
	comment: {
		required: 'Комментарий обязателен'
	},
	pickup_point: {
		required: 'Выберите пункт самовывоза'
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
	},
	address: {
		required: true,
	},
	comment: {
		required: true
	},
	pickup_point: {
		required: true
	}
}
export const placemarkContent = {
	hintContent: null,
	balloonContent: null
}

export const placemarkOptions = {
	iconLayout: 'default#image',
	iconImageHref: '/assets/img/point.svg',
	iconImageSize: [34, 44],
	iconImageOffset: [-17, -44]
}
