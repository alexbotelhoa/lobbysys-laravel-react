import React, { useState, useEffect }  from 'react';
import { RiDeleteBinLine } from 'react-icons/ri';
import { FiSave } from 'react-icons/fi';
import Cookies from 'js-cookie';

import './styles.css';
import api from '../../services/api';

export default function Visitors() {
	const [mensage, setMensage] = useState(null);
	const [visitors, setVisitors] = useState([]);

	const [inputName, setInputName] = useState('');
	const [inputCpf, setInputCpf] = useState('');
	const [inputBirth, setInputBirth] = useState('');
	const [inputEmail, setInputEmail] = useState('');

	useEffect(() => {
        api.get('visitors', {
			headers: {
			  Authorization: `Bearer ${Cookies.get('token')}`
			}
		}).then(response => {
            setVisitors(response.data)
        })
	}, []);

	function checkInputsForm(event) {	
		event.preventDefault();

		if (inputName === '') return setMensage('Informe o nome do visitante!');
		if (inputCpf === '') return setMensage('Informe o CPF do visitante!');
		
		createVisitor();
	};

	async function createVisitor() {
		const data = new FormData();
		data.append('name', inputName);
        data.append('cpf', inputCpf);
        data.append('birth', inputBirth);
		data.append('email', inputEmail);
		
		try {
			const visitor = await api.post('visitors', data, {
				headers: {
				  Authorization: `Bearer ${Cookies.get('token')}`
				}
			});

			if (visitor.status === 201) {
				setVisitors([ visitor.data, ...visitors ]);
			} else {
				if (visitor.status === 226) return setMensage('Visitante já se encontra cadastrado!');
			}
		} catch (err) {
			alert('Erro ao tentar ADICIONAR o visitante!\nVerifique se o CPF já foi cadastrado.\nCaso não, tente novamente em alguns instantes!');
		}	
	}

	async function handleDeleteVisitor(id) {
        try {
            await api.delete(`/visitors/${id}`, {
				headers: {
				  Authorization: `Bearer ${Cookies.get('token')}`
				}
			});
        
            setVisitors(visitors.filter(visitor => visitor.id !== id));
        } catch (err) {
			alert('Erro ao tentar DELETAR o visitante!\nVerifique se o visitante contém registro(s) de "checkin".\nCaso não tenha, tente novamente em alguns instantes!');
        }
	};
	
    return	( 
		<>
			<div className="container">
				<div className="contentMain">
					<div className="contentVisitor">
						<form onSubmit={checkInputsForm}>						
							<div className="field-group">
								<div className="field">
									<label htmlFor="name">Nome * (Máx. 50 caracteres)</label>
									<input 
										data-testid="name" 
										name="name"
										type="text"
										maxLength="50"
										placeholder="Informe seu NOME"
										value={inputName}
										onChange={e => setInputName(e.target.value)}
									/>
								</div>
								<div className="field">
									<label htmlFor="cpf">CPF *</label>
									<input 
										data-testid="cpf" 
										name="cpf"
										type="text"
										maxLength="14"
										placeholder="Informe seu CPF"
										value={inputCpf}
										onChange={e => setInputCpf(e.target.value)}
									/>
								</div>
							</div>

							<div className="field-group">
								<div className="field">
									<label htmlFor="birth">Data de Nascimento</label>
									<input 
										data-testid="birth" 
										name="birth"
										type="date"
										placeholder="Informe sua DATA DE NASCIMENTO"
										value={inputBirth}
										onChange={e => setInputBirth(e.target.value)}
									/>
								</div>
								<div className="field">
									<label htmlFor="email">E-mail (Máx. 30 caracteres)</label>
									<input 
										data-testid="email" 
										name="email"
										type="email"
										maxLength="30"
										placeholder="Informe seu E-MAIL"
										value={inputEmail}
										onChange={e => setInputEmail(e.target.value)}
									/>
								</div>
							</div>							
							<div className="btnSalveVisitor">	
								<span>
									<FiSave size="26" title="Novo Visitante" />
								</span>
								<button data-testid="btnSalveVisitor" type="submit" onClick={() => {}}>
									<strong>Cadastrar novo visitante</strong>
								</button>
							</div>															
						</form>
					</div>

					<div className="contentVisitors">			
						<ul>
							{visitors.map((visitor, index) => (
								<li key={visitor.id}>
									<h3>{index + 1}</h3>
									<header>{visitor.name}</header>
									<p>{visitor.cpf}</p>
									<span>{new Date(visitor.birth).toLocaleDateString()}</span>
									<footer>{visitor.email}</footer>
									<button data-testid="btnDeleteVisitor" onClick={() => handleDeleteVisitor(visitor.id)}>
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
