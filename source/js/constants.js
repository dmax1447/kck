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
	hintContent: 'Собственный значок метки',
	balloonContent: 'Это красивая метка'
}

export const placemarkOptions = {
	iconLayout: 'default#image',
	// Своё изображение иконки метки.
	iconImageHref: 'images/point.svg',
	// Размеры метки.
	iconImageSize: [34, 44],
	// Смещение левого верхнего угла иконки относительно
	// её "ножки" (точки привязки).
	iconImageOffset: [-17, -44]
}
