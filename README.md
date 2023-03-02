# Monitor

ComandosGit
Quando realizar alteração no git devemos dar o git commit e o git push para um branch novo. 
Quando a edição realizada no branch estiver completa deve ser feito um push request no GitHub e dois dos desenvolvedores devem checar as alteração para ver se existe conflito e verificar o código para que ele seja fundido (merge) com o branch master.


Comandos relacionados a branch:
	git branch = mostra todas as branchs existentes
    git branch -a - mostra os branchs locais e os remotos (que estão no github)
	git checkout -b NOME-DO-BRANCH = Cria uma nova branch - a partir da branch master.
	git checkout NOME-DO-BRANCH = sem o -b o comando troca de branch
	git push -u origin NOME-DO-BRANCH = Dá o push para a nova branch.
	git branch -d NOME-DO-BRANCH = Deleta o branch.
	git merge NOME-DO-BRANCH = Pega o contéudo do branch desejado e passa para o branch atual.


Comando úteis do git
	git commit --amend --no-edit --author "NOME CERTO <emailcerto@mydomain.com>" = Se deu commit com nome/email errado
	git commit -am "comentário objetivo" = Permite você já adicionar arquivo no 'palco' (stage) para que possam ser dado um commit direto.
	git commit --amend = Sobrescreve o último commit.
	git commit --amend -C HEAD = Adiciona ao ultimo commit com o mesmo comentário.
	git revert ID-DO-COMMIT = Reverte o conteúdo e volta as alterações do commit.
    Exemplo: git revert 504fab770bf8e892ce9a56c6a3fb85eec5320cdf.
	git checkout NOME-DO-ARQUIVO = Reverte o arquivo para seu estado anterior.
	git checkout --. = Reverte tudo.


Diferença entre Merge e Rebase
O merge mescla o branch atual com outro branch ambos em seu estado atual. O rebase pega seu branch atual e muda seu inicio, sua base.

<hr>

# Como usar

1. Clone este repositório em sua máquina.


1. Crie, no Banco de Dados, as tabelas necessárias para o funcionamento deste projeto.
- Siga as instruções no arquivo **/site/src/database/script-tabelas.sql**


3. Acesse o arquivo **/site/app.js** e parametrize o ambiente.
- Se você estiver utilizando o Ambiente de Produção (SQL Server na nuvem Azure, remoto), comente a linha 1 e deixe habilitada a linha 2 onde está o valor **process.env.AMBIENTE_PROCESSO = "producao";**
- Se você estiver utilizando o Ambiente de Desenvolvimento (MySQL Workbench, local), comente a linha 2 e deixe habilitada a linha 1 onde está o valor **process.env.AMBIENTE_PROCESSO = "desenvolvimento";**

4. Adicione as credenciais de Banco de Dados no arquivo **/site/src/database/config.js**, seguindo as instruções neste.

5. Acesse o local do diretório **/site** presente neste repositório no seu terminal (GitBash ou VSCode) e execute os comandos abaixo:

```
npm i
``` 
_O comando acima irá instalar as bibliotecas necessárias para o funcionamento do projeto. As bibliotecas a serem instaladas estão listadas no arquivo **package.json** então é muito importante que este não seja alterado. Será criada uma nova pasta/diretório chamado **node_modules** quando o comando for finalizado, que é onde as bibliotecas estão localizadas. Não altere a pasta/diretório._

```
npm start
``` 

_O comando acima irá iniciar seu projeto e efetuar os comandos de acordo com a sua parametrização feita nos passos anteriores._

6. Para "ver" seu projeto funcionando, acesse em seu navegador o caminho **informado no terminal**.

7. Caso queira parar a execução, tecle **CTRL+C** no terminal em que o projeto está rodando.

## Adicionar novo recurso ao projeto

**"Recurso? O que é?"** Enquanto no Banco de Dados chamamos as tabelas de "entidades", quando tratamos de desenvolvimento WEB usamos a palavra "recurso" para se referir a algo que podemos criar, ler, atualizar ou deletar [1]. Estas ações são conhecidas como CRUD: Create, Read, Update e Delete. Para acessar cada ação, usamos os métodos HTTP: POST, GET, PUT e DELETE [2]. (Há outros verbos, porém com estes já conseguimos efetuar CRUDs). 

**Tabela para ajudar a fazer a associação**

<table>
  <tr>
    <th>C.R.U.D</th>
    <th>Ação</th>
    <th>Tradução</th>
    <th>Verbo HTTP *</th>
    <th>Comando BD</th>
  </tr>
  <tr>
    <td>C</td>
    <td>Create</td>
    <td>Criar</td>
    <td>POST</td>
    <td>INSERT</td>
  </tr>
  <tr>
    <td>R</td>
    <td>Read</td>
    <td>Ler</td>
    <td>GET</td>
    <td>SELECT</td>
  </tr>
  <tr>
    <td>U</td>
    <td>Update</td>
    <td>Atualizar</td>
    <td>PUT</td>
    <td>UPDATE</td>
  </tr>
  <tr>
    <td>D</td>
    <td>Delete</td>
    <td>Deletar</td>
    <td>DELETE</td>
    <td>DELETE</td>
  </tr>
</table>
