import React, { useState, useEffect } from 'react';
import { GiExitDoor } from 'react-icons/gi';
import { FaAddressCard } from 'react-icons/fa';
import { BsBoxArrowRight } from 'react-icons/bs';

import Cookies from 'js-cookie';

import './styles.css';
import api from '../../services/api';
import person from '../../assets/person.gif'
import loading from '../../assets/loading.gif'

export default function Dashboard() {
	const [chargeArrivals, setChargeArrivals] = useState(true);
	const [chargeQueues, setChargeQueues] = useState(true);

	const [mensage, setMensage] = useState(null);
	const [visitors, setVisitors] = useState([]);
	const [rooms, setRooms] = useState([]);
	const [arrivals, setArrivals] = useState([]);
	const [queues, setQueues] = useState([]);
	
	const [selectedVisitor, setSelectedVisitor] = useState('');
	const [selectedRoom, setSelectedRoom] = useState('');
	
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
	
	useEffect(() => {
		loadArrivals();
	}, []);
	
	useEffect(() => {
		loadQueues();
    }, []);

	function loadArrivals() {
		api.get('arrivals', {
			headers: {
			  Authorization: `Bearer ${Cookies.get('token')}`
			}
		}).then(response => {
			setArrivals(response.data)
		}).finally(() => setChargeArrivals(null));
	};

	function loadQueues() {
		api.get('queues', {
			headers: {
			  Authorization: `Bearer ${Cookies.get('token')}`
			}
		}).then(response => {
			setQueues(response.data)
		}).finally(() => setChargeQueues(null));
	};

	function checkInputsForm(event) {	
		event.preventDefault();

		if (selectedVisitor === "") return setMensage('Selecione um visitante!');
		if (selectedRoom === "") return setMensage('Selecione uma sala!');
		
		createPositionArrival();
	};

	async function createPositionArrival() {
		const visitor = selectedVisitor.split(',');
		const room = selectedRoom.split(',');
		
		const data = new FormData();
		data.append('visitor_id', Number(visitor[0]));
        data.append('room_id', Number(room[0]));

		try {
			const arrival = await api.post('arrivals', data, {
				headers: {
				  Authorization: `Bearer ${Cookies.get('token')}`
				}
			});

			if (arrival.status === 201) {
				const nameVisitorAndNrRoom = [{
					name: visitor[1],
					nrRoom: room[1]
				}];
	
				Object.assign(arrival.data, nameVisitorAndNrRoom[0]);
	
				setArrivals([ ...arrivals, arrival.data ]);
			} else {
				if (arrival.status === 226) return setMensage('Visitante já está cadastrado nessa sala!');
	
				createPositionQueue(data, visitor[1], room[1]);
			}
		} catch (err) {
			alert('Erro ao tentar realizar o CHECKIN do visitante!\nTente novamente em alguns instantes!');
		};
	}

	async function createPositionQueue(data, name, nrRoom) {
		try {
			const queue = await api.post('queues', data, {
				headers: {
				  Authorization: `Bearer ${Cookies.get('token')}`
				}
			});

			if (queue.status === 201) {
				const nameVisitorAndNrRoom = [{
					name: name,
					nrRoom: nrRoom,
				}];
	
				Object.assign(queue.data, nameVisitorAndNrRoom[0])
	
				setQueues([ ...queues, queue.data ]);
			} else {
				if (queue.status === 203) return setMensage('Visitante já se encontra na fila de espera!');
			}
		} catch (err) {
			alert('Erro ao tentar realizar o CHECKIN do visitante!\nTente novamente em alguns instantes!');
		}
	}

	async function handleCheckOut(id) {
		try {
			const arrival = await api.delete(`/arrivals/${id}`, {
				headers: {
				  Authorization: `Bearer ${Cookies.get('token')}`
				}
			});

			if (arrival.status === 201)  {
				loadArrivals();
	
				loadQueues();
			} else {
				setArrivals(arrivals.filter(arrival => arrival.id !== id));
			}
		} catch (err) {
			alert('Erro ao tentar realizar o CHECKOUT do visitante!\nTente novamente em alguns instantes!');
		}		
	};
	
	async function handleExitQueue(id) {
		try {
			await api.delete(`/queues/${id}`, {
				headers: {
				  Authorization: `Bearer ${Cookies.get('token')}`
				}
			});

			setQueues(queues.filter(queue => queue.id !== id));
		} catch (err) {
			alert('Erro ao tentar RETIRAR o visitante da fila de espera!\nTente novamente em alguns instantes!');
		}
	};

	return	( 
		<>
			<div className="containerMain">
				<div className="contentLeft">
					<div className="contentDashboardVisitors">
						<form onSubmit={checkInputsForm}>
							<select 
								data-testid="visitor" 
								name="visitor"
								value={selectedVisitor} 
								onChange={e => setSelectedVisitor(e.target.value)}
							>
								<option value="">Selecione um Visitante</option>
								{visitors.map(visitor => (
									<option key={visitor.id} value={[visitor.id, visitor.name]}>{visitor.name}</option>
								))}
							</select>

							<select 
								data-testid="room" 
								name="room"
								value={selectedRoom} 
								onChange={e => setSelectedRoom(e.target.value)}
							>
								<option value="">Selecione uma Sala</option>
								{rooms.map(room => (
									<option key={room.id} value={[room.id, room.nrRoom]}>{room.nrRoom}</option>
								))}
							</select>

							<button data-testid="btnCkeckIn" className="btnCheckin" type="submit" title="CheckIn">
								<FaAddressCard size="26" />
							</button>
						</form>
					</div>
					<div className="contentDashboardRooms" >
						{ chargeArrivals && (
							<div className="contentLoading">
								<img src={loading} width="120px" alt="" />
							</div>
						) }
						<ul>
							{arrivals.map(arrival => (
								<li className="cardPerson" key={arrival.id}>
									<span>
										<img src={person} title="Visitante" alt="" />
									</span>
									<footer>
										<strong>Sala {arrival.nrRoom}</strong>
										<p>{String(arrival.name).substring(0,18)}...</p>
										<h6>{new Date(arrival.checkIn).toLocaleString().replace(/[,]+/g, '')}</h6>
									</footer>
									<button data-testid="btnCheckOut" className="btnCard" onClick={() => handleCheckOut(arrival.id)}>
										<BsBoxArrowRight size="26" title="CheckOut" />
									</button>
								</li>							
							))}
						</ul>
					</div>
				</div>

				<div className="contentRight">
					<div className="titleQueue">
						<p>Fila de Espera</p>
					</div>
					<div className="contentDashboardQueue">
						{ chargeQueues && (
							<div className="contentLoading">
								<img src={loading} width="120px" alt="" />
							</div>
						) }
						<ul>
							{queues.map(queue => (
								<li className="cardPerson" key={queue.id}>
									<span>
										<img src={person} alt="" />
									</span>
									<footer>
										<strong>Sala {queue.nrRoom}</strong>
										<p>{String(queue.name).substring(0,18)}...</p>
										<h6>{new Date(queue.created_at).toLocaleString().replace(/[,]+/g, '')}</h6>						
									</footer>
									<button data-testid="btnExitQueue" className="btnCard" onClick={() => handleExitQueue(queue.id)}>
										<GiExitDoor size="26" title="Exit" />
									</button>
								</li>
							))}							
						</ul>
					</div>
				</div>
            </div>

			{ mensage && (
				<div className="validation-container">
					<strong className="mensageError">{mensage}</strong>
					<button type="button" onClick={() => setMensage(null)} title="Fechar">FECHAR</button>
				</div>
        	) }
		</>
	)
}
