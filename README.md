`...::: Projeto criado por ®WW(Wagner Ricardo Wagner) | wagnerricardonet@gmail.com :::..`

## Template Node.js Stack ![alt text](https://www.prchecker.info/free-icons/64x64/rocket_64_px.png)

Este template é "casca" inicial de uma aplicação, visado a produtividade. Nele contém apenas o cadastro de usuários. A stack dele é composta pelo Express, knex, objectionJS, multer....

Siga os passos abaixo para entender e configurar o seu ambiente pq a coisa fico fodax ;)

#### Comece por aqui:

- Execute o`yarn` para instalar as dependências;

- instale de forma global o knex `yarn global add knex` ou `npm i -g knex`;

- crie um arquivo `.env` na raíz do projeto e copie o conteúdo do `.env.example`.

- Configure as varáveis de ambiente;

#### Criando a base:

Crie sua base de dados no banco pg;

- Com o seu terminal vá até o diretório raíz do projeto e execute `knex migrate:latest`

- Após rodar as migrations, rodar os seeds: `knex seed:make adm`

#### Start:

Para roda a api em ambiente de desenvolvimento execute `yarn dev`:

[Acesse aqui a sua api](http://localhost:3001`)
