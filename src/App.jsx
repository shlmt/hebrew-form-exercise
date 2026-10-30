import { useState } from 'react'
import RegistrationForm from './RegistrationForm'
import Success from './Success'
import './App.css'

function App() {
	const [submitted, setSubmitted] = useState(null)

	return (
		<div className='stage'>
			<div className={submitted ? 'hidden' : ''} inert={!!submitted}>
				<RegistrationForm onSubmit={setSubmitted} />
			</div>
			{submitted && <Success onBack={() => setSubmitted(null)} />}
		</div>
	)
}

export default App

