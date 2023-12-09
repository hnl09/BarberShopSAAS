import { useState } from "react"
import { useAppointmentsContext } from "../hooks/useAppointmentsContext"

const AppointmentsForm = () => {
    const { dispatch, state } = useAppointmentsContext()
    const [customerEmail, setCustomerEmail] = useState('')
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [serviceType, setServiceType] = useState('')
    const [serviceDetails, setServiceDetails] = useState('')
    const [price, setPrice] = useState('')
    const [notes, setNotes] = useState('')
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const userData = JSON.parse(localStorage.getItem('user'));

        const appointment = {date, time, serviceType, serviceDetails, price, notes}

        const response = await fetch(`http://localhost:4000/api/appointments/create/${customerEmail}/${userData.email}`, {
            method: 'POST',
            body: JSON.stringify(appointment),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
        }
        if (response.ok) {
            setDate('')
            setTime('')
            setServiceType('')
            setServiceDetails('')
            setPrice('')
            setNotes('')
            console.log('Agendamento feito', json)
            dispatch({type: "CREATE_APPOINTMENT", payload: json})
            console.log(state)
        }
    }
    console.log(state)

    return (
    <div className="workout-form">
        <form className="create" onSubmit={handleSubmit}>
            <h3>Adicione um novo agendamento</h3>
            <label>Email do Cliente:<span>*</span></label>
                <input 
                type='text' 
                onChange={(e) => setCustomerEmail(e.target.value)}
                value={customerEmail}
                />
            <label>Data:<span>*</span></label>
                <input 
                type='date'
                onChange={(e) => setDate(e.target.value)}
                value={date}
                />
            <label>Hora:<span>*</span></label>
                <input 
                type='time'
                onChange={(e) => setTime(e.target.value)}
                value={time}
                />
            <label>Tipo de Serviço:<span>*</span></label>
                <input 
                type='text' 
                onChange={(e) => setServiceType(e.target.value)}
                value={serviceType}
                />
            <label>Detalhes do Serviço:</label>
                <input
                type='text'
                onChange={(e) => setServiceDetails(e.target.value)}
                value={serviceDetails}
                />
            <label>Preço:<span>*</span></label>
                <input 
                type='text' 
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                />
            <label>Notas:</label>
                <input
                type='text'
                onChange={(e) => setNotes(e.target.value)}
                value={notes}
                />
            <button type="submit">Agendar</button>
            {error && <div className="Error">{error}</div>}
        </form>
    </div>
    )
}

export default AppointmentsForm