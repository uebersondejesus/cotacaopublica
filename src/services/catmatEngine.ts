// Motor de busca e validação de CATMAT (Catálogo de Materiais)
// Fornece um de-para entre a descrição do item e o código oficial do Compras.gov.br (antigo ComprasNet).

export interface ItemCatmat {
  codigo: string;
  descricao: string;
  grupo: string;
  classe: string;
}

// Catálogo base com os itens mais comuns para busca rápida e offline
export const CATMAT_DATABASE: ItemCatmat[] = [
  // MATERIAL DE ESCRITÓRIO, PAPELARIA & COPA
  { codigo: '447214', descricao: 'PAPEL A4, 75G/M2, BRANCO, ALCALINO', grupo: '75', classe: '7530' },
  { codigo: '318920', descricao: 'GRAMPEADOR DE MESA, CAPACIDADE 20 FOLHAS', grupo: '75', classe: '7520' },
  { codigo: '312890', descricao: 'CANETA ESFEROGRÁFICA, TINTA AZUL, CORPO PLÁSTICO', grupo: '75', classe: '7520' },
  { codigo: '25455', descricao: 'CLIPE DE PAPEL, AÇO GALVANIZADO, TAMANHO 2/0', grupo: '75', classe: '7520' },
  { codigo: '25457', descricao: 'CLIPE DE PAPEL, AÇO GALVANIZADO, TAMANHO 3/0', grupo: '75', classe: '7520' },
  { codigo: '272304', descricao: 'ESTILETE, CORPO PLÁSTICO, LÂMINA 18 MM', grupo: '75', classe: '7520' },
  { codigo: '150495', descricao: 'BOBINA PAPEL TÉRMICO, 57 MM X 300 M', grupo: '75', classe: '7530' },
  { codigo: '426038', descricao: 'LÁPIS PRETO, N° 2, SEXTAVADO, COM BORRACHA', grupo: '75', classe: '7520' },
  { codigo: '439975', descricao: 'BORRACHA APAGADORA, MACIA, BRANCA', grupo: '75', classe: '7520' },
  { codigo: '247781', descricao: 'GRAMPO PARA GRAMPEADOR, AÇO GALVANIZADO, 26/6', grupo: '75', classe: '7520' },
  { codigo: '463836', descricao: 'PASTA ARQUIVO, TIPO A-Z, LOMBO LARGO', grupo: '75', classe: '7520' },
  { codigo: '408101', descricao: 'FITA ADESIVA, POLIPROPILENO, TRANSPARENTE, 45 MM X 50 M', grupo: '75', classe: '7520' },
  { codigo: '395632', descricao: 'TESOURA, AÇO INOXIDÁVEL, CABO PLÁSTICO, 21 CM', grupo: '75', classe: '7520' },
  { codigo: '394605', descricao: 'PERFURADOR DE PAPEL, 2 FUROS, CAPACIDADE 20 FOLHAS', grupo: '75', classe: '7520' },
  { codigo: '419409', descricao: 'ENVELOPE, SACO, PAPEL KRAFT, 240 X 340 MM', grupo: '75', classe: '7530' },
  { codigo: '407334', descricao: 'BLOCO RECADO, AUTOADESIVO, AMARELO, 76 X 76 MM', grupo: '75', classe: '7530' },
  
  // TECNOLOGIA DA INFORMAÇÃO & ELETRÔNICOS
  { codigo: '465805', descricao: 'MICROCOMPUTADOR PORTÁTIL (NOTEBOOK)', grupo: '70', classe: '7010' },
  { codigo: '465806', descricao: 'MICROCOMPUTADOR DE MESA (DESKTOP)', grupo: '70', classe: '7010' },
  { codigo: '450912', descricao: 'MONITOR DE VÍDEO, LED, 23.8 POLEGADAS', grupo: '70', classe: '7025' },
  { codigo: '272676', descricao: 'TECLADO E MOUSE, CONJUNTO USB, PADRÃO ABNT2', grupo: '70', classe: '7025' },
  { codigo: '400326', descricao: 'NOBREAK, INTERATIVO, 1200 VA', grupo: '61', classe: '6130' },
  { codigo: '453531', descricao: 'IMPRESSORA MULTIFUNCIONAL, LASER MONOCROMÁTICA', grupo: '70', classe: '7025' },
  { codigo: '422501', descricao: 'CARTUCHO TONER, PRETO, RENDIMENTO 2500 PÁGINAS', grupo: '70', classe: '7045' },
  { codigo: '388741', descricao: 'SWITCH DE REDE, 24 PORTAS, GIGABIT ETHERNET', grupo: '70', classe: '7025' },
  
  // MOBILIÁRIO CORPORATIVO & ESCOLAR
  { codigo: '298836', descricao: 'CADEIRA GIRATÓRIA, COM BRAÇOS, TIPO DIRETOR', grupo: '71', classe: '7110' },
  { codigo: '231900', descricao: 'MESA DE ESCRITÓRIO, MDF, 120 X 60 CM', grupo: '71', classe: '7110' },
  { codigo: '375217', descricao: 'ARMÁRIO DE AÇO, 2 PORTAS, COM CHAVE', grupo: '71', classe: '7125' },
  { codigo: '445213', descricao: 'LONGARINA, 3 LUGARES, ASSENTO E ENCOSTO PLÁSTICO', grupo: '71', classe: '7110' },

  // COMBUSTÍVEIS & LUBRIFICANTES
  { codigo: '129213', descricao: 'GASOLINA COMUM', grupo: '91', classe: '9130' },
  { codigo: '270919', descricao: 'ÁLCOOL ETÍLICO (ETANOL) HIDRATADO CARBURANTE', grupo: '91', classe: '9130' },
  { codigo: '417081', descricao: 'ÓLEO DIESEL, S10', grupo: '91', classe: '9140' },
  { codigo: '108851', descricao: 'ÓLEO LUBRIFICANTE, MOTOR, SINTÉTICO, 5W30', grupo: '91', classe: '9150' },

  // LIMPEZA, HIGIENE & SANEAMENTO
  { codigo: '393006', descricao: 'DETERGENTE LÍQUIDO, NEUTRO, 500 ML', grupo: '79', classe: '7930' },
  { codigo: '426039', descricao: 'SABÃO EM PÓ, LAVA ROUPAS, 1 KG', grupo: '79', classe: '7930' },
  { codigo: '427011', descricao: 'DESINFETANTE, LÍQUIDO, PINHO, 5 LITROS', grupo: '79', classe: '7930' },
  { codigo: '427142', descricao: 'ÁGUA SANITÁRIA, 2 a 2,5% DE CLORO ATIVO, 1 LITRO', grupo: '79', classe: '7930' },
  { codigo: '482910', descricao: 'PAPEL HIGIÊNICO, FOLHA DUPLA, 30 M, NEUTRO', grupo: '85', classe: '8540' },
  { codigo: '422315', descricao: 'PAPEL TOALHA, INTERFOLHADO, 2 DOBRAS', grupo: '85', classe: '8540' },
  { codigo: '423450', descricao: 'SACO PARA LIXO, CAPACIDADE 100 LITROS, PRETO', grupo: '81', classe: '8105' },
  { codigo: '371804', descricao: 'VASSOURA, PELO SINTÉTICO, CABO DE MADEIRA', grupo: '79', classe: '7920' },
  { codigo: '388206', descricao: 'RODO, PLÁSTICO, BORRACHA DUPLA, 40 CM', grupo: '79', classe: '7920' },

  // ALIMENTAÇÃO, COPA & COZINHA
  { codigo: '448105', descricao: 'CAFÉ, TORRADO E MOÍDO, A VÁCUO, 500G', grupo: '89', classe: '8955' },
  { codigo: '372504', descricao: 'AÇÚCAR, CRISTAL, 1 KG', grupo: '89', classe: '8925' },
  { codigo: '417382', descricao: 'LEITE, BOVINO, UHT, INTEGRAL, 1 LITRO', grupo: '89', classe: '8910' },
  { codigo: '372651', descricao: 'ÁGUA MINERAL, NATURAL, SEM GÁS, GALÃO 20 LITROS', grupo: '89', classe: '8960' },
  { codigo: '422115', descricao: 'COPO DESCARTÁVEL, PLÁSTICO, 200 ML', grupo: '73', classe: '7350' },
];

/**
 * Função responsável por normalizar um texto para facilitar a busca.
 */
function normalizarParaBusca(texto: string): string {
  return texto
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, "") // Remove acentos
    .replace(/[^\w\s]/g, " ") // Remove pontuação
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Busca assincronamente o CATMAT correspondente à descrição do item.
 * Em um cenário real, faria a chamada para a API Dados Abertos Comprasgov.
 * Aqui utilizamos um mock emulado de alta precisão.
 */
export async function buscarCatmatPorDescricao(descricao: string): Promise<ItemCatmat | null> {
  // 1. Simula delay de rede para a consulta à API governamental (comportamento assíncrono real)
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const termoNorm = normalizarParaBusca(descricao);
  const palavrasTermo = termoNorm.split(' ').filter(w => w.length > 2); // ignora de, para, etc.

  if (palavrasTermo.length === 0) return null;

  // 2. Tenta encontrar a melhor correspondência no catálogo mockado
  let melhorMatch: ItemCatmat | null = null;
  let maxScore = 0;

  for (const item of CATMAT_DATABASE) {
    const descNorm = normalizarParaBusca(item.descricao);
    const palavrasCatmat = descNorm.split(' ');
    
    // Calcula um score baseado na interseção de palavras exatas
    let score = 0;
    for (const p of palavrasTermo) {
      if (palavrasCatmat.includes(p)) {
        score += 2;
      } else if (descNorm.includes(p)) {
        score += 1;
      }
    }

    // Dá um bônus se a categoria inteira estiver contida
    if (descNorm.includes(termoNorm)) {
      score += 5;
    }
    
    if (score > maxScore) {
      maxScore = score;
      melhorMatch = item;
    }
  }

  // Se o score for muito baixo (nenhuma correspondência forte), retorna null
  if (maxScore >= 2 && melhorMatch) {
    return melhorMatch;
  }

  // 3. Fallback: Se não encontrou no mock, tenta inferir algo plausível ou retorna null.
  // Como as APIs podem não encontrar tudo, null é uma resposta válida.
  return null;
}
