# Previsão de dados a partir de nome - API REST
Dado o nome de uma pessoa, retorna sua possível nacionalidade, sexo e idade, além de uma frase motivacional.

## Configurações da API

A aplicação é desenvolvida em JavaScript, utilizando o Express como framework e NodeJs como ambiente de execução.

A API funciona por padrão na **porta 3000** e tem como banco de dados o **mysql**, que é manipulado através da ORM **Sequelize**. 

Todas suas configurações iniciais são passadas por variáveis de ambiente, encontradas no arquivo **.env** na raíz da aplicação:

| Variável    | Descrição                                     |
|-------------|----------------------------------------------:|
| DB_USERNAME | nome de usuário do banco de dados mysql       |
| DB_PASSWORD | usuário do banco de dados mysql               |
| DB_DATABASE | nome do database                              |
| DB_HOST     | endereço do banco de dados                    |
| DB_DIALECT  | diláto do banco                               |
| PORT        | Porta da aplicação                            |
| CHAVE_JWT   | Chave de segurança para configuração do Token |

### APIs utilizadas:

1. https://genderize.io/

2. https://agify.io/

3. https://nationalize.io/

4. https://www.affirmations.dev/

## Endpoints 

| Requisição  |  Endpoint         | Descrição                                                                         |
|-------------|:-----------------:|----------------------------------------------------------------------------------:|
| POST        |  /cadastro/       | Cria cadastro com email e senha                                                   |
| POST        |  /login/          | Realiza login com email e senha e retorna um Bearer JWT no cabeçalho Authorization |
| GET         |  /buscar/         | Realiza busca através de um nome enviado em Json                                  |
| GET         |  /buscar/{save}   | Realiza busca através de um nome enviado em Json e salva no banco de dados        |
| GET         |  /listar/         | Lista os dados de todos os nomes cadastrados no banco de dados                    |

## Login e Cadastro
O cadastro é feito através de uma requisição do tipo **POST** para **/cadastro** contendo um Json com email e senha

```json
Entrada:
{
    "email": "joao@email.com",
    "senha": "123456"
}
```
O método retorna 204 e o mesmo Json pode ser utilizado no **Login**, que pode ser realizado por uma requisição **POST** para **/login**.
Quando o login é bem-sucedido, ele retorna 204 e um Token JWT do tipo Bearer no cabeçalho **Authorization**, que deve ser passado no header das outras requisições dentro da API. O token por padrão tem um tempo de expiração de 15 minutos.

## Busca
A busca por um nome é feita pelo endpoint **/buscar/** com um método hottp **GET**.
A busca deve enviar um Json com um nome que deseja fazer a consulta e a resposta é retornada por um Json com o possível genero, país de origem, idade e uma frase motivacional em inglês. No caso do nome buscado já estar salvo no banco de dados da API, a saída também conterá o Id, e data da ultima atualização e criação. 

É realizada inicialmente a busca dentro do próprio banco de dados pois resulta numa resposta consideravelmente mais rápida que quando feita por um nome ainda não salvo.

Para salvar uma busca no banco de dados basta adicionar o parâmetro **{save}** no endpoint: **/buscar/save**

Essa requisição só é realizada com o bearer token válido passado pelo header **Authorization**

```json
Entrada:
{
    "nome":"matheus"
}
Saída Padrão:
{
    "nome": "Matheus",
    "genero": "masculino",
    "pais": "BR",
    "idade": "28",
    "frase": "You got this"
}
Saída do Banco de Dados:
{
    "id": 1,
    "nome": "Matheus",
    "genero": "masculino",
    "pais": "BR",
    "idade": "28",
    "frase": "You got this",
    "createdAt": "2021-07-05T20:02:08.000Z",
    "updatedAt": "2021-07-05T20:02:08.000Z"
}
```

## Listagem
É realizada através de uma requisição **GET** para **/listar/** e como resposta é devolvido um Json com os dados de todos os nomes salvos no banco de dados.

Essa requisição só é realizada com o bearer token válido passado pelo header **Authorization**
```json
Saída:
[
    {
        "id": 1,
        "nome": "Matheus",
            ...
    },
    {
        "id": 2,
        "nome": "Luana",
            ...
    },
    {
        "id": 3,
        "nome": "Pedro",
            ...
    },
]
```

