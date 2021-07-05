### Descrição:
Produzir uma API que, dado o nome de uma pessoa, retornar sua possível nacionalidade, sexo e idade, além de uma frase motivacional. Exemplo de entrada e retorno:

 
~~~
Entrada:
{
  "nome":"matheus"
}
Saída:
{
  "nome": "Matheus", // primeira letra maiuscula
  "genero": "masculino", // enum para "masculino", "feminino", "outro"
  "pais": "Brazil" // país em inglês
  "idade": "52 anos" // idade com seguida de " anos" ou " ano"
  "frase": "You are worthy and deserving of respect"
}
~~~

### APIs utilizadas:

1. https://genderize.io/

2. https://agify.io/

3. https://nationalize.io/

4. https://www.affirmations.dev/