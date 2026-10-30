import { useState } from 'react'
import { Card } from 'primereact/card'
import { InputText } from 'primereact/inputtext'
import { InputNumber } from 'primereact/inputnumber'
import { Dropdown } from 'primereact/dropdown'
import { Calendar } from 'primereact/calendar'
import { InputTextarea } from 'primereact/inputtextarea'
import { Button } from 'primereact/button'

const CITIES = ['Jerusalem', 'Tel Aviv', 'Haifa', 'Beer Sheva']
const SENDING_MS = 3000
const EMPTY_FORM = { fullName: '', email: '', age: null, city: null, birthDate: null, notes: '' }

const Field = ({ label, required, error, children }) => (
	<div className='field'>
		<label>
			{label}
			{required && ' *'}
		</label>
		{children}
		{error && <small className='p-error'>{error}</small>}
	</div>
)

export default function RegistrationForm({ onSubmit }) {
	const [form, setForm] = useState(EMPTY_FORM)
	const [errors, setErrors] = useState({})
	const [sending, setSending] = useState(false)

	const set = (name) => (e) => {
		const value = e.target?.value ?? e.value
		setForm((current) => ({ ...current, [name]: value }))
		setErrors((current) => ({ ...current, [name]: undefined }))
	}

	const validate = () => {
		const found = {}
		if (!form.fullName.trim()) found.fullName = 'Required field'
		if (!/^\S+@\S+\.\S+$/.test(form.email)) found.email = 'A valid email address is required'
		if (!form.city) found.city = 'Required field'
		if (!form.birthDate) found.birthDate = 'Required field'
		return found
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		if (sending) return
		const found = validate()
		setErrors(found)
		if (Object.keys(found).length) return
		// TODO: In Future, the data will be sent to server
		console.log(form)
		setSending(true)
		setTimeout(() => {
			setSending(false)
			onSubmit(form)
		}, SENDING_MS)
	}

	return (
		<Card title='Registration Form' className='form-card'>
			<form onSubmit={handleSubmit} noValidate>
				<Field label='Full Name' required error={errors.fullName}>
					<InputText value={form.fullName} onChange={set('fullName')} className={errors.fullName ? 'p-invalid' : ''} />
				</Field>
				<Field label='Email' required error={errors.email}>
					<InputText value={form.email} onChange={set('email')} className={errors.email ? 'p-invalid' : ''} />
				</Field>
				<Field label='Age'>
					<InputNumber value={form.age} onValueChange={set('age')} min={0} max={120} />
				</Field>
				<Field label='City' required error={errors.city}>
					<Dropdown
						value={form.city}
						options={CITIES}
						onChange={set('city')}
						placeholder='Select a city'
						className={errors.city ? 'p-invalid' : ''}
					/>
				</Field>
				<Field label='Birth Date' required error={errors.birthDate}>
					<Calendar
						value={form.birthDate}
						onChange={set('birthDate')}
						maxDate={new Date()}
						dateFormat='dd/mm/yy'
						showIcon
						icon='pi pi-calendar'
						className={errors.birthDate ? 'p-invalid' : ''}
					/>
				</Field>
				<Field label='Notes'>
					<InputTextarea value={form.notes} onChange={set('notes')} rows={3} />
				</Field>
				<Button type='submit' label={sending ? 'Submitting...' : 'Submit'} loading={sending} className='submit-btn' />
			</form>
		</Card>
	)
}
