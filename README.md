# Agenda de Casa

Site independente com os Métodos da Roarchela: observar, escolher, testar, viver e ajustar.

Abas: Hoje, Atividade, Registros, A semana e O método. Inclui atividades com cronômetro, registros editáveis, gráficos por ambiente, agenda semanal e três tamanhos de letra.

Os registros ficam apenas no navegador de cada pessoa. Não há conta nem sincronização entre aparelhos. Limpar os dados do navegador remove os registros.

Para visualizar localmente: `python3 -m http.server 4187 --bind 127.0.0.1`.

Para publicar: Settings → Pages → Deploy from a branch → main → /(root) → Save.

Endereço esperado: https://roarchela-ux.github.io/agenda-de-casa/

## Catálogo do aplicativo

O site inclui 188 atividades da edição `guide-optimized-5-15-30-1.12`: 40 de 5 minutos, 108 de 15 e 40 de 30. O arquivo `catalog.js` contém apenas o conteúdo editorial necessário ao site, sem dados pessoais nem metadados privados das fontes. A exportação aplica as revisões editoriais na ordem das migrações 0015 a 0027, incluindo os 38 acréscimos de cuidados da casa toda.

Para atualizar a partir do repositório do aplicativo, execute `python3 tools/import-catalog.py /caminho/para/metodos_da_ro`. O script valida quantidade, identificadores, ambientes, durações e orientações antes de gerar o arquivo.

As atividades escolhidas guardam uma cópia das orientações no navegador; novos catálogos não reescrevem um cuidado em andamento. Registros e planejamentos anteriores permanecem disponíveis.

## Atividade do dia e rodízio semanal

As 188 atividades ficam nos bastidores do rodízio; não há navegação pública pelo catálogo. A aba O método indica **Métodos da RoArchela (app)**.

- Segunda: sala; terça: cozinha e lavanderia (alternadas semanalmente); quarta: quartos; quinta: banheiros; sexta: escritório e vida financeira; sábado: áreas externas; domingo: família e passeios (ambiente Outro).
- A recomendação é determinada pela data local, com semanas contadas a partir de 02/11/2026. Recarregar ou abrir uma atividade não altera a sugestão daquele dia.
- Cada ambiente intercala as durações disponíveis e percorre todas as suas atividades antes de repetir. Todos os 188 cuidados participam do rodízio. A semana mostra as sugestões dos sete dias sem criar tarefas atrasadas.
- É possível fazer a atividade do dia ou acrescentar outros cuidados à agenda. Sugestões extras não alteram a recomendação do dia nem substituem um cuidado em andamento.
- Links antigos de catálogo redirecionam para O método. Os arquivos editoriais continuam necessários ao funcionamento do rodízio, sem controle de acesso ou promessa de sigilo do conteúdo.

Verificação do rodízio: `node --test tools/catalog.test.cjs`.

## Ambientes e projetos

A entrada do site apresenta projetos de organização por ambiente, disponíveis para desenvolver ao longo de dias ou semanas. A área inclui 12 ideias iniciais, entre elas closet, cantinho de leitura, estante, aparador e despensa. Os dias são referências de cuidado, sem bloquear o acesso aos projetos.

Os quatro princípios editoriais são: “Nada quebrado, nada faltando, nada fora do lugar”; “O estoque está na loja”; o ciclo contínuo observar → escolher → testar → viver → ajustar; e organização como melhoria contínua. Cada projeto relaciona o ciclo ao uso real do espaço, sem percentual de conclusão ou prazo obrigatório.

`projects.js` contém o catálogo editorial `HOUSE_PROJECTS` (ambientes e projetos com IDs estáveis) e sua apresentação. As anotações e o ponto de retomada ficam na chave local `roarchela-projects-v1`, separada dos dados anteriores de atividades, registros e agenda. O conteúdo está preparado para uma futura adaptação ao app, mas ainda não há integração ou sincronização.

Verificação: `node --check projects.js`, `node --check app.js` e `node --test tools/*.test.cjs`, além da conferência no navegador de links, anotações após recarga e leitura ampliada no celular.

## Ícone do celular

O site inclui `manifest.webmanifest`, ícones PNG de 192 e 512 pixels, ícone Apple de 180 pixels e favicon de 32 pixels. O atalho se chama **Agenda de Casa** e inicia em `#ambientes`, com escopo restrito a este site. A abertura independente depende do suporte do navegador; não há promessa de funcionamento offline.

Arte original do ícone: `assets/agenda-de-casa-icon.png`, criada com a ferramenta integrada de geração de imagens a partir da personagem existente, sem substituir a imagem do cabeçalho. Prompt: criar um ícone quadrado para a tela inicial de Agenda de Casa, preservando cabelo castanho com mecha fúcsia, óculos escuros e roupa violeta da personagem; retrato centralizado de cabeça e ombros, legível em tamanho pequeno, fundo lavanda claro opaco até as bordas, sem texto, moldura ou cantos arredondados externos, com margem para recorte pelo sistema do celular. Os demais tamanhos são reduções da arte selecionada.
