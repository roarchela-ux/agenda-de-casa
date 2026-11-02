# Agenda de Casa

Site independente com os Métodos da Roarchela: observar, escolher, testar, viver e ajustar.

Abas: Hoje, Missão, Registros, A semana e O método. Inclui missões com cronômetro, registros editáveis, gráficos por ambiente, agenda semanal e três tamanhos de letra.

Os registros ficam apenas no navegador de cada pessoa. Não há conta nem sincronização entre aparelhos. Limpar os dados do navegador remove os registros.

Para visualizar localmente: `python3 -m http.server 4187 --bind 127.0.0.1`.

Para publicar: Settings → Pages → Deploy from a branch → main → /(root) → Save.

Endereço esperado: https://roarchela-ux.github.io/agenda-de-casa/

## Catálogo do aplicativo

O site inclui 188 missões da edição `guide-optimized-5-15-30-1.12`: 40 de 5 minutos, 108 de 15 e 40 de 30. O arquivo `catalog.js` contém apenas o conteúdo editorial necessário ao site, sem dados pessoais nem metadados privados das fontes. A exportação aplica as revisões editoriais na ordem das migrações 0015 a 0027, incluindo os 38 acréscimos de cuidados da casa toda.

Para atualizar a partir do repositório do aplicativo, execute `python3 tools/import-catalog.py /caminho/para/metodos_da_ro`. O script valida quantidade, identificadores, ambientes, durações e orientações antes de gerar o arquivo.

As missões escolhidas guardam uma cópia das orientações no navegador; novos catálogos não reescrevem um cuidado em andamento. Registros e planejamentos anteriores permanecem disponíveis.
