import validation from 'jquery-validation'
import Inputmask from 'jquery-mask-plugin'
import ApiClient from '../ApiClient';
import {initValidatorDefaults, getInputRadio} from '../helpers';
import {validationMessages, validationRulesConfig} from '../constants';

export default class FormController {
	constructor(el) {
		this.$el = $(el)
		this.$tabs = this.$el.find('[data-tab]')
		this.$tabsTitles = this.$el.find('[data-tab-title]')
		this.$radioContainer = this.$el.find('[data-tab="pickup"] fieldset')
		this.points = [];
		this.selectedPointId = ''
		this.deliveryType = 'delivery'
		this.submitHandler = this.submitHandler.bind(this)
		this.init()
	}

	initRadios(points) {
		const radiosMarkup = this.points.map(({name, id}) => getInputRadio({label: name, name:'pickup-point', value: id}))
		this.$radioContainer.html(radiosMarkup)
		const $radioInputs = this.$radioContainer.find('input[type="radio"]')
		$radioInputs.on('change', (evt) => {
			this.selectedPointId = evt.currentTarget.value
			console.log(evt.currentTarget.value);
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
		const result = await ApiClient.postFormRequest(payload)
		if (result.status === 'ok') {
			alert('ok')
		} else {
			alert('error')
		}
	}

	async init() {
		this.points = await ApiClient.getPoints()
		this.initRadios()
		initValidatorDefaults()
		this.$tabsTitles.on('click', (evt) => {
			const activeTabName = $(evt.currentTarget).data('tab-title')
			this.deliveryType = activeTabName

			this.$tabs.each((idx, item) => {
				const $tab = $(item)
				if ($tab.data('tab') === activeTabName) {
					$tab.addClass('active')
				} else {
					$tab.removeClass('active')
				}
			})
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
