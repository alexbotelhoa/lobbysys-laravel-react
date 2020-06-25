import React, { useState, useEffect }  from 'react';
import { FiSave } from 'react-icons/fi';
import { RiDeleteBinLine } from 'react-icons/ri';

import './styles.css';
import api from '../../services/api';
import Header from '../../components/Header';

export default function Rooms() {
	const [mensage, setMensage] = useState(null);
	const [rooms, setRooms] = useState([]);

	const [nrRoom, setNrRoom] = useState('4567');





	useEffect(() => {
        api.get('rooms').then(response => {
            setRooms(response.data)
        })
	}, []);






	function checkInputsForm(event) {	
		event.preventDefault();

		if (nrRoom === '') return setMensage('Informe o número da sala!');
		
		createRoom();
	};










	async function createRoom() {
		const data = new FormData();
		data.append('nrRoom', nrRoom);
		
		console.log(nrRoom)

		let room;

		try {
			room = await api.post('rooms', data);
		} catch (err) {
			alert('Erro ao tentar ADICIONAR a sala!\nVerifique se a mesma já não está cadastrada.\nCaso não, tente novamente em alguns instantes!');
		}	

		console.log(room)

		if (room.status === 201) {
			setRooms([ room.data, ...rooms ]);
		} else {
			return setMensage('Sala já se encontra cadastrada!');
		}
	}

	async function handleDeleteRoom(id) {
        try {
            await api.delete(`/rooms/${id}`);
        
            setRooms(rooms.filter(room => room.id !== id));
        } catch (err) {
			alert('Erro ao tentar DELETAR a sala!\nVerifique se a sala contém registro(s) de "checkin".\nCaso não tenha, tente novamente em alguns instantes!');
        }
	};






    return	( 
		<>
			<Header />






			<div className="container">
				<div className="contentMain">


					<div className="contentRoom">
						<form onSubmit={checkInputsForm}>



							<div className="field-group">
								<div className="field">
									<label htmlFor="name">Número da Sala *</label>
									<input 
										id="nrRoom" 
										name="nrRoom"
										value={nrRoom}
										type="number"
										placeholder="Informe o NÚMERO da sala"
										onChange={e => setNrRoom(e.target.value)}
									/>
								</div>
								<div className="btnSalveRoom">	
									<span>
										<FiSave size="26" title="Nova Sala" />
									</span>
									<button type="submit" onClick={() => {}}>
										<strong>Cadastrar nova sala</strong>
									</button>
								</div>	
							</div>



						</form>
					</div>

					<div className="contentRooms">
						

						<ul>

						{rooms.map(room => (
							<li key={room.id}>
								<header>{room.nrRoom}</header>
								<button onClick={() => handleDeleteRoom(room.id)}>
									<RiDeleteBinLine size="16" />
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
				<button type="button" onClick={() => setMensage(null)}>FECHAR</button>
			</div>
			) }



		</>
	)
}
