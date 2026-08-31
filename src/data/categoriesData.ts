// Base de Conhecimento de Preços de Mercado e Referenciais de Mercado Público (Banco de Preços & PNCP)
export interface PrecoBenchmark {
  palavrasChave: string[];
  precoMedioMercado: number;
  unidade: string;
  marcaSugerida: string;
  categoria: string;
}

export const BENCHMARKS_MERCADO: PrecoBenchmark[] = [
  // ==========================================
  // MATERIAL DE ESCRITÓRIO, PAPELARIA & COPA
  // ==========================================
  {
    categoria: 'Bobina Térmica',
    palavrasChave: ['bobina termica', 'bobina para relogio de ponto', 'bobina relogio ponto', 'bobina 57x300', 'bobina 80x40', 'bobina cupom fiscal', 'bobina fiscal', 'bobina amarela', 'bobina para cupom', 'bobina ponto', 'bobina termossensivel'],
    precoMedioMercado: 8.90,
    unidade: 'UNIDADE',
    marcaSugerida: 'Silfer / Regispel / Maxprint / Fibria',
  },
  {
    categoria: 'Clipes',
    palavrasChave: ['clipes', 'clipe', 'clipes galvanizados', 'arame galvanizado', 'clipes n 2', 'clipes n 3', 'clipes n 4', 'clipes n 6', 'clipes n 8', '312x1', '140x1', '110x1', 'clipes n 3/0', 'clipes metalicos', 'prendedor de papel'],
    precoMedioMercado: 5.40,
    unidade: 'CAIXA',
    marcaSugerida: 'Acco / Cis / Bacchi / Jocar Office',
  },
  {
    categoria: 'Estilete & Lâminas',
    palavrasChave: ['estilete', 'estilete largo', 'estilete estreito', 'estilete profissional', 'lamina para estilete', 'lamina retratil', 'estilete 18mm', 'estilete 9mm', 'estilete com trava'],
    precoMedioMercado: 7.90,
    unidade: 'UNIDADE',
    marcaSugerida: 'Cis / Tramontina / Western / BRW',
  },
  {
    categoria: 'Papel Sulfite A4',
    palavrasChave: ['papel sulfite a4', 'papel a4', 'resma a4', 'papel sulfite', 'folha a4', 'papel 75g', 'chamex', 'suzano report', 'copimax', 'report'],
    precoMedioMercado: 26.50,
    unidade: 'RESMA',
    marcaSugerida: 'Chamex / Suzano Report / Copimax',
  },
  {
    categoria: 'Caneta Esferográfica',
    palavrasChave: ['caneta esferografica', 'caneta bic', 'caneta ponta media', 'caneta escrita macia', 'caneta 1.0mm', 'caneta 0.7mm', 'caneta azul', 'caneta preta', 'trilux', 'compactor'],
    precoMedioMercado: 1.25,
    unidade: 'UNIDADE',
    marcaSugerida: 'BIC Cristal / Faber-Castell / Compactor',
  },
  {
    categoria: 'Lápis Grafite',
    palavrasChave: ['lapis grafite', 'lapis preto', 'lapis hb', 'lapis n 2', 'lapis de escrever'],
    precoMedioMercado: 0.95,
    unidade: 'UNIDADE',
    marcaSugerida: 'Faber-Castell / Tris / BIC Evolution',
  },
  {
    categoria: 'Borracha Escolar',
    palavrasChave: ['borracha escolar', 'borracha branca', 'borracha n 40', 'borracha n 20', 'borracha ponteira', 'borracha sem latex'],
    precoMedioMercado: 1.50,
    unidade: 'UNIDADE',
    marcaSugerida: 'Mercur / Faber-Castell / Tris',
  },
  {
    categoria: 'Grampeador',
    palavrasChave: ['grampeador de mesa', 'grampeador 26/6', 'grampeador alicate', 'grampeador metalico', 'grampeador 24/6', 'grampeador para 25 folhas', 'grampeador medio'],
    precoMedioMercado: 24.90,
    unidade: 'UNIDADE',
    marcaSugerida: 'Genmes / Cis / Menno / Bacchi',
  },
  {
    categoria: 'Grampos para Grampeador',
    palavrasChave: ['grampo para grampeador', 'grampos 26/6', 'grampos 24/6', 'grampo cobreado', 'grampo galvanizado', 'caixa de grampos'],
    precoMedioMercado: 4.80,
    unidade: 'CAIXA',
    marcaSugerida: 'Acco / Cis / Bacchi',
  },
  {
    categoria: 'Pasta Arquivo / AZ',
    palavrasChave: ['pasta registradora az', 'pasta az', 'pasta lombo largo', 'pasta com compressor', 'registrador az', 'pasta arquivo'],
    precoMedioMercado: 16.50,
    unidade: 'UNIDADE',
    marcaSugerida: 'Dello / Polibras / ACP',
  },
  {
    categoria: 'Fita Adesiva / Crepe',
    palavrasChave: ['fita adesiva transparente', 'fita crepe', 'durex', 'fita larga empacotamento', 'fita gomada', 'fita dupla face', 'fita 45mm'],
    precoMedioMercado: 5.50,
    unidade: 'ROLO',
    marcaSugerida: '3M / Adere / Eurocel',
  },
  {
    categoria: 'Tesoura',
    palavrasChave: ['tesoura escolar', 'tesoura de escritorio', 'tesoura ponta redonda', 'tesoura inox', 'tesoura grande', 'tesoura 21cm'],
    precoMedioMercado: 8.50,
    unidade: 'UNIDADE',
    marcaSugerida: 'Mundial / Tramontina / Cis',
  },
  {
    categoria: 'Perfurador de Papel',
    palavrasChave: ['perfurador de papel', 'furador de papel', 'perfurador 2 furos', 'perfurador metalico'],
    precoMedioMercado: 28.00,
    unidade: 'UNIDADE',
    marcaSugerida: 'Cis / Menno / Genmes',
  },
  {
    categoria: 'Envelope',
    palavrasChave: ['envelope saco', 'envelope kraft', 'envelope pardo', 'envelope oficio', 'envelope a4', 'envelope 240x340'],
    precoMedioMercado: 0.45,
    unidade: 'UNIDADE',
    marcaSugerida: 'Scrity / Foroni / Romitec',
  },
  {
    categoria: 'Bloco de Notas / Post-it',
    palavrasChave: ['bloco autoadesivo', 'post it', 'bloco recado', 'adesivo reposicionavel', 'bloco 76x76'],
    precoMedioMercado: 6.20,
    unidade: 'BLOCO',
    marcaSugerida: '3M Post-it / Adelbras / Cis Stick',
  },

  // ==========================================
  // TECNOLOGIA DA INFORMAÇÃO & ELETRÔNICOS
  // ==========================================
  {
    categoria: 'Notebook / Computador Portátil',
    palavrasChave: ['notebook', 'computador portatil', 'laptop corporativo', 'notebook core i5', 'notebook core i7', 'notebook ryzen', 'macbook'],
    precoMedioMercado: 4650.00,
    unidade: 'UNIDADE',
    marcaSugerida: 'Dell Latitude / Lenovo ThinkPad / HP ProBook',
  },
  {
    categoria: 'Desktop / Computador de Mesa',
    palavrasChave: ['computador desktop', 'computador de mesa', 'microcomputador', 'cpu corporativa', 'gabinete desktop'],
    precoMedioMercado: 3850.00,
    unidade: 'UNIDADE',
    marcaSugerida: 'Dell OptiPlex / Lenovo ThinkCentre / HP EliteDesk',
  },
  {
    categoria: 'Monitor',
    palavrasChave: ['monitor led', 'monitor ips', 'monitor 24', 'monitor 27', 'monitor full hd', 'monitor hdmi displayport'],
    precoMedioMercado: 780.00,
    unidade: 'UNIDADE',
    marcaSugerida: 'LG / Samsung / Dell / Philips',
  },
  {
    categoria: 'Kit Teclado e Mouse',
    palavrasChave: ['teclado e mouse', 'teclado usb abnt2', 'mouse optico', 'kit perifericos', 'teclado corporativo'],
    precoMedioMercado: 75.00,
    unidade: 'KIT',
    marcaSugerida: 'Logitech / Dell / Microsoft / HP',
  },
  {
    categoria: 'Nobreak / Estabilizador',
    palavrasChave: ['nobreak', 'ups nobreak', 'nobreak 1200va', 'nobreak 600va', 'nobreak senoidal', 'estabilizador de tensao'],
    precoMedioMercado: 580.00,
    unidade: 'UNIDADE',
    marcaSugerida: 'SMS / Ragtech / Intelbras / TS Shara',
  },
  {
    categoria: 'Impressora / Multifuncional',
    palavrasChave: ['impressora multifuncional', 'multifuncional laser', 'impressora laser monocromatica', 'multifuncional duplex wi fi'],
    precoMedioMercado: 2150.00,
    unidade: 'UNIDADE',
    marcaSugerida: 'Brother / HP LaserJet / Kyocera / Epson',
  },
  {
    categoria: 'Cartucho de Toner',
    palavrasChave: ['cartucho de toner', 'toner laser', 'toner preto', 'toner original', 'toner compativel', 'refil de toner'],
    precoMedioMercado: 145.00,
    unidade: 'UNIDADE',
    marcaSugerida: 'HP Original / Brother / Katun',
  },
  {
    categoria: 'Switch / Rede',
    palavrasChave: ['switch gerenciável', 'switch 24 portas', 'switch gigabit', 'roteador wi fi corporativo', 'patch panel rj45'],
    precoMedioMercado: 890.00,
    unidade: 'UNIDADE',
    marcaSugerida: 'Cisco / TP-Link / Intelbras / Mikrotik',
  },

  // ==========================================
  // MOBILIÁRIO CORPORATIVO & ESCOLAR
  // ==========================================
  {
    categoria: 'Cadeira Giratória',
    palavrasChave: ['cadeira giratoria', 'cadeira de escritorio giratoria', 'cadeira ergonomica nr17', 'cadeira operativa', 'poltrona presidente giratoria', 'cadeira diretor'],
    precoMedioMercado: 640.00,
    unidade: 'UNIDADE',
    marcaSugerida: 'Flexform / Cavaletti / Plaxmetal / Frisokar',
  },
  {
    categoria: 'Mesa de Escritório',
    palavrasChave: ['mesa de escritorio', 'estacao de trabalho', 'mesa plataforma', 'mesa mdp 25mm', 'mesa gaveteiro'],
    precoMedioMercado: 580.00,
    unidade: 'UNIDADE',
    marcaSugerida: 'Pandin / Gebb Work / Marzo Vitorino',
  },
  {
    categoria: 'Armário de Aço',
    palavrasChave: ['armario de aco', 'armario alto de aco', 'armario 2 portas aco', 'gaveteiro de aco', 'roupeiro de aco', 'arquivo de aco'],
    precoMedioMercado: 690.00,
    unidade: 'UNIDADE',
    marcaSugerida: 'W3 / Nilko / Pandin / Nilko Steel',
  },
  {
    categoria: 'Longarina',
    palavrasChave: ['longarina 3 lugares', 'longarina recepcao', 'longarina espera', 'longarina estofada', 'longarina plastica'],
    precoMedioMercado: 520.00,
    unidade: 'UNIDADE',
    marcaSugerida: 'Frisokar / Plaxmetal / Cavaletti',
  },

  // ==========================================
  // COMBUSTÍVEIS & LUBRIFICANTES
  // ==========================================
  {
    categoria: 'Gasolina Comum',
    palavrasChave: ['gasolina comum', 'gasolina tipo c', 'gasolina automotiva', 'combustivel gasolina'],
    precoMedioMercado: 5.95,
    unidade: 'LITRO',
    marcaSugerida: 'Petrobras Grid / Ipiranga / Shell',
  },
  {
    categoria: 'Etanol Hidratado',
    palavrasChave: ['etanol hidratado', 'etanol comum', 'alcool combustivel', 'alcool etilico hidratado carburante'],
    precoMedioMercado: 4.10,
    unidade: 'LITRO',
    marcaSugerida: 'Vibra / Ipiranga / Raízen',
  },
  {
    categoria: 'Óleo Diesel S10',
    palavrasChave: ['oleo diesel s10', 'diesel s 10', 'diesel automotivo', 'diesel s500'],
    precoMedioMercado: 6.25,
    unidade: 'LITRO',
    marcaSugerida: 'Petrobras / Ipiranga / Shell',
  },
  {
    categoria: 'Óleo Lubrificante',
    palavrasChave: ['oleo lubrificante motor', 'oleo 5w30', 'oleo 15w40', 'lubrificante sintetico', 'oleo hidraulico'],
    precoMedioMercado: 38.50,
    unidade: 'LITRO',
    marcaSugerida: 'Lubrax / Mobil / Castrol / Shell Helix',
  },

  // ==========================================
  // LIMPEZA, HIGIENE & SANEAMENTO
  // ==========================================
  {
    categoria: 'Detergente Líquido',
    palavrasChave: ['detergente liquido', 'detergente neutro 500ml', 'detergente lava loucas', 'detergente biodegradavel'],
    precoMedioMercado: 2.80,
    unidade: 'FRASCO',
    marcaSugerida: 'Ypê / Limpol / Minuano',
  },
  {
    categoria: 'Sabão em Pó / Lava Roupas',
    palavrasChave: ['sabao em po', 'detergente em po', 'sabao lava roupas', 'lava roupas em po', 'sabao em barra'],
    precoMedioMercado: 12.90,
    unidade: 'PACOTE',
    marcaSugerida: 'Omo / Ypê / Tixan / Brilhante',
  },
  {
    categoria: 'Desinfetante',
    palavrasChave: ['desinfetante bactericida', 'desinfetante pinho', 'desinfetante perfumado 1l', 'desinfetante multiuso'],
    precoMedioMercado: 7.90,
    unidade: 'FRASCO',
    marcaSugerida: 'Pinho Sol / Veja / Lysoform',
  },
  {
    categoria: 'Água Sanitária',
    palavrasChave: ['agua sanitaria', 'alvejante com cloro', 'cloro ativo 2%', 'hipoclorito de sodio'],
    precoMedioMercado: 4.80,
    unidade: 'FRASCO',
    marcaSugerida: 'Super Candida / Qboa / Dragão / Brilux',
  },
  {
    categoria: 'Papel Higiênico',
    palavrasChave: ['papel higienico folha dupla', 'papel higienico 30m', 'papel higienico fardo 12 rolos', 'papel higienico rolão'],
    precoMedioMercado: 18.50,
    unidade: 'PACOTE',
    marcaSugerida: 'Neve / Personal / Paloma / Santher',
  },
  {
    categoria: 'Papel Toalha Interfolhado',
    palavrasChave: ['papel toalha interfolhado', 'papel toalha 2 dobras', 'papel interfolha 1000 folhas', 'toalha de papel'],
    precoMedioMercado: 16.90,
    unidade: 'PACOTE',
    marcaSugerida: 'Santher / Melitta / Melhoramentos / Scala',
  },
  {
    categoria: 'Saco de Lixo',
    palavrasChave: ['saco para lixo 100l', 'saco de lixo 50l', 'saco plastico reforçado para lixo', 'saco de lixo abnt'],
    precoMedioMercado: 22.00,
    unidade: 'PACOTE',
    marcaSugerida: 'Embalixo / Plasvale / Extrusa',
  },
  {
    categoria: 'Vassoura e Rodo',
    palavrasChave: ['vassoura piacava', 'vassoura de pelo', 'rodo de borracha 40cm', 'rodo com cabo de madeira'],
    precoMedioMercado: 14.50,
    unidade: 'UNIDADE',
    marcaSugerida: 'Bettanin / Santa Maria / Condor',
  },

  // ==========================================
  // ALIMENTAÇÃO, COPA & COZINHA
  // ==========================================
  {
    categoria: 'Café Torrado e Moído',
    palavrasChave: ['cafe torrado e moido', 'cafe a vacuo 500g', 'cafe em po 500g', 'cafe selo abic'],
    precoMedioMercado: 18.90,
    unidade: 'PACOTE',
    marcaSugerida: 'Pilão / 3 Corações / Melitta / Café Pelé',
  },
  {
    categoria: 'Açúcar Cristal / Refinado',
    palavrasChave: ['acucar cristal 1kg', 'acucar refinado 1kg', 'acucar pacote 1kg', 'acucar especial'],
    precoMedioMercado: 4.60,
    unidade: 'QUILOGRAMA',
    marcaSugerida: 'União / Da Barra / Caravelas / Colombo',
  },
  {
    categoria: 'Leite Integral UHT',
    palavrasChave: ['leite integral uht', 'leite longa vida 1l', 'leite de caixinha', 'leite integral tetra pak'],
    precoMedioMercado: 5.20,
    unidade: 'LITRO',
    marcaSugerida: 'Itambé / Piracanjuba / Italac / Parmalat',
  },
  {
    categoria: 'Água Mineral',
    palavrasChave: ['agua mineral galao 20l', 'agua mineral 500ml', 'agua mineral sem gas', 'garrafao de agua 20 litros'],
    precoMedioMercado: 14.00,
    unidade: 'GALAO',
    marcaSugerida: 'Minalba / Crystal / Indaiá / Lindoya',
  },
  {
    categoria: 'Copo Descartável',
    palavrasChave: ['copo descartavel 200ml', 'copo plastico descartavel 200ml', 'copo para agua descartavel', 'copo descartavel 50ml cafe'],
    precoMedioMercado: 4.90,
    unidade: 'CENTO',
    marcaSugerida: 'Copobras / Altacoppo / Strawplast',
  },
];

// Lista de Stop Words comuns em editais que não devem ser usadas isoladamente como identificadores
const STOP_WORDS = new Set([
  'para', 'com', 'sem', 'de', 'do', 'da', 'dos', 'das', 'em', 'no', 'na', 'nos', 'nas', 'por', 'pelo', 'pela',
  'tipo', 'material', 'caracteristicas', 'adicionais', 'numero', 'nº', 'comprimento', 'mm', 'cm', 'm', 'un',
  'unidade', 'cx', 'caixa', 'pct', 'pacote', 'marca', 'ref', 'modelo', 'item', 'lote', 'conforme', 'edital',
  'padrao', 'dimensoes', 'cor', 'uso', 'geral', 'sobre', 'sob', 'entre', 'ate', 'ao', 'aos', 'especificacao',
  'composicao', 'pressao', 'encaixe', 'retatil', 'retratil', 'aço', 'aco', 'plastico', 'plastica', 'metalico',
  'metalica', 'fixacao', 'trava', 'lamina', 'largo', 'estreito', 'alta', 'baixo', 'alta'
]);

/**
 * Normaliza strings para comparação textual segura (sem acentos e em minúsculas)
 */
export function normalizarTexto(texto: string): string {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Encontra o preço de mercado benchmark mais aderente para o termo informado
 * Utiliza casamento por tokens e frases inteiras, evitando correspondências falsas por substring.
 */
export function estimarPrecoMercadoPorTermo(descricao: string): PrecoBenchmark {
  const norm = normalizarTexto(descricao);
  const palavrasEntrada = norm
    .split(' ')
    .filter(p => p.length >= 3 && !STOP_WORDS.has(p));

  let bestMatch: PrecoBenchmark | null = null;
  let maxScore = 0;

  for (const b of BENCHMARKS_MERCADO) {
    let score = 0;

    for (const kw of b.palavrasChave) {
      const kwNorm = normalizarTexto(kw);
      
      // 1. Casamento exato da expressão composta (ex: "bobina termica", "relogio de ponto", "sabao em po", "arame galvanizado")
      if (norm.includes(kwNorm)) {
        score += kwNorm.includes(' ') ? 18 : 10;
        continue;
      }

      // 2. Casamento de palavras individuais completas
      const kwTokens = kwNorm.split(' ').filter(t => t.length >= 3 && !STOP_WORDS.has(t));
      if (kwTokens.length > 0) {
        const tokensCorrespondentes = kwTokens.filter(kt => palavrasEntrada.includes(kt));
        if (tokensCorrespondentes.length === kwTokens.length) {
          score += kwTokens.length * 8;
        } else if (tokensCorrespondentes.length > 0 && kwTokens.length > 1) {
          score += tokensCorrespondentes.length * 3;
        }
      }
    }

    if (score > maxScore) {
      maxScore = score;
      bestMatch = b;
    }
  }

  // Apenas aceita se o score for robusto e representativo
  if (bestMatch && maxScore >= 10) {
    return bestMatch;
  }

  // Estimativa base inteligente e moderada caso não haja correspondência específica
  // Não impõe descrição similar nem marcas inadequadas de outra categoria
  return {
    categoria: 'Geral',
    palavrasChave: [],
    precoMedioMercado: 19.50,
    unidade: 'UNIDADE',
    marcaSugerida: 'Marca Homologada / Conforme Edital',
  };
}
