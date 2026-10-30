import { useState } from 'react'
import { Card } from 'primereact/card'
import { Button } from 'primereact/button'

const REFERENCE_NUMBER = () => Math.floor(100000 + Math.random() * 900000)

export default function Success({ onBack }) {
	const [referenceNumber] = useState(REFERENCE_NUMBER)

	return (
		<Card className='form-card success-card'>
			<i className='pi pi-check-circle success-icon' />
			<h2>Submitted Successfully</h2>
			<p className='reference'>Reference number {referenceNumber}</p>
			<Button label='Back to form' className='submit-btn' onClick={onBack} />
		</Card>
	)
}
