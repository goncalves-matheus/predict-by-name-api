# Previsão de dados API REST
Dado o nome de uma pessoa, retorna sua possível nacionalidade, sexo e idade, além de uma frase motivacional.

## Exemplo de entrada:
```json
Entrada:
{
    "nome":"matheus"
}
Saída:
{
    "nome": "Matheus",
    "genero": "masculino",
    "pais": "Brazil",
    "idade": "52 anos",
    "frase": "You are worthy and deserving of respect"
}
```
## Endpoints 

| Requisição  |  Endpoint         | Descrição                                                                         |
|-------------|:-----------------:|----------------------------------------------------------------------------------:|
| POST        |  /cadastro/       | Cria cadastro com email e senha                                                   |
| POST        |  /login/          | Realiza login com email e senha e retona um Bearer JWT no cabeçalho Authorization |
| GET         |  /buscar/         | Realiza busca através de um nome enviado em json                                  |
| GET         |  /buscar/{save}   | Realiza busca através de um nome enviado em json e salva no banco de dados        |
| GET         |  /listar/         | Lista os dados de todos os nomes cadastrados no banco de dados                    |