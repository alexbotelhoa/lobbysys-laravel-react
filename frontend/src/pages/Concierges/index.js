import React, { useState, useEffect }  from 'react';
import { FaSearch, FaTrash } from 'react-icons/fa';
import Cookies from 'js-cookie';

import './styles.css';
import api from '../../services/api';

export default function Concierges() {
	const [mensage, setMensage] = useState(null);
	const [visitors, setVisitors] = useState([]);
	const [rooms, setRooms] = useState([]);

	const [selectedVisitor, setSelectedVisitor] = useState('');
	const [selectedRoom, setSelectedRoom] = useState('');
	const [selectedCheckIn, setSelectedCheckIn] = useState('');

	const [concierges, setConcierges] = useState([]);

    useEffect(() => {
		api.get('visitors', {
			headers: {
			  Authorization: `Bearer ${Cookies.get('token')}`
			}
		}).then(response => {
            setVisitors(response.data)
        })
	}, []);
	
	useEffect(() => {
        api.get('rooms', {
			headers: {
			  Authorization: `Bearer ${Cookies.get('token')}`
			}
		}).then(response => {
            setRooms(response.data)
        })
	}, []);

	function checkInputsForm(event) {	
		event.preventDefault();

		if (selectedVisitor === "" && selectedRoom === "" && selectedCheckIn === "") return setMensage('Selecione pelo menos um opção!');
		
		searchVisitors();
	};

	async function searchVisitors() {
		try {
			const response = await api.get(`concierges?visitor=${selectedVisitor}&room=${selectedRoom}&checkIn=${selectedCheckIn}`, {
				headers: {
					Authorization: `Bearer ${Cookies.get('token')}`
				}
			});

			setConcierges(response.data);

			if (response.data.length === 0) setMensage('Não há registros nessa pesquisa. Tente novamente!');
		} catch (err) {
			alert('Erro ao tentar pesquisar as informações!\nTente novamente em alguns instantes!');
		}
	};

	function handleClearFilter() {
		setConcierges([]);
	}

    return	( 
		<>
			<div className="container">
				<div className="contentMain">
					<div className="contentConcierge">
						<form onSubmit={checkInputsForm}>
							<div className="field-group">
								<div className="field">
									<select 
										data-testid="visitor" 
										name="visitor"
										value={selectedVisitor} 
										onChange={e => setSelectedVisitor(e.target.value)}
									>
										<option value="">Selecione um Visitante</option>
										{visitors.map(visitor => (
											<option key={visitor.id} value={visitor.id}>{visitor.name}</option>
										))}
									</select>
								</div>
								<div className="field">
									<select 
										data-testid="room" 
										name="room"
										value={selectedRoom} 
										onChange={e => setSelectedRoom(e.target.value)}
									>
										<option value="">Selecione uma Sala</option>
										{rooms.map(room => (
											<option key={room.id} value={room.id}>{room.nrRoom}</option>
										))}
									</select>
								</div>
							</div>

							<div className="field-group">
								<div className="field">
									<label htmlFor="checkIn">Selecione uma Data</label>
									<input 
										data-testid="checkIn" 
										name="checkIn"
										value={selectedCheckIn}
										type="date"
										placeholder="Selecione uma DATA DE CHECKIN"
										onChange={e => setSelectedCheckIn(e.target.value)}
									/>
								</div>
								<div className="btnsConcierge">	
									<span>
										<FaTrash size="24" title="Limpar" />
									</span>
									<button data-testid="btnResetConcierge" type="reset" onClick={handleClearFilter}>
										<strong>Limpar</strong>
									</button>

									<span>
										<FaSearch size="24" title="Pesquisar" />
									</span>
									<button data-testid="btnSearchConcierge" type="submit" onClick={() => {}}>
										<strong>Pesquisar</strong>
									</button>
								</div>	
							</div>
						</form>
					</div>

					<div className="contentConcierges">					
						<ul>
							<li className="titleFilteredConcierges">
								<div style={{ width: '30px' }}>Nr</div>
								<div style={{ width: '250px' }}>Nome do Visitante</div>
								<div style={{ width: '120px' }}>CPF</div>
								<div style={{ width: '60px' }}>Nr Sala</div>
								<div style={{ width: '200px' }}>Data e Hora do CheckIn</div>
								<div style={{ width: '200px' }}>Data e Hora do CkeckOut</div>
							</li>
							{concierges.map((concierge, index )=> (
								<li key={concierge.id} className="contentFilteredConcierges">
									<h3>{index + 1}</h3>
									<header>{concierge.name}</header>
									<span>{concierge.cpf}</span>
									<h4>{concierge.nrRoom}</h4>
									<p>{new Date(concierge.checkIn).toLocaleString().replace(/[,]+/g, '')}</p>
									<p>{new Date(concierge.checkOut).toLocaleString().replace(/[,]+/g, '')}</p>
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
