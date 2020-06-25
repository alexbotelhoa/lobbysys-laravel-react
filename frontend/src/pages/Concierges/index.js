import React, { useState, useEffect }  from 'react';
import { FaSearch } from 'react-icons/fa';

import './styles.css';
import api from '../../services/api';
import Header from '../../components/Header';

export default function Concierges() {
	const [mensage, setMensage] = useState(null);
	const [visitors, setVisitors] = useState([]);
	const [rooms, setRooms] = useState([]);

	const [selectedVisitor, setSelectedVisitor] = useState('0');
	const [selectedRoom, setSelectedRoom] = useState('0');
	const [selectedCheckIn, setSelectedCheckIn] = useState('');

	const [concierges, setConcierges] = useState([]);

    useEffect(() => {
        api.get('visitors').then(response => {
            setVisitors(response.data)
        })
	}, []);
	
	useEffect(() => {
        api.get('rooms').then(response => {
            setRooms(response.data)
        })
	}, []);

	function checkInputsForm(event) {	
		event.preventDefault();

		if (selectedVisitor === '0' || selectedRoom === '0' || selectedCheckIn === '') return setMensage('Selecione pelo menos um opção!');
		
		searchVisitors();
	};

	async function searchVisitors() {
		const visitor = selectedVisitor.split(',');
		const room = selectedRoom.split(',');
		const checkIn = selectedCheckIn;

		const data = new FormData();
		data.append('visitor_id', visitor[0]);
        data.append('room_id', room[0]);
        data.append('checkIn', checkIn);

		let concierge;

		try {
			concierge = await api.get('concierges', data);
		} catch (err) {
			alert('Erro ao tentar pesquisar as informações!\nTente novamente em alguns instantes!');
		}	

		if (concierge.status === 302) {
			setConcierges(concierge);
		} else {
			if (concierge.status === 404) return setMensage('Não há registros nessa pesquisa. Tente novamente!');
		}
	};

    return	( 
		<>
			<Header />

			<div className="container">
				<div className="contentMain">
					<div className="contentConcierge">
						<form onSubmit={checkInputsForm}>
							<div className="field-group">
								<div className="field">
									<select 
										id="visitor" 
										name="visitor"
										value={selectedVisitor} 
										onChange={e => setSelectedVisitor(e.target.value)}
									>
										<option value="0">Selecione um Visitante</option>
										{visitors.map(visitor => (
											<option key={visitor.id} value={[visitor.id, visitor.name]}>{visitor.name}</option>
										))}
									</select>
								</div>
								<div className="field">
									<select 
										id="room" 
										name="room"
										value={selectedRoom} 
										onChange={e => setSelectedRoom(e.target.value)}
									>
										<option value="0">Selecione uma Sala</option>
										{rooms.map(room => (
											<option key={room.id} value={[room.id, room.nrRoom]}>{room.nrRoom}</option>
										))}
									</select>
								</div>
							</div>

							<div className="field-group">
								<div className="field">
									<label htmlFor="name">Selecione uma Data</label>
									<input 
										id="checkIn" 
										name="checkIn"
										value={selectedCheckIn}
										type="date"
										placeholder="Selecione uma DATA DE CHECKIN"
										onChange={e => setSelectedCheckIn(e.target.value)}
									/>
								</div>
								<div className="btnSearchConcierge">	
									<span>
										<FaSearch size="26" title="Pesquisar" />
									</span>
									<button type="submit" onClick={() => {}}>
										<strong>Pesquisar</strong>
									</button>
								</div>	
							</div>
						</form>
					</div>

					<div className="contentConcierges">					
						<ul>
							{concierges.map(concierge => (
								<li key={concierge.id}>
									<header>{concierge.name}</header>
									<span>{concierge.nrRoom}</span>
									<p>{concierge.checkIn}</p>
									<footer>{concierge.checkOut}</footer>
								</li>
							))}							
						</ul>
					</div>
				</div>
			</div>

			{ mensage && (
				<div className="validation-container">
					<strong className="mensageError">{mensage}</strong>
					<button type="button" onClick={() => setMensage(null)}>FECHAR</button>
				</div>
        	) }
		</>
	)
}
