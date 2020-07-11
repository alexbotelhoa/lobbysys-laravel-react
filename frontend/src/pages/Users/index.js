import React, { useState, useEffect } from 'react';
import { RiDeleteBinLine } from 'react-icons/ri';
import { FiSave } from 'react-icons/fi';
import Cookies from 'js-cookie';

import './styles.css';
import api from '../../services/api';
import loading from '../../assets/loading.gif'

export default function Users() {
	const [chargeUsers, setChargeUsers] = useState(true);

    const [mensage, setMensage] = useState(null);
    const [users, setUsers] = useState([]);

	const [inputName, setInputName] = useState('');
	const [inputEmail, setInputEmail] = useState('');
    const [inputPassword, setInputPassword] = useState('');
    const [inputPasswordConfirm, setInputPasswordConfirm] = useState('');

    useEffect(() => {
        api.get('users', {
			headers: {
			  Authorization: `Bearer ${Cookies.get('token')}`
			}
		}).then(response => {
            setUsers(response.data)
        }).finally(() => setChargeUsers(null));
    }, []);

    function checkInputsForm(event) {
        event.preventDefault();

        if (inputName === '') return setMensage('Informe o nome do usuário!');
        if (inputEmail === '') return setMensage('Informe o e-mail do usuário!');
        if (inputPassword === '') return setMensage('Informe o password do visitante!');
        if (inputPasswordConfirm === '') return setMensage('Confirme o password informado!');
        if (inputPassword !== inputPasswordConfirm) return setMensage('As senhas não se correpondem!');

        createUser();
    }

    async function createUser() {
        const data = new FormData();
        data.append('name', inputName);
        data.append('email', inputEmail);
        data.append('password', inputPassword);
        data.append('c_password', inputPasswordConfirm);

        try {
            const user = await api.post('users', data, {
				headers: {
				  Authorization: `Bearer ${Cookies.get('token')}`
				}
			});

			if (user.status === 201) {
				setUsers([ user.data, ...users ]);
			} else {
				if (user.status === 226) return setMensage('Usuário já se encontra cadastrado!');
			}
        } catch (err) {
            alert('Erro ao tentar ADICIONAR o usuário!\nVerifique se esse E-MAIL já foi cadastrado.\nCaso não, tente novamente em alguns instantes!');
        }
    }

    async function handleDeleteUser(id) {
        try {
            await api.delete(`/users/${id}`, {
				headers: {
				  Authorization: `Bearer ${Cookies.get('token')}`
				}
			});

            setUsers(users.filter(user => user.id !== id));
        } catch (err) {
            alert('Erro ao tentar DELETAR o usuário!\nVerifique se esse E-MAIL contém registro(s) de "checkin".\nCaso não tenha, tente novamente em alguns instantes!');
        }
    }

    return	(
		<>
			<div className="container">
				<div className="contentMain">
					<div className="contentUser">
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
									<label htmlFor="email">E-mail * (Máx. 30 caracteres)</label>
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

							<div className="field-group">
								<div className="field">
									<label htmlFor="password">Password * (Min. 6 caracteres)</label>
									<input
										data-testid="password"
										name="password"
										type="password"
										placeholder="Informe uma SENHA"
										value={inputPassword}
										onChange={e => setInputPassword(e.target.value)}
									/>
								</div>
								<div className="field">
									<label htmlFor="password-confirm">Confirme Password * (Min. 6 caracteres)</label>
									<input
										data-testid="passwordConfirm"
										name="passwordConfirm"
										type="password"
										placeholder="Confirme sua SENHA"
										value={inputPasswordConfirm}
										onChange={e => setInputPasswordConfirm(e.target.value)}
									/>
								</div>
							</div>
							<div className="btnSalveUser">
								<span>
									<FiSave size="26" title="Novo Usuário" />
								</span>
								<button data-testid="btnSalveUser" type="submit" onClick={() => {}}>
									<strong>Cadastrar novo usuário</strong>
								</button>
							</div>
						</form>
					</div>

					<div className="contentUsers">
						{ chargeUsers && (
							<div className="contentLoading">
								<img src={loading} width="120px" />
							</div>
						) }
						<ul>
							{users.map((user, index) => (
								<li key={user.id}>
									<h3>{index + 1}</h3>
									<header>{user.name}</header>
									<footer>{user.email}</footer>
									<button data-testid="btnDeleteUser" onClick={() => handleDeleteUser(user.id)}>
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
