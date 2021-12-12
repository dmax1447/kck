import validation from 'jquery-validation'
import Inputmask from 'jquery-mask-plugin'
import ApiClient from '../ApiClient';
import {initValidatorDefaults, getInputRadio} from '../helpers';
import {validationMessages, validationRulesConfig, placemarkContent, placemarkOptions} from '../constants';

export default class FormController {
	constructor(el) {
		this.$el = $(el)
		this.$tabs = this.$el.find('[data-tab]')
		this.$tabsTitles = this.$el.find('[data-tab-title]')
		this.$radioContainer = this.$el.find('[data-tab="pickup"] fieldset')
		this.$btnSubmit = this.$el.find('button[type="submit"]')
		this.points = []
		this.mapInstance = null
		this.selectedPointId = ''
		this.deliveryType = 'delivery'
		this.submitHandler = this.submitHandler.bind(this)
		this.init()
	}

	initRadios(points) {
		const radiosMarkup = points.map(({name, id}) => getInputRadio({label: name, name:'pickup_point', value: id}))
		this.$radioContainer.html(radiosMarkup)
		const $radioInputs = this.$radioContainer.find('input[type="radio"]')
		$radioInputs.on('change', (evt) => {
			this.selectedPointId = evt.currentTarget.value
		})
	}

	initMap(points) {
		ymaps.ready(() => {
			const myMap = new ymaps.Map('map', {
				center: [55.74822645, 37.69954205],
				zoom: 11,
				controls: ['smallMapDefaultSet'],
				autoFitToViewport: 'always'
			}, {
				searchControlProvider: 'yandex#search'
			})

			const myCollection = new ymaps.GeoObjectCollection()
			points.forEach(item => myCollection.add(new ymaps.Placemark(item.coords), placemarkContent, placemarkOptions))
			myMap.geoObjects.add(myCollection)
			myMap.setBounds(myMap.geoObjects.getBounds());
			const isMobile = window.innerWidth < 768
			if (isMobile) {
				myMap.behaviors
					.disable(['drag', 'rightMouseButtonMagnifier'])
			}
			this.mapInstance = myMap
		})
	}

	async submitHandler(form) {
		const formData = new FormData(form)
		let payload
		switch (this.deliveryType) {
			case 'delivery':
				payload = {
					name: formData.get('name'),
					phone: formData.get('phone'),
					address: formData.get('address')
				}
				break
			case 'pickup':
				payload = {
					point: this.points.find(item => item.id === this.selectedPointId),
				}
				break
		}
		payload.deliveryType = this.deliveryType
		this.$btnSubmit.attr('disabled', true)
		const result = await ApiClient.postFormRequest(payload)
		this.$btnSubmit.attr('disabled', false)
		if (result.status === 'ok') {
			this.$el[0].reset()
			alert('ok')
		} else {
			alert('error')
		}
	}

	async init() {
		this.points = await ApiClient.getPoints()
		this.initRadios(this.points)
		initValidatorDefaults()
		this.$tabsTitles.on('click', (evt) => {
			const activeTabName = $(evt.currentTarget).data('tab-title')
			this.deliveryType = activeTabName
			this.$tabsTitles.each((idx, item) => {
				const $tabTitle = $(item)
				if ($tabTitle.data('tab-title') === activeTabName) {
					$tabTitle.addClass('active')
				} else {
					$tabTitle.removeClass('active')
				}
			})
			this.$tabs.each((idx, item) => {
				const $tab = $(item)
				if ($tab.data('tab') === activeTabName) {
					$tab.addClass('active')
				} else {
					$tab.removeClass('active')
				}
			})

			if (activeTabName === 'pickup') {
				if (!this.mapInstance) {
					this.initMap(this.points)
				}
			}
		})
		this.$el.validate({
			rules: validationRulesConfig,
			messages: validationMessages,
			submitHandler: this.submitHandler
		})
		this.$el.find('[name="phone"]').mask('+7 (000) 000-00-00')
		this.$el.on('submit', (evt) => {
			evt.preventDefault()
		})
		console.log(this)
	}
}
