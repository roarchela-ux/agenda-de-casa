'use strict';
// Conteúdo editorial independente das missões; reutilizável no futuro aplicativo.
window.HOUSE_PROJECTS = {
  "rooms": [
    {
      "id": "salas",
      "title": "Salas",
      "icon": "Sala",
      "day": "Segunda-feira",
      "description": "Móveis, livros, objetos e cantinhos para conviver."
    },
    {
      "id": "quartos",
      "title": "Quartos e closet",
      "icon": "Quarto",
      "day": "Quarta-feira",
      "description": "Roupas e espaços que acompanham seu jeito de viver."
    },
    {
      "id": "cozinha",
      "title": "Cozinha",
      "icon": "Cozinha",
      "day": "Terça-feira",
      "description": "Tudo à mão para preparar e compartilhar."
    },
    {
      "id": "banheiros",
      "title": "Banheiros",
      "icon": "Banheiro",
      "day": "Quinta-feira",
      "description": "Espaço para os cuidados de todos os dias."
    },
    {
      "id": "servico",
      "title": "Área de serviço",
      "icon": "Área de serviço",
      "day": "Terça-feira",
      "description": "Soluções para cuidar da casa com praticidade."
    },
    {
      "id": "escritorio",
      "title": "Escritório",
      "icon": "Escritório",
      "day": "Sexta-feira",
      "description": "Um lugar possível para trabalhar e cuidar dos papéis."
    },
    {
      "id": "externas",
      "title": "Áreas externas",
      "icon": "Área externa",
      "day": "Sábado",
      "description": "Varandas e pequenos espaços para aproveitar."
    }
  ],
  "projects": [
    {
      "id": "cantinho-leitura",
      "room": "salas",
      "title": "Um cantinho para ler",
      "description": "Transforme um espaço da sala em um convite à leitura.",
      "tags": "cantinho · móveis · iluminação",
      "cycle": [
        "Observe onde você gosta de sentar, a luz disponível e o caminho das pessoas. O que está quebrado, faz falta ou ficou fora do lugar?",
        "Escolha um cantinho e os livros que quer ter por perto. Comece com uma cadeira, apoio e iluminação que já existam na casa.",
        "Experimente a composição sem bloquear passagens. Organize os livros ao alcance e deixe os fios fora do caminho. Peça ajuda para deslocar móveis pesados.",
        "Use o cantinho por alguns dias. Perceba o conforto, a luz e a facilidade de pegar e devolver os livros.",
        "Ajuste a posição ou a quantidade de objetos conforme o uso. Se algo realmente faltar, defina a necessidade antes de comprar."
      ]
    },
    {
      "id": "estante-historia",
      "room": "salas",
      "title": "Uma estante com a sua história",
      "description": "Dê lugar aos livros, fotografias e objetos que fazem parte da sua vida.",
      "tags": "livros · objetos decorativos",
      "cycle": [
        "Observe o que a estante guarda e o que você gostaria de encontrar ou apreciar com mais facilidade.",
        "Escolha uma parte para começar e um critério para os livros: assunto, autoria ou outro que faça sentido para você.",
        "Agrupe os livros e experimente composições com fotografias e objetos. Use os espaços existentes antes de buscar organizadores; mantenha o peso dentro da capacidade da estante.",
        "Conviva com a nova disposição. Veja se é fácil localizar um livro, devolvê-lo e cuidar da superfície.",
        "Reveja os agrupamentos e abra espaço quando necessário. A estante pode mudar junto com suas leituras e sua história."
      ]
    },
    {
      "id": "sala-receber",
      "room": "salas",
      "title": "Uma sala para conviver e receber",
      "description": "Repense os móveis e abra espaço para o que acontece na sua sala.",
      "tags": "móveis · espaços de circulação",
      "cycle": [
        "Observe os caminhos entre portas, janelas e assentos. Onde a passagem fica difícil? Como a sala é usada pelas pessoas da casa?",
        "Escolha uma mudança na disposição que favoreça uma dessas atividades, preservando a circulação.",
        "Desenhe ou meça a nova posição antes de mover. Experimente com os móveis existentes e peça ajuda para peças pesadas; preserve saídas e acessos.",
        "Use a sala em diferentes momentos. Perceba se conversar, passar e alcançar os objetos ficou mais fácil.",
        "Ajuste a disposição ao uso real. Um espaço livre também pode ser parte da organização."
      ]
    },
    {
      "id": "aparador",
      "room": "salas",
      "title": "Uma nova vida para o aparador",
      "description": "Organize as gavetas e componha uma superfície que faça sentido na sua sala.",
      "tags": "gavetas · superfícies · decoração",
      "cycle": [
        "Observe o que se acumula sobre o aparador e dentro das gavetas. Quais objetos pertencem a outros espaços?",
        "Escolha uma gaveta ou um trecho da superfície. Defina o que esse espaço precisa guardar ou apoiar.",
        "Agrupe os objetos por uso e devolva os demais aos seus lugares. Experimente divisórias e composições com o que você já tem.",
        "Observe se a superfície continua disponível e se a gaveta permite ver, pegar e devolver.",
        "Reduza ou reorganize o conteúdo que dificulta o uso. Anote onde retomar antes de abrir outra gaveta."
      ]
    },
    {
      "id": "controles",
      "room": "salas",
      "title": "Controles e eletrônicos no lugar",
      "description": "Encontre um lugar simples para os acessórios usados por todos.",
      "tags": "controles · eletrônicos · fios",
      "cycle": [
        "Observe quais controles, cabos e acessórios são usados na sala e quais deixaram de funcionar.",
        "Escolha um lugar acessível para os controles e separe os acessórios por aparelho. Identifique o que precisa de reparo ou destinação adequada.",
        "Teste uma bandeja ou caixa que já tenha. Organize apenas cabos externos já desconectados, conforme o fabricante; mantenha ventilação e tomadas livres. Reparos elétricos pedem profissional.",
        "Perceba se todos encontram os controles e conseguem devolvê-los sem procurar uma orientação.",
        "Ajuste o lugar conforme o uso. Reponha acessórios somente quando houver necessidade identificada, sem acumular reservas."
      ]
    },
    {
      "id": "closet",
      "room": "quartos",
      "title": "Um closet que acompanha sua vida",
      "description": "Organize roupas e acessórios por partes, experimentando o que funciona na sua rotina.",
      "tags": "closet · roupas · acessórios",
      "cycle": [
        "Observe como você escolhe uma roupa e onde guardar se torna difícil. Identifique peças que precisam de reparo e o espaço realmente disponível.",
        "Escolha uma categoria para começar, como camisetas. Separe um lugar temporário e reserve tempo para guardar tudo ao parar.",
        "Organize essa categoria por uso e facilidade de acesso. Experimente dobras, cabides e caixas existentes antes de comprar soluções.",
        "Use o closet por alguns dias. Perceba o que você encontra, veste e consegue guardar com facilidade.",
        "Ajuste a distribuição, encaminhe reparos e reveja o que permanece. O estoque está na loja: uma falta real orienta a compra, em vez de acumular por precaução."
      ]
    },
    {
      "id": "cabeceira",
      "room": "quartos",
      "title": "Um cantinho para desacelerar",
      "description": "Reorganize a cabeceira e os objetos que acompanham seu descanso.",
      "tags": "cabeceira · superfícies",
      "cycle": [
        "Observe o que ocupa a cabeceira e o que você usa ao deitar e ao acordar.",
        "Escolha os poucos objetos que precisam ficar ao alcance e um lugar para os demais.",
        "Experimente uma composição com o que já existe e preserve o acesso à iluminação.",
        "Use o espaço durante alguns dias e perceba o que facilita sua rotina.",
        "Ajuste a disposição quando suas necessidades mudarem."
      ]
    },
    {
      "id": "despensa",
      "room": "cozinha",
      "title": "Uma despensa que deixa ver o que há",
      "description": "Encontre os alimentos e planeje as reposições a partir do consumo real.",
      "tags": "despensa · estoque",
      "cycle": [
        "Observe os alimentos, as validades e os locais onde produtos acabam esquecidos.",
        "Escolha uma prateleira ou categoria. Identifique o que é consumido e o espaço disponível.",
        "Agrupe por uso e deixe acessíveis os itens com validade mais próxima. Preserve as informações de conservação e validade das embalagens.",
        "Acompanhe o consumo antes de repor. Veja se todos conseguem localizar e guardar os alimentos.",
        "Ajuste as quantidades ao consumo. O estoque está na loja: compre conforme a necessidade, sem transformar espaço livre em obrigação de estocar."
      ]
    },
    {
      "id": "banheiro-uso",
      "room": "banheiros",
      "title": "Um banheiro pronto para o uso",
      "description": "Dê lugar aos itens de cuidado, mantendo as superfícies disponíveis.",
      "tags": "armários · cuidados pessoais",
      "cycle": [
        "Observe os produtos utilizados, suas validades e o que fica sobre a bancada.",
        "Escolha uma área e identifique quais itens precisam estar mais acessíveis.",
        "Agrupe os itens por uso com os recipientes que já tem. Respeite as orientações de conservação e mantenha produtos fora do alcance de crianças.",
        "Observe se usar, guardar e cuidar da bancada ficou mais simples.",
        "Ajuste os lugares e reponha conforme o consumo; evite acumular embalagens e reservas sem necessidade."
      ]
    },
    {
      "id": "lavanderia",
      "room": "servico",
      "title": "Uma lavanderia que facilita a rotina",
      "description": "Organize produtos e utensílios conforme o caminho dos cuidados.",
      "tags": "produtos · utensílios",
      "cycle": [
        "Observe onde ficam os utensílios e como você circula para cuidar das roupas.",
        "Escolha uma prateleira e os materiais que precisam ficar juntos por finalidade.",
        "Reorganize com os apoios existentes. Mantenha produtos nas embalagens originais, conforme o rótulo e fora do alcance de crianças; não misture produtos.",
        "Use o espaço na rotina e perceba o que ficou mais fácil de alcançar e guardar.",
        "Ajuste a distribuição e a reposição ao consumo, mantendo os acessos livres."
      ]
    },
    {
      "id": "mesa-trabalho",
      "room": "escritorio",
      "title": "Uma mesa para suas ideias",
      "description": "Abra espaço para trabalhar e encontre um lugar para os papéis.",
      "tags": "mesa · papéis · gavetas",
      "cycle": [
        "Observe o que ocupa a mesa e quais papéis ou objetos você precisa encontrar durante o trabalho.",
        "Escolha um trecho para liberar e uma categoria de documentos para organizar.",
        "Agrupe documentos por finalidade, preservando os que precisam ser guardados. Teste pastas e divisórias existentes e um lugar para o que ainda pede decisão.",
        "Use a mesa e perceba se consegue começar, encontrar materiais e guardar ao parar.",
        "Ajuste os grupos e reveja os papéis pendentes conforme sua rotina."
      ]
    },
    {
      "id": "varanda",
      "room": "externas",
      "title": "Uma varanda para aproveitar",
      "description": "Transforme um pequeno espaço externo em um lugar para estar.",
      "tags": "varanda · plantas · circulação",
      "cycle": [
        "Observe a luz, a chuva, os objetos e os caminhos de circulação da varanda.",
        "Escolha um pequeno espaço e como gostaria de aproveitá-lo, considerando quem vive na casa.",
        "Experimente a disposição com o que já tem, mantendo acessos, ralos e proteções livres. Não apoie objetos em locais com risco de queda.",
        "Use a varanda em horários diferentes e perceba o conforto e a facilidade de cuidar.",
        "Ajuste os objetos e as plantas às condições do lugar e à disponibilidade para cuidar."
      ]
    }
  ]
};
(() => {
  const {rooms,projects}=window.HOUSE_PROJECTS;
  const labels=['Observar','Escolher','Testar','Viver','Ajustar'];
  const key='roarchela-projects-v1';
  const escape=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  let saved={},available=true;
  try { const value=JSON.parse(localStorage.getItem(key)||'{}'); if(value&&typeof value==='object'&&!Array.isArray(value))saved=value; } catch {available=false;}
  const entry=id=>{const value=saved[id];return value&&typeof value==='object'?value:{}};
  function card(p){return `<article class="card project-card"><span class="eyebrow">${escape(rooms.find(r=>r.id===p.room).title)}</span><h2><a href="#projeto/${p.id}">${escape(p.title)}</a></h2><p>${escape(p.description)}</p><small>${escape(p.tags)}</small><a class="button textbtn" href="#projeto/${p.id}">${saved[p.id]?'Retomar projeto':'Explorar a ideia'} →</a></article>`;}
  function principles(){return `<section class="project-principles section-space" aria-label="Princípios de Rosely Archela"><div><h2>Nada quebrado, nada faltando, nada fora do lugar</h2><p>Um olhar para perceber o que pede cuidado, o que é necessário e onde cada coisa faz sentido.</p></div><div><h2>O estoque está na loja</h2><p>Experimente com o que já existe. Observe a necessidade e o consumo antes de comprar ou repor.</p></div></section>`;}
  function library(){const ongoing=projects.filter(p=>saved[p.id]);return `<section class="hero"><div><span class="eyebrow">Métodos de Rosely Archela · Organização da casa</span><h1>Ideias para a casa.<br>Projetos para viver.</h1><p>Um closet mais fácil de usar, uma estante com a sua história, um cantinho que convida a ficar. Escolha um ambiente e descubra o que pode transformar aos poucos.</p><a class="button primary" href="#ambientes-lista">Explorar os ambientes ↓</a></div><img class="hero-img" src="assets/sala.png" alt="Sala com estante, plantas e um cantinho para estar"></section><section class="card sage"><h2>A casa muda com a vida.</h2><p>A organização é um processo de melhoria contínua, não uma tarefa que termina definitivamente. Um projeto pode atravessar dias ou semanas: você experimenta, usa o espaço e volta para ajustar.</p><p class="project-cycle">Observar → Escolher → Testar → Viver → Ajustar → Observar…</p></section>${principles()}${ongoing.length?`<section class="section-space"><h2>Seus projetos para retomar</h2><div class="project-grid">${ongoing.map(card).join('')}</div></section>`:''}<section id="ambientes-lista" class="section-space"><span class="eyebrow">Pela casa</span><h2 class="section-space">Por onde você quer começar?</h2><p>Os dias são referências do rodízio da casa. Os projetos ficam disponíveis para começar e retomar quando fizer sentido.</p><div class="project-grid">${rooms.map(r=>`<a class="card environment-card" href="#ambiente/${r.id}">${typeof roomIcon==='function'?roomIcon(r.icon):''}<span class="eyebrow">${r.day}</span><h3>${r.title}</h3><p>${r.description}</p><span class="textbtn">Ver projetos →</span></a>`).join('')}</div></section><p class="hint section-space">Suas anotações ficam somente neste navegador. Ainda não há sincronização com o aplicativo Agenda de Casa.</p>`;}
  function environment(id){const r=rooms.find(r=>r.id===id);if(!r)return missing();return `<a class="button textbtn" href="#ambientes">← Todos os ambientes</a><div class="intro section-space"><span class="eyebrow">${r.day} · Uma referência para cuidar</span><h1>${r.title}</h1><p>${r.description} Explore uma ideia, escolha um projeto e desenvolva-o no seu ritmo.</p></div><div class="project-grid">${projects.filter(p=>p.room===id).map(card).join('')}</div><div class="tip">Cada projeto pode ser feito por partes. Ao parar, deixe o espaço utilizável e anote de onde quer continuar.</div>`;}
  function detail(id){const p=projects.find(p=>p.id===id);if(!p)return missing();const r=rooms.find(r=>r.id===p.room),s=entry(id);return `<div class="narrow"><a class="button textbtn" href="#ambiente/${r.id}">← ${r.title}</a><div class="intro section-space"><span class="eyebrow">Um projeto para desenvolver aos poucos</span><h1>${p.title}</h1><p>${p.description}</p><small>${p.tags}</small></div><section class="card sage"><h2>Experimente. Viva. Volte a olhar.</h2><p>Não é preciso fazer tudo de uma vez. Este ciclo pode se repetir sempre que o espaço ou suas necessidades mudarem.</p><p class="project-cycle">Observar → Escolher → Testar → Viver → Ajustar ↺</p></section><section class="cycle section-space" aria-label="Ideias para desenvolver o projeto">${p.cycle.map((text,i)=>`<article><span class="num" aria-hidden="true">↻</span><div><h2>${labels[i]}</h2><p>${escape(text)}</p></div></article>`).join('')}</section>${principles()}<section class="card section-space"><h2>Seu projeto, do seu jeito</h2><p>Guarde o que quer experimentar ou o que percebeu ao usar o espaço. Você pode voltar e mudar de ideia.</p><form id="project-notes" data-project="${p.id}"><label for="project-stage">Onde você quer retomar?</label><select id="project-stage" name="stage">${labels.map(l=>`<option${s.stage===l?' selected':''}>${l}</option>`).join('')}</select><label for="project-note">Ideias, mudanças percebidas e próximos ajustes</label><textarea id="project-note" name="note" maxlength="6000" placeholder="O que ficou mais fácil? O que ainda pede um ajuste?">${escape(s.note)}</textarea><button class="primary full" type="submit">Guardar para retomar</button></form><p class="hint">Salvo somente neste navegador. Limpar os dados do site apaga as anotações. Não há sincronização com o app.</p><p id="project-status" role="status">${!available?'Não foi possível acessar as anotações salvas neste navegador.':saved[id]?'Você já guardou este projeto. Suas anotações estão acima.':''}</p></section></div>`;}
  function missing(){return '<div class="narrow"><h1>Vamos olhar outro cantinho?</h1><p>Este projeto ou ambiente não foi encontrado.</p><a class="button primary" href="#ambientes">Explorar ambientes</a></div>';}
  window.ProjectLibrary={render(route){return route==='ambientes'||route==='ambientes-lista'?library():route.startsWith('ambiente/')?environment(route.slice(9)):detail(route.slice(8));}};
  document.addEventListener('submit',e=>{if(e.target.id!=='project-notes')return;e.preventDefault();const form=e.target,data=new FormData(form),id=form.dataset.project;if(!projects.some(p=>p.id===id))return;const next={...saved,[id]:{stage:String(data.get('stage')),note:String(data.get('note')),updatedAt:new Date().toISOString()}};const status=document.querySelector('#project-status');try{localStorage.setItem(key,JSON.stringify(next));saved=next;available=true;status.textContent='Projeto guardado. Retome quando fizer sentido para você.';}catch{status.textContent='Não foi possível guardar. Mantenha esta página aberta e copie suas anotações antes de sair.';}});
})();
