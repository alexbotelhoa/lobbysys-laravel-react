import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import './styles.css';
import Header from '../../components/Header';

import PAF from '../../assets/person_adult_fem.png'
import PAM from '../../assets/person_adult_masc.png'
import PTF from '../../assets/person_teen_fem.png'
import PTM from '../../assets/person_teen_masc.png'

export default function Dashboard() {
	const [mensage, setMensage] = useState(null);
	const [visitors, setVisitors] = useState([]);
	const [rooms, setRooms] = useState([]);

	const [selectedVisitor, setSelectedVisitor] = useState('0');
	const [selectedRoom, setSelectedRoom] = useState('0');

	const history = useHistory();

	function checkInput(e) {
		e.preventDefault();
	
		if (visitors === '') return setMensage('Informe o seu e-mail!');
		if (rooms === '') return setMensage('Informe sua senha!');
	
		handleSubmit();
	};

	async function handleSubmit() {
		// const res = await api.post('/login', { email, password });
	
		// const { id } = res.data;
	
		// localStorage.setItem('user', 65476541321854);
	
		history.push('/dashboard');
	  }


    return	( 
		<>
			<Header />
			


			<div className="containerDashboard">


				<div className="contentMain">
					<div className="contentVisitors">
						<form onSubmit={checkInput}>
							<select 
								id="visitors" 
								name="visitors"
								// value={selectedVisitor} 
								onChange={() => {}}
							>
								<option value="0">Selecione um Visitante</option>
								<option value="1">Visitor 1</option>
								<option value="2">Visitor 2</option>
								<option value="3">Visitor 3</option>
							</select>

							<select 
								id="rooms" 
								name="rooms"
								// value={selectedRoom} 
								onChange={() => {}}
							>
								<option value="0">Selecione uma Sala</option>
								<option value="1">Room 1</option>
								<option value="2">Room 2</option>
								<option value="3">Room 3</option>
							</select>

							<button className="btnLogin" type="submit">Chekin</button>
						</form>
					</div>

					<div className="contentRooms">
						<ul>
							<li>
								<span>
									<img src={PAM} alt="" />
								</span>
								<footer>
									<strong>Alex Botelho</strong>
									<p>612.252.432-68</p>
								</footer>
							</li>

							<li>
								<span>
									<img src={PTF} alt="" />
								</span>
								<footer>
									<strong>Alex Botelho</strong>
									<p>612.252.432-68</p>
								</footer>
							</li>
						</ul>

						<ul>
							<li>
								<span>
									<img src={PAF} alt="" />
								</span>
								<footer>
									<strong>Alex Botelho</strong>
									<p>612.252.432-68</p>
								</footer>
							</li>

							<li>
								<span>
									<img src={PTM} alt="" />
								</span>
								<footer>
									<strong>Alex Botelho</strong>
									<p>612.252.432-68</p>
								</footer>
							</li>

							<li>
								<span>
									<img src={PTF} alt="" />
								</span>
								<footer>
									<strong>Alex Botelho</strong>
									<p>612.252.432-68</p>
								</footer>
							</li>
						</ul>		

						<ul>
							<li>
								<span>
									<img src={PTF} alt="" />
								</span>
								<footer>
									<strong>Alex Botelho</strong>
									<p>612.252.432-68</p>
								</footer>
							</li>

							<li>
								<span>
									<img src={PTM} alt="" />
								</span>
								<footer>
									<strong>Alex Botelho</strong>
									<p>612.252.432-68</p>
								</footer>
							</li>
						</ul>

						<ul>
							<li>
								<span>
									<img src={PTM} alt="" />
								</span>
								<footer>
									<strong>Alex Botelho</strong>
									<p>612.252.432-68</p>
								</footer>
							</li>
						</ul>

						<ul>
							<li>
								<span>
									<img src={PAF} alt="" />
								</span>
								<footer>
									<strong>Alex Botelho</strong>
									<p>612.252.432-68</p>
								</footer>
							</li>

							<li>
								<span>
									<img src={PTF} alt="" />
								</span>
								<footer>
									<strong>Alex Botelho</strong>
									<p>612.252.432-68</p>
								</footer>
							</li>
						</ul>
					</div>

				</div>


				<div className="contentQueues">
					<ul>
						<li>
							<span>
								<img src={PAF} alt="" />
							</span>
							<footer>
								<strong>Alex Botelho</strong>
								<p>612.252.432-68</p>								
							</footer>
						</li>

						<li>
							<span>
								<img src={PAM} alt="" />
							</span>
							<footer>
								<strong>Alex Botelho</strong>
								<p>612.252.432-68</p>
							</footer>
						</li>

						<li>
							<span>
								<img src={PTF} alt="" />
							</span>
							<footer>
								<strong>Alex Botelho</strong>
								<p>612.252.432-68</p>
							</footer>
						</li>

						<li>
							<span>
								<img src={PTM} alt="" />
							</span>
							<footer>
								<strong>Alex Botelho</strong>
								<p>612.252.432-68</p>
							</footer>
						</li>

						<li>
							<span>
								<img src={PAF} alt="" />
							</span>
							<footer>
								<strong>Alex Botelho</strong>
								<p>612.252.432-68</p>								
							</footer>
						</li>

						<li>
							<span>
								<img src={PTF} alt="" />
							</span>
							<footer>
								<strong>Alex Botelho</strong>
								<p>612.252.432-68</p>
							</footer>
						</li>
					</ul>
				</div>
            </div>









		</>
	)
}
