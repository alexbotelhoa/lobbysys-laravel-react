<h1 align="center">
  <img src="https://user-images.githubusercontent.com/44276302/85951015-b6889b80-b936-11ea-9085-0a7209f9cb8f.png">
</h1>

<h4 align="center">
  🚀 LobbySys v1.0
</h4>

<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/alexbotelhoa/lobbysys-laravel-react?color=ff0000"> 
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/alexbotelhoa/lobbysys-laravel-react?color=%23F7DF1E">
  <img alt="GitHub repo size" src="https://img.shields.io/github/repo-size/alexbotelhoa/lobbysys-laravel-react">
  <a href="https://github.com/alexbotelhoa/lobbysys-laravel-react/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/alexbotelhoa/lobbysys-laravel-react">
  </a>
  <a href="https://github.com/alexbotelhoa/lobbysys-laravel-react/issues">
    <img alt="Repository issues" src="https://img.shields.io/github/issues/alexbotelhoa/lobbysys-laravel-react">
  </a>
  <img alt="License" src="https://img.shields.io/badge/license-MIT-brightgreen">
</p>

<p align="center">
  <img alt="LobbySys" src="https://user-images.githubusercontent.com/44276302/85958432-e4d49e00-b96b-11ea-94db-d990ec274dcc.jpg" />
</p>

<p align="center">
    <a href="#computer-projeto">Projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
    <a href="#rocket-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
    <a href="#computer_mouse-backend">Backend</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
    <a href="#computer-frontend">Frontend</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
    <a href="#memo-licença">Licença</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
    <a href="https://www.linkedin.com/in/alex-botelho-almeida/">
      <img src="https://img.icons8.com/color/24/000000/linkedin.png"/>
    </a>
    <a href="https://www.youtube.com/channel/UC6N_L0nZWRjcym8bnChKppw/">
      <img src="https://img.icons8.com/color/24/000000/youtube-play.png"/>
    </a>
</p>

## :computer: Projeto

O LobbysSys é um sistema de controle de portaria, feito como desafio para uma empresa de Florianópolis. Utilizei o SQLite para banco de dados, para o backend usei a linguagem PHP utilizando o Framework Laravel e para o frontend fiz em Javascript com Framework React.

## :rocket: Tecnologias

:point_down: Esse projeto foi desenvolvido com as seguintes tecnologias: :point_down:

Backend:
-  [PHPStorm](https://www.jetbrains.com/pt-br/phpstorm/)
-  [Laravel](https://laravel.com/)
-  [SQLite](https://www.sqlite.org/)
-  [CORS](https://github.com/fruitcake/laravel-cors)
-  [Passport](https://laravel.com/docs/7.x/passport)
-  [Tinker](https://github.com/laravel/tinker)
-  [Facade](https://github.com/facade/ignition)
-  [Faker](https://github.com/fzaninotto/Faker)
-  [Mockery](https://github.com/mockery/mockery)
-  [PHPUnit](https://phpunit.de/)

Frontend:
-  [VS Code](https://code.visualstudio.com/)
-  [Axios](https://github.com/axios/axios)
-  [Axios Mock](https://github.com/ctimmerm/axios-mock-adapter)
-  [React Bootstrap](https://react-bootstrap.github.io/)
-  [JS Cookie](https://github.com/js-cookie/js-cookie)
-  [React](https://pt-br.reactjs.org/)
-  [ReactJS](https://reactjs.org/)
-  [React Icons](https://github.com/react-icons/react-icons)
-  [React Route DOM](https://reacttraining.com/react-router/web/guides/quick-start)
-  [Testing Libray](https://testing-library.com/)
-  [Enzyme](https://enzymejs.github.io/enzyme/)
-  [Enzyme Adpter](https://www.npmjs.com/package/enzyme-adapter-react-16)

## :information_source: Desenvolvimento

### :computer_mouse: Backend: 

```bash
# Clone o Repositório
$  git clone https://github.com/alexbotelhoa/lobbysys-laravel-react.git
# Va até o diretório do backend, e instale suas dependências
$ cd backend
# Instale as dependências
$ composer install && npm install && npm run dev
# Rode o backend 
$ php artisan serve
```
Obs.: 
  1. Crie o arquivo do banco de dados SQLite na pasta 'database' com o nome database.sqlite.
  2. Após rodar o Migrate, não esqueça de rodar os Seeders.
  3. Usuário padão para login é admin@lobbysys.com e senha 12345678.

### :computer: Frontend: 

```bash
#Vá até a pasta frontend 
$ cd frontend 
#Instale as dependências
$ npm install 
#Inicie a aplicação 
$ npm start
```
Obs.: 1. Acerte o arquivo de configuração da API que se encontra na pasta services.

## :memo: Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE.md) para mais detalhes.

---
