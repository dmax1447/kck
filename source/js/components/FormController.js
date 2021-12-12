import validation from 'jquery-validation'
import Inputmask from 'jquery-mask-plugin'
import suggestion from 'suggestions-jquery'
const ymaps = window.ymaps
import ApiClient from '../apiClient';
import {initValidatorDefaults, getInputRadio} from '../helpers';
import {validationMessages, validationRulesConfig, placemarkContent, placemarkOptions} from '../constants';

export default class FormController {
	constructor(el) {
		this.$el = $(el)
		this.$tabs = this.$el.find('[data-tab]')
		this.$tabsTitles = this.$el.find('[data-tab-title]')
		this.$radioContainer = this.$el.find('[data-tab="pickup"] fieldset')
		this.$addressInput = this.$el.find('[name="address"]')
		this.$btnSubmit = this.$el.find('button[type="submit"]')
		this.points = []
		this.mapInstance = null
		this.selectedPointId = ''
		this.deliveryType = 'delivery'
		this.submitHandler = this.submitHandler.bind(this)
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
			points.forEach(item => myCollection.add(new ymaps.Placemark(item.coords,placemarkContent, placemarkOptions ) ))
			myMap.geoObjects.add(myCollection)
			const isMobile = window.innerWidth < 768
			const marginOffsets = isMobile ? [40, 40, 40, 40] : [80, 80, 80, 80]
			myMap.setBounds(myMap.geoObjects.getBounds(), {zoomMargin: marginOffsets });
			if (isMobile) {
				myMap.behaviors
					.disable(['drag', 'rightMouseButtonMagnifier'])
			}
			this.mapInstance = myMap
		})
	}

	initValidation() {
		this.$el.on('submit', (evt) => {
			evt.preventDefault()
		})
		initValidatorDefaults()
		this.$el.validate({
			rules: validationRulesConfig,
			messages: validationMessages,
			submitHandler: this.submitHandler
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
		let result
		try {
			result = await ApiClient.postFormRequest(payload)
		} catch (err) {
			console.error(err)
		}
		this.$btnSubmit.attr('disabled', false)
		if (result.status === 'ok') {
			this.$el[0].reset()
			alert('ok')
		} else {
			alert('error')
		}
	}

	initMasks() {
		this.$el.find('[name="phone"]').mask('+7 (000) 000-00-00')
	}

	initSuggestions() {
		this.$addressInput.suggestions({
			token: "9c4d4344a2efdece2594dd7b25e1c75d885fc044",
			type: "ADDRESS",
			onSelect: function(suggestion) {
			}
		})
	}

	initTabs() {
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
	}

	async init() {
		try {
			this.points = await ApiClient.getPoints()
		} catch (error) {
			console.error(error)
		}

		this.initRadios(this.points)
		this.initValidation()
		this.initMasks()
		this.initSuggestions()
		this.initTabs()


	}
}
