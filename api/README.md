# Documentação do Backend

## Endpoints

### Receitas

- **Criação de Receita**
  - Método: POST
  - URL: `/receitas`
  - Descrição: Cria uma nova receita no sistema.

- **Edição de Receita**
  - Método: PUT
  - URL: `/receitas/{id}`
  - Descrição: Edita uma receita existente no sistema.

- **Deleção de Receita**
  - Método: DELETE
  - URL: `/receitas/{id}`
  - Descrição: Deleta uma receita existente no sistema.

- **Upload de Imagens da Receita**
  - Método: POST
  - URL: `/receitas/upload`
  - Descrição: Faz o upload de uma imagem para a receita especificada.

### Usuários

- **Login**
  - Método: POST
  - URL: `/auth/login`
  - Descrição: Realiza o login de um usuário no sistema.

- **Criação de Usuário**
  - Método: POST
  - URL: `/user`
  - Descrição: Cria um novo usuário no sistema.

- **Deleção de Usuário**
  - Método: DELETE
  - URL: `/user/{id}`
  - Descrição: Deleta um usuário existente.

- **Edição de Usuário**
  - Método: PUT
  - URL: `/user/{id}`
  - Descrição: Edita um usuário existente no sistema.
