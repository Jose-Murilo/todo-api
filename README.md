# RF (Requisitos funcionais)
  [ ] - Criação de uma task

  [ ] - Listagem de todas as tasks

  [ ] - Atualização de uma task pelo `id`

  [ ] - Remover uma task pelo `id`

  [ ] - Marcar pelo `id` uma task como completa

# RN (Regras de negócio)
-- Uma task deve ter:

  [ ] - `id` - Identificador único de cada task

  [ ] - `title` - Título da task

  [ ] - `description` - Descrição detalhada da task

  [ ] - `completed_at` - Data de quando a task foi concluída. O valor inicial deve ser `null`

  [ ] - `created_at` - Data de quando a task foi criada.

  [ ] - `updated_at` - Deve ser sempre alterado para a data de quando a task foi atualizada.

# RNF (Requisitos não funcionais) 
  [ ] - Deve ser possível marcar a task como completa ou não. Isso significa que se a task estiver concluída, deve voltar ao seu estado “normal”.

  [ ] - Antes da alteração, deve ser feito uma validação se o `id` pertence a uma task salva no banco de dados.