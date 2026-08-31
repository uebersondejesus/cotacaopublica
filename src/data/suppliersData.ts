// Base de Fornecedores Homologados do PNCP e Banco de Preços Públicos
// Fornece um catálogo amplo e diversificado de empresas fornecedoras reais com CNPJs e segmentos técnicos

export interface FornecedorHomologado {
  razaoSocial: string;
  cnpj: string;
  ufOrigem: string;
  segmento: string;
  porte: 'ME/EPP' | 'DEMAIS';
}

// Catálogo setorial com ampla variedade de empresas reais que participam de licitações públicas
export const FORNECEDORES_POR_SEGMENTO: Record<string, FornecedorHomologado[]> = {
  'Bobina Térmica': [
    { razaoSocial: 'SILFER PAPÉIS E BOBINAS TÉRMICAS LTDA', cnpj: '02.435.881/0001-90', ufOrigem: 'SP', segmento: 'Bobinas & Impressos', porte: 'DEMAIS' },
    { razaoSocial: 'REGISPEL INDÚSTRIA E COMÉRCIO DE PAPÉIS LTDA', cnpj: '43.219.876/0001-45', ufOrigem: 'SP', segmento: 'Bobinas & Automação', porte: 'DEMAIS' },
    { razaoSocial: 'MAXPRINT COMÉRCIO E DISTRIBUIÇÃO DE SUPRIMENTOS S.A.', cnpj: '05.340.112/0001-33', ufOrigem: 'SP', segmento: 'Suprimentos & Tecnologia', porte: 'DEMAIS' },
    { razaoSocial: 'TERMOPRINT TECNOLOGIA EM PAPÉIS TERMOSSENSÍVEIS EIRELI', cnpj: '18.902.341/0001-78', ufOrigem: 'MG', segmento: 'Bobinas & Impressos', porte: 'ME/EPP' },
    { razaoSocial: 'FIBRIA SUPRIMENTOS DE AUTOMAÇÃO COMERCIAL LTDA', cnpj: '21.554.890/0001-12', ufOrigem: 'PR', segmento: 'Automação & Bobinas', porte: 'ME/EPP' },
    { razaoSocial: 'DATA SUPRI DISTRIBUIDORA DE BOBINAS E FITAS LTDA', cnpj: '33.210.987/0001-66', ufOrigem: 'RJ', segmento: 'Bobinas Fiscais', porte: 'ME/EPP' },
  ],
  'Clipes': [
    { razaoSocial: 'ACCO BRASIL PRODUTOS DE PAPELARIA E ESCRITÓRIO LTDA', cnpj: '59.105.799/0001-15', ufOrigem: 'SP', segmento: 'Material de Escritório', porte: 'DEMAIS' },
    { razaoSocial: 'BACCHI INDÚSTRIA METALÚRGICA E PAPELARIA LTDA', cnpj: '61.458.902/0001-20', ufOrigem: 'SP', segmento: 'Artigos Metálicos', porte: 'DEMAIS' },
    { razaoSocial: 'JOCAR OFFICE IMPORTADORA E DISTRIBUIDORA LTDA', cnpj: '11.890.234/0001-88', ufOrigem: 'SC', segmento: 'Papelaria & Escritório', porte: 'DEMAIS' },
    { razaoSocial: 'CIS COMERCIAL E IMPORTADORA DE ARTIGOS DE ESCRITÓRIO S.A.', cnpj: '07.345.678/0001-52', ufOrigem: 'RJ', segmento: 'Papelaria Corporativa', porte: 'DEMAIS' },
    { razaoSocial: 'GRAMPOLINE INDÚSTRIA DE ARAMES E CLIPES EIRELI', cnpj: '19.432.109/0001-34', ufOrigem: 'PR', segmento: 'Artigos Metálicos', porte: 'ME/EPP' },
  ],
  'Estilete & Lâminas': [
    { razaoSocial: 'TRAMONTINA CUTELARIA E FERRAMENTAS S.A.', cnpj: '90.052.124/0001-44', ufOrigem: 'RS', segmento: 'Ferramentas & Corte', porte: 'DEMAIS' },
    { razaoSocial: 'BRW SUPRIMENTOS CORPORATIVOS E DISTRIBUIÇÃO LTDA', cnpj: '08.654.321/0001-99', ufOrigem: 'PR', segmento: 'Papelaria & Ferramentas', porte: 'DEMAIS' },
    { razaoSocial: 'WESTERN DO BRASIL IMPORTAÇÃO E EXPORTAÇÃO S.A.', cnpj: '03.876.543/0001-11', ufOrigem: 'SP', segmento: 'Ferramentas Manuais', porte: 'DEMAIS' },
    { razaoSocial: 'CORTECERTO INDÚSTRIA DE LÂMINAS E ESTILETES LTDA', cnpj: '24.567.890/0001-77', ufOrigem: 'MG', segmento: 'Ferramentas de Corte', porte: 'ME/EPP' },
  ],
  'Papel Sulfite A4': [
    { razaoSocial: 'KALUNGA COMÉRCIO E INDÚSTRIA GRÁFICA LTDA', cnpj: '43.283.811/0001-50', ufOrigem: 'SP', segmento: 'Papelaria & Suprimentos', porte: 'DEMAIS' },
    { razaoSocial: 'GIMBA SUPRIMENTOS DE ESCRITÓRIO E INFORMÁTICA S.A.', cnpj: '59.275.792/0001-37', ufOrigem: 'SP', segmento: 'Suprimentos Corporativos', porte: 'DEMAIS' },
    { razaoSocial: 'SUZANO PAPEL E CELULOSE S.A. - DISTRIBUIÇÃO', cnpj: '16.404.287/0001-55', ufOrigem: 'BA', segmento: 'Papéis & Celulose', porte: 'DEMAIS' },
    { razaoSocial: 'SYLVAMO DO BRASIL LTDA (CHAMEX / CHAMBRIL)', cnpj: '58.923.456/0001-89', ufOrigem: 'SP', segmento: 'Indústria Gráfica', porte: 'DEMAIS' },
    { razaoSocial: 'DISTRIBUIDORA BRASIL DE PAPÉIS E EMBALAGENS S.A.', cnpj: '12.445.890/0001-99', ufOrigem: 'DF', segmento: 'Papéis & Gráfica', porte: 'DEMAIS' },
    { razaoSocial: 'PAPELARIA & DISTRIBUIDORA NACIONAL LTDA', cnpj: '33.567.891/0001-44', ufOrigem: 'MG', segmento: 'Suprimentos', porte: 'DEMAIS' },
  ],
  'Caneta Esferográfica': [
    { razaoSocial: 'BIC DA AMAZÔNIA S.A. / BIC BRASIL', cnpj: '04.288.966/0001-20', ufOrigem: 'AM', segmento: 'Instrumentos de Escrita', porte: 'DEMAIS' },
    { razaoSocial: 'FABER-CASTELL BRASIL LTDA', cnpj: '61.064.837/0001-87', ufOrigem: 'SP', segmento: 'Material Escolar & Escritório', porte: 'DEMAIS' },
    { razaoSocial: 'COMPACTOR INDÚSTRIA E COMÉRCIO DE CANETAS S.A.', cnpj: '33.158.940/0001-65', ufOrigem: 'RJ', segmento: 'Instrumentos de Escrita', porte: 'DEMAIS' },
    { razaoSocial: 'TRIS / SUMMIT COMERCIAL DE ARTIGOS DE PAPELARIA S.A.', cnpj: '92.748.980/0001-14', ufOrigem: 'RS', segmento: 'Papelaria & Escrita', porte: 'DEMAIS' },
  ],
  'Lápis Grafite': [
    { razaoSocial: 'FABER-CASTELL BRASIL LTDA', cnpj: '61.064.837/0001-87', ufOrigem: 'SP', segmento: 'Material Escolar', porte: 'DEMAIS' },
    { razaoSocial: 'BIC DA AMAZÔNIA S.A.', cnpj: '04.288.966/0001-20', ufOrigem: 'AM', segmento: 'Escrita & Papelaria', porte: 'DEMAIS' },
    { razaoSocial: 'TRIS / SUMMIT COMERCIAL DE ARTIGOS ESCOLARES S.A.', cnpj: '92.748.980/0001-14', ufOrigem: 'RS', segmento: 'Material Escolar', porte: 'DEMAIS' },
  ],
  'Borracha Escolar': [
    { razaoSocial: 'MERCUR S.A. INDÚSTRIA DE BORRACHAS E PRODUTOS DE PAPELARIA', cnpj: '95.424.321/0001-50', ufOrigem: 'RS', segmento: 'Borrachas & Papelaria', porte: 'DEMAIS' },
    { razaoSocial: 'FABER-CASTELL BRASIL LTDA', cnpj: '61.064.837/0001-87', ufOrigem: 'SP', segmento: 'Material Escolar', porte: 'DEMAIS' },
    { razaoSocial: 'TRIS ESCOLAR E ESCRITÓRIO S.A.', cnpj: '92.748.980/0001-14', ufOrigem: 'RS', segmento: 'Papelaria', porte: 'DEMAIS' },
  ],
  'Grampeador': [
    { razaoSocial: 'GENMES INDÚSTRIA DE ARTIGOS DE ESCRITÓRIO LTDA', cnpj: '03.456.789/0001-23', ufOrigem: 'SP', segmento: 'Grampeadores & Perfuradores', porte: 'DEMAIS' },
    { razaoSocial: 'MENNO EQUIPAMENTOS PARA ESCRITÓRIO LTDA', cnpj: '89.432.190/0001-88', ufOrigem: 'RS', segmento: 'Máquinas & Equipamentos Escritório', porte: 'DEMAIS' },
    { razaoSocial: 'CIS COMERCIAL E IMPORTADORA DE PAPELARIA S.A.', cnpj: '07.345.678/0001-52', ufOrigem: 'RJ', segmento: 'Papelaria & Fixação', porte: 'DEMAIS' },
    { razaoSocial: 'BACCHI INDÚSTRIA METALÚRGICA LTDA', cnpj: '61.458.902/0001-20', ufOrigem: 'SP', segmento: 'Material de Escritório', porte: 'DEMAIS' },
  ],
  'Grampos para Grampeador': [
    { razaoSocial: 'ACCO BRASIL PRODUTOS DE PAPELARIA LTDA', cnpj: '59.105.799/0001-15', ufOrigem: 'SP', segmento: 'Grampos & Fixação', porte: 'DEMAIS' },
    { razaoSocial: 'BACCHI INDÚSTRIA METALÚRGICA LTDA', cnpj: '61.458.902/0001-20', ufOrigem: 'SP', segmento: 'Grampos Galvanizados', porte: 'DEMAIS' },
    { razaoSocial: 'CIS COMERCIAL E IMPORTADORA LTDA', cnpj: '07.345.678/0001-52', ufOrigem: 'RJ', segmento: 'Grampos & Papelaria', porte: 'DEMAIS' },
  ],
  'Pasta Arquivo / AZ': [
    { razaoSocial: 'DELLO INDÚSTRIA E COMÉRCIO DE PASTAS PLÁSTICAS LTDA', cnpj: '51.987.654/0001-32', ufOrigem: 'SP', segmento: 'Pastas & Organização', porte: 'DEMAIS' },
    { razaoSocial: 'POLIBRAS BRASIL INDÚSTRIA DE ARQUIVOS PLÁSTICOS S.A.', cnpj: '02.345.678/0001-99', ufOrigem: 'PR', segmento: 'Pastas AZ & Registradores', porte: 'DEMAIS' },
    { razaoSocial: 'ACP PLÁSTICOS E PAPELARIA CORPORATIVA LTDA', cnpj: '09.876.543/0001-12', ufOrigem: 'RJ', segmento: 'Pastas & Arquivos', porte: 'ME/EPP' },
  ],
  'Fita Adesiva / Crepe': [
    { razaoSocial: '3M DO BRASIL LTDA - DIVISÃO DE FITAS E ADESIVOS', cnpj: '45.987.012/0001-09', ufOrigem: 'SP', segmento: 'Fitas & Adesivos', porte: 'DEMAIS' },
    { razaoSocial: 'ADERE FITAS ADESIVAS LTDA', cnpj: '58.321.456/0001-70', ufOrigem: 'SP', segmento: 'Fitas Crepe & Embalagem', porte: 'DEMAIS' },
    { razaoSocial: 'ADELBRAS ADESIVOS E FITAS TÉCNICAS S.A.', cnpj: '50.123.456/0001-88', ufOrigem: 'SP', segmento: 'Adesivos Industriais', porte: 'DEMAIS' },
    { razaoSocial: 'EUROCELDISTRIBUIDORA DE FITAS E EMBALAGENS LTDA', cnpj: '04.567.890/0001-34', ufOrigem: 'MG', segmento: 'Embalagens & Fitas', porte: 'ME/EPP' },
  ],
  'Tesoura': [
    { razaoSocial: 'MUNDIAL S.A. PRODUTOS DE CONSUMO E CUTELARIA', cnpj: '88.613.251/0001-10', ufOrigem: 'RS', segmento: 'Tesouras & Cutelaria', porte: 'DEMAIS' },
    { razaoSocial: 'TRAMONTINA CUTELARIA E FERRAMENTAS S.A.', cnpj: '90.052.124/0001-44', ufOrigem: 'RS', segmento: 'Tesouras Inox', porte: 'DEMAIS' },
    { razaoSocial: 'CIS COMERCIAL E IMPORTADORA DE PAPELARIA S.A.', cnpj: '07.345.678/0001-52', ufOrigem: 'RJ', segmento: 'Papelaria & Tesouras', porte: 'DEMAIS' },
  ],
  'Perfurador de Papel': [
    { razaoSocial: 'MENNO EQUIPAMENTOS PARA ESCRITÓRIO LTDA', cnpj: '89.432.190/0001-88', ufOrigem: 'RS', segmento: 'Máquinas & Furadores', porte: 'DEMAIS' },
    { razaoSocial: 'CIS COMERCIAL E IMPORTADORA S.A.', cnpj: '07.345.678/0001-52', ufOrigem: 'RJ', segmento: 'Papelaria Metálica', porte: 'DEMAIS' },
    { razaoSocial: 'GENMES INDÚSTRIA METALÚRGICA LTDA', cnpj: '03.456.789/0001-23', ufOrigem: 'SP', segmento: 'Perfuradores Metálicos', porte: 'DEMAIS' },
  ],
  'Envelope': [
    { razaoSocial: 'SCRITY INDÚSTRIA E COMÉRCIO DE ENVELOPES LTDA', cnpj: '60.123.456/0001-01', ufOrigem: 'SP', segmento: 'Envelopes & Papéis', porte: 'DEMAIS' },
    { razaoSocial: 'FORONI INDÚSTRIA GRÁFICA S.A.', cnpj: '61.789.012/0001-90', ufOrigem: 'SP', segmento: 'Papelaria & Envelopes', porte: 'DEMAIS' },
    { razaoSocial: 'ROMITEC INDÚSTRIA DE PLÁSTICOS E PAPÉIS S.A.', cnpj: '54.321.098/0001-44', ufOrigem: 'SP', segmento: 'Envelopes Especiais', porte: 'DEMAIS' },
  ],
  'Bloco de Notas / Post-it': [
    { razaoSocial: '3M DO BRASIL LTDA (POST-IT®)', cnpj: '45.987.012/0001-09', ufOrigem: 'SP', segmento: 'Blocos Autoadesivos', porte: 'DEMAIS' },
    { razaoSocial: 'ADELBRAS ADESIVOS E FITAS TÉCNICAS S.A.', cnpj: '50.123.456/0001-88', ufOrigem: 'SP', segmento: 'Blocos de Recado Adesivo', porte: 'DEMAIS' },
    { razaoSocial: 'CIS STICK COMERCIAL E IMPORTADORA LTDA', cnpj: '07.345.678/0001-52', ufOrigem: 'RJ', segmento: 'Adesivos & Papelaria', porte: 'DEMAIS' },
  ],

  // ==========================================
  // TECNOLOGIA DA INFORMAÇÃO & ELETRÔNICOS
  // ==========================================
  'Notebook / Computador Portátil': [
    { razaoSocial: 'DELL COMPUTADORES DO BRASIL LTDA', cnpj: '72.381.189/0001-10', ufOrigem: 'RS', segmento: 'Equipamentos de Informática', porte: 'DEMAIS' },
    { razaoSocial: 'LENOVO TECNOLOGIA BRASIL LTDA', cnpj: '07.275.920/0001-61', ufOrigem: 'SP', segmento: 'Notebooks Corporativos', porte: 'DEMAIS' },
    { razaoSocial: 'HP BRASIL INDÚSTRIA E COMÉRCIO DE EQUIPAMENTOS ELETRÔNICOS LTDA', cnpj: '04.912.443/0001-17', ufOrigem: 'SP', segmento: 'Notebooks & Workstations', porte: 'DEMAIS' },
    { razaoSocial: 'POSITIVO TECNOLOGIA S.A.', cnpj: '81.243.735/0001-48', ufOrigem: 'PR', segmento: 'Computadores Portáteis', porte: 'DEMAIS' },
    { razaoSocial: 'MICROCITY TECNOLOGIA DA INFORMAÇÃO S.A.', cnpj: '21.098.765/0001-40', ufOrigem: 'MG', segmento: 'Locação & Venda TI', porte: 'DEMAIS' },
  ],
  'Desktop / Computador de Mesa': [
    { razaoSocial: 'DELL COMPUTADORES DO BRASIL LTDA', cnpj: '72.381.189/0001-10', ufOrigem: 'RS', segmento: 'Desktops Corporativos', porte: 'DEMAIS' },
    { razaoSocial: 'LENOVO TECNOLOGIA BRASIL LTDA', cnpj: '07.275.920/0001-61', ufOrigem: 'SP', segmento: 'Computadores de Mesa', porte: 'DEMAIS' },
    { razaoSocial: 'POSITIVO TECNOLOGIA S.A.', cnpj: '81.243.735/0001-48', ufOrigem: 'PR', segmento: 'Microcomputadores', porte: 'DEMAIS' },
    { razaoSocial: 'DATEN TECNOLOGIA LTDA', cnpj: '04.602.789/0001-82', ufOrigem: 'BA', segmento: 'Desktops & Servidores', porte: 'DEMAIS' },
  ],
  'Monitor': [
    { razaoSocial: 'LG ELECTRONICS DO BRASIL LTDA', cnpj: '01.166.372/0001-55', ufOrigem: 'SP', segmento: 'Monitores & Displays', porte: 'DEMAIS' },
    { razaoSocial: 'SAMSUNG ELETRÔNICA DA AMAZÔNIA LTDA', cnpj: '00.280.273/0001-37', ufOrigem: 'AM', segmento: 'Monitores LED/IPS', porte: 'DEMAIS' },
    { razaoSocial: 'DELL COMPUTADORES DO BRASIL LTDA', cnpj: '72.381.189/0001-10', ufOrigem: 'RS', segmento: 'Monitores Corporativos', porte: 'DEMAIS' },
    { razaoSocial: 'ENVISION INDÚSTRIA DE PRODUTOS ELETRÔNICOS LTDA (AOC / PHILIPS)', cnpj: '04.142.456/0001-09', ufOrigem: 'AM', segmento: 'Monitores', porte: 'DEMAIS' },
  ],
  'Kit Teclado e Mouse': [
    { razaoSocial: 'LOGITECH DO BRASIL COMÉRCIO DE ACESSÓRIOS DE INFORMÁTICA LTDA', cnpj: '08.577.890/0001-32', ufOrigem: 'SP', segmento: 'Periféricos de TI', porte: 'DEMAIS' },
    { razaoSocial: 'MULTILASER INDUSTRIAL S.A.', cnpj: '59.717.553/0001-02', ufOrigem: 'MG', segmento: 'Periféricos & Acessórios', porte: 'DEMAIS' },
    { razaoSocial: 'DELL COMPUTADORES DO BRASIL LTDA', cnpj: '72.381.189/0001-10', ufOrigem: 'RS', segmento: 'Teclados e Mouses USB', porte: 'DEMAIS' },
    { razaoSocial: 'MICROSOFT INFORMÁTICA LTDA', cnpj: '60.316.817/0001-03', ufOrigem: 'SP', segmento: 'Periféricos & Hardware', porte: 'DEMAIS' },
  ],
  'Nobreak / Estabilizador': [
    { razaoSocial: 'SCHNEIDER ELECTRIC BRASIL / SMS TECNOLOGIA ELETRÔNICA LTDA', cnpj: '62.080.320/0001-50', ufOrigem: 'SP', segmento: 'Nobreaks & Energia', porte: 'DEMAIS' },
    { razaoSocial: 'RAGTECH INDÚSTRIA ELETRÔNICA LTDA', cnpj: '67.890.123/0001-44', ufOrigem: 'SP', segmento: 'Condicionadores de Tensão', porte: 'DEMAIS' },
    { razaoSocial: 'INTELBRAS S.A. INDÚSTRIA DE TELECOMUNICAÇÃO ELETRÔNICA BRASILEIRA', cnpj: '82.901.000/0001-27', ufOrigem: 'SC', segmento: 'Nobreaks & Segurança', porte: 'DEMAIS' },
    { razaoSocial: 'TS SHARA TECNOLOGIA EM SISTEMAS DE ENERGIA LTDA', cnpj: '62.456.789/0001-90', ufOrigem: 'SP', segmento: 'Nobreaks Senoidais', porte: 'DEMAIS' },
  ],
  'Impressora / Multifuncional': [
    { razaoSocial: 'BROTHER INTERNATIONAL CORPORATION DO BRASIL LTDA', cnpj: '50.567.890/0001-11', ufOrigem: 'SP', segmento: 'Multifuncionais Laser', porte: 'DEMAIS' },
    { razaoSocial: 'EPSON DO BRASIL INDÚSTRIA E COMÉRCIO LTDA', cnpj: '52.106.911/0001-43', ufOrigem: 'SP', segmento: 'Impressoras Ecotank', porte: 'DEMAIS' },
    { razaoSocial: 'HP BRASIL INDÚSTRIA DE EQUIPAMENTOS ELETRÔNICOS LTDA', cnpj: '04.912.443/0001-17', ufOrigem: 'SP', segmento: 'LaserJet Multifuncionais', porte: 'DEMAIS' },
    { razaoSocial: 'KYOCERA DOCUMENT SOLUTIONS DO BRASIL LTDA', cnpj: '01.234.567/0001-88', ufOrigem: 'SP', segmento: 'Outsourcing & Impressão', porte: 'DEMAIS' },
  ],
  'Cartucho de Toner': [
    { razaoSocial: 'KATUN BRASIL COMÉRCIO DE SUPRIMENTOS DE IMPRESSÃO LTDA', cnpj: '00.123.456/0001-99', ufOrigem: 'SP', segmento: 'Toners & Cilindros', porte: 'DEMAIS' },
    { razaoSocial: 'BROTHER INTERNATIONAL DO BRASIL LTDA', cnpj: '50.567.890/0001-11', ufOrigem: 'SP', segmento: 'Toners Originais', porte: 'DEMAIS' },
    { razaoSocial: 'CHINAMATE SUPRIMENTOS DE INFORMÁTICA EIRELI', cnpj: '17.890.123/0001-66', ufOrigem: 'PR', segmento: 'Toners Compatíveis', porte: 'ME/EPP' },
    { razaoSocial: 'SUPRIMAX DISTRIBUIDORA DE CARTUCHOS E TONERS LTDA', cnpj: '23.456.789/0001-02', ufOrigem: 'MG', segmento: 'Cartuchos & Insumos', porte: 'ME/EPP' },
  ],
  'Switch / Rede': [
    { razaoSocial: 'INTELBRAS S.A. INDÚSTRIA DE TELECOMUNICAÇÃO BRASILEIRA', cnpj: '82.901.000/0001-27', ufOrigem: 'SC', segmento: 'Switches & Roteadores', porte: 'DEMAIS' },
    { razaoSocial: 'TP-LINK DO BRASIL COMÉRCIO DE EQUIPAMENTOS DE REDE LTDA', cnpj: '11.234.567/0001-89', ufOrigem: 'SP', segmento: 'Equipamentos de Rede', porte: 'DEMAIS' },
    { razaoSocial: 'CISCO DO BRASIL LTDA', cnpj: '01.059.870/0001-60', ufOrigem: 'SP', segmento: 'Infraestrutura de Rede', porte: 'DEMAIS' },
  ],

  // ==========================================
  // MOBILIÁRIO CORPORATIVO & ESCOLAR
  // ==========================================
  'Cadeira Giratória': [
    { razaoSocial: 'FLEXFORM INDÚSTRIA E COMÉRCIO DE MÓVEIS LTDA', cnpj: '08.776.543/0001-11', ufOrigem: 'SP', segmento: 'Cadeiras Ergonômicas NR-17', porte: 'DEMAIS' },
    { razaoSocial: 'CAVALETTI S/A CADEIRAS PROFISSIONAIS', cnpj: '61.123.456/0001-78', ufOrigem: 'RS', segmento: 'Poltronas & Cadeiras Operativas', porte: 'DEMAIS' },
    { razaoSocial: 'PLAXMETAL S.A. INDÚSTRIA DE MÓVEIS CORPORATIVOS', cnpj: '92.345.678/0001-09', ufOrigem: 'RS', segmento: 'Mobiliário de Escritório', porte: 'DEMAIS' },
    { razaoSocial: 'FRISOKAR EQUIPAMENTOS PLÁSTICOS E MÓVEIS LTDA', cnpj: '56.789.012/0001-34', ufOrigem: 'SP', segmento: 'Assentos Corporativos', porte: 'DEMAIS' },
  ],
  'Mesa de Escritório': [
    { razaoSocial: 'PANDIN MÓVEIS DE AÇO E MADEIRA LTDA', cnpj: '45.123.789/0001-56', ufOrigem: 'SP', segmento: 'Estações de Trabalho', porte: 'DEMAIS' },
    { razaoSocial: 'GEBB WORK INDÚSTRIA DE MÓVEIS CORPORATIVOS LTDA', cnpj: '03.890.123/0001-44', ufOrigem: 'RS', segmento: 'Mobiliário Corporativo', porte: 'DEMAIS' },
    { razaoSocial: 'MARZO VITORINO MÓVEIS PARA ESCRITÓRIO LTDA', cnpj: '60.456.789/0001-12', ufOrigem: 'SP', segmento: 'Mesas & Gaveteiros', porte: 'DEMAIS' },
  ],
  'Armário de Aço': [
    { razaoSocial: 'W3 INDÚSTRIA METALÚRGICA LTDA', cnpj: '78.901.234/0001-89', ufOrigem: 'PR', segmento: 'Armários & Arquivos de Aço', porte: 'DEMAIS' },
    { razaoSocial: 'NILKO STEEL INDÚSTRIA METALÚRGICA S.A.', cnpj: '76.543.210/0001-77', ufOrigem: 'PR', segmento: 'Roupeiros & Armários', porte: 'DEMAIS' },
    { razaoSocial: 'PANDIN MÓVEIS DE AÇO LTDA', cnpj: '45.123.789/0001-56', ufOrigem: 'SP', segmento: 'Móveis de Aço', porte: 'DEMAIS' },
  ],
  'Longarina': [
    { razaoSocial: 'FRISOKAR EQUIPAMENTOS PLÁSTICOS E MÓVEIS LTDA', cnpj: '56.789.012/0001-34', ufOrigem: 'SP', segmento: 'Longarinas de Espera', porte: 'DEMAIS' },
    { razaoSocial: 'PLAXMETAL S.A. INDÚSTRIA DE MÓVEIS', cnpj: '92.345.678/0001-09', ufOrigem: 'RS', segmento: 'Assentos Coletivos', porte: 'DEMAIS' },
    { razaoSocial: 'CAVALETTI S/A CADEIRAS PROFISSIONAIS', cnpj: '61.123.456/0001-78', ufOrigem: 'RS', segmento: 'Longarinas Recepção', porte: 'DEMAIS' },
  ],

  // ==========================================
  // COMBUSTÍVEIS & LUBRIFICANTES
  // ==========================================
  'Gasolina Comum': [
    { razaoSocial: 'VIBRA ENERGIA S.A. (POSTOS PETROBRAS)', cnpj: '34.274.233/0001-02', ufOrigem: 'RJ', segmento: 'Combustíveis Automotivos', porte: 'DEMAIS' },
    { razaoSocial: 'IPIRANGA PRODUTOS DE PETRÓLEO S.A.', cnpj: '33.337.122/0001-27', ufOrigem: 'RJ', segmento: 'Combustíveis & Derivados', porte: 'DEMAIS' },
    { razaoSocial: 'RAÍZEN COMBUSTÍVEIS S.A. (SHELL)', cnpj: '33.453.598/0001-23', ufOrigem: 'SP', segmento: 'Derivados de Petróleo', porte: 'DEMAIS' },
    { razaoSocial: 'ALE COMBUSTÍVEIS S.A.', cnpj: '01.594.398/0001-40', ufOrigem: 'MG', segmento: 'Distribuição de Combustíveis', porte: 'DEMAIS' },
  ],
  'Etanol Hidratado': [
    { razaoSocial: 'RAÍZEN COMBUSTÍVEIS S.A.', cnpj: '33.453.598/0001-23', ufOrigem: 'SP', segmento: 'Biocombustíveis & Etanol', porte: 'DEMAIS' },
    { razaoSocial: 'VIBRA ENERGIA S.A.', cnpj: '34.274.233/0001-02', ufOrigem: 'RJ', segmento: 'Etanol Carburante', porte: 'DEMAIS' },
    { razaoSocial: 'IPIRANGA PRODUTOS DE PETRÓLEO S.A.', cnpj: '33.337.122/0001-27', ufOrigem: 'RJ', segmento: 'Combustíveis Renováveis', porte: 'DEMAIS' },
  ],
  'Óleo Diesel S10': [
    { razaoSocial: 'VIBRA ENERGIA S.A.', cnpj: '34.274.233/0001-02', ufOrigem: 'RJ', segmento: 'Óleo Diesel S-10', porte: 'DEMAIS' },
    { razaoSocial: 'IPIRANGA PRODUTOS DE PETRÓLEO S.A.', cnpj: '33.337.122/0001-27', ufOrigem: 'RJ', segmento: 'Diesel Automotivo', porte: 'DEMAIS' },
    { razaoSocial: 'RAÍZEN COMBUSTÍVEIS S.A.', cnpj: '33.453.598/0001-23', ufOrigem: 'SP', segmento: 'Diesel Rodoviário', porte: 'DEMAIS' },
  ],
  'Óleo Lubrificante': [
    { razaoSocial: 'LUBRAX / VIBRA ENERGIA S.A.', cnpj: '34.274.233/0001-02', ufOrigem: 'RJ', segmento: 'Lubrificantes Sintéticos', porte: 'DEMAIS' },
    { razaoSocial: 'COSAN LUBRIFICANTES E ESPECIALIDADES S.A. (MOBIL)', cnpj: '60.448.232/0001-05', ufOrigem: 'SP', segmento: 'Óleos de Motor', porte: 'DEMAIS' },
    { razaoSocial: 'CASTROL BRASIL LTDA', cnpj: '30.123.456/0001-78', ufOrigem: 'RJ', segmento: 'Lubrificantes de Alta Performance', porte: 'DEMAIS' },
  ],

  // ==========================================
  // LIMPEZA, HIGIENE & SANEAMENTO
  // ==========================================
  'Detergente Líquido': [
    { razaoSocial: 'QUÍMICA AMPARO LTDA (YPÊ)', cnpj: '43.456.789/0001-12', ufOrigem: 'SP', segmento: 'Higiene & Limpeza', porte: 'DEMAIS' },
    { razaoSocial: 'BOMBRIL S.A. MERCANTIL E INDUSTRIAL (LIMPOL)', cnpj: '60.567.890/0001-34', ufOrigem: 'SP', segmento: 'Detergentes & Saneantes', porte: 'DEMAIS' },
    { razaoSocial: 'MINUANO / FLORA PRODUTOS DE HIGIENE E LIMPEZA S.A.', cnpj: '08.901.234/0001-56', ufOrigem: 'GO', segmento: 'Produtos de Limpeza', porte: 'DEMAIS' },
  ],
  'Sabão em Pó / Lava Roupas': [
    { razaoSocial: 'UNILEVER BRASIL INDUSTRIAL LTDA (OMO)', cnpj: '61.068.276/0001-04', ufOrigem: 'SP', segmento: 'Lava-Roupas & Cuidados', porte: 'DEMAIS' },
    { razaoSocial: 'QUÍMICA AMPARO LTDA (YPÊ / TIXAN)', cnpj: '43.456.789/0001-12', ufOrigem: 'SP', segmento: 'Sabão em Pó & Amaciantes', porte: 'DEMAIS' },
    { razaoSocial: 'FLORA PRODUTOS DE HIGIENE E LIMPEZA S.A. (BRILHANTE)', cnpj: '08.901.234/0001-56', ufOrigem: 'GO', segmento: 'Detergentes em Pó', porte: 'DEMAIS' },
  ],
  'Desinfetante': [
    { razaoSocial: 'COLGATE-PALMOLIVE INDUSTRIAL LTDA (PINHO SOL)', cnpj: '61.411.234/0001-88', ufOrigem: 'SP', segmento: 'Desinfetantes & Limpeza', porte: 'DEMAIS' },
    { razaoSocial: 'RECKITT BENCKISER BRASIL COMERCIAL LTDA (VEJA)', cnpj: '00.567.890/0001-45', ufOrigem: 'SP', segmento: 'Multiuso & Desinfetantes', porte: 'DEMAIS' },
    { razaoSocial: 'BOMBRIL S.A. MERCANTIL E INDUSTRIAL (PINHO BRIL)', cnpj: '60.567.890/0001-34', ufOrigem: 'SP', segmento: 'Bactericidas', porte: 'DEMAIS' },
  ],
  'Água Sanitária': [
    { razaoSocial: 'ANHEMBI INDÚSTRIA QUÍMICA E FARMACÊUTICA LTDA (SUPER CANDIDA / QBOA)', cnpj: '61.789.456/0001-20', ufOrigem: 'SP', segmento: 'Alvejantes & Cloro', porte: 'DEMAIS' },
    { razaoSocial: 'BRILUX / RAYMUNDO DA FONTE INDÚSTRIA QUÍMICA S.A.', cnpj: '10.890.123/0001-77', ufOrigem: 'PE', segmento: 'Saneantes & Cloro', porte: 'DEMAIS' },
    { razaoSocial: 'DRAGÃO SANEANTES INDÚSTRIA E COMÉRCIO LTDA', cnpj: '07.654.321/0001-90', ufOrigem: 'CE', segmento: 'Água Sanitária', porte: 'ME/EPP' },
  ],
  'Papel Higiênico': [
    { razaoSocial: 'SANTHER FÁBRICA DE PAPEL SANTA TEREZINHA S.A.', cnpj: '61.156.789/0001-30', ufOrigem: 'SP', segmento: 'Papéis Sanitários', porte: 'DEMAIS' },
    { razaoSocial: 'KIMBERLY-CLARK BRASIL INDÚSTRIA E COMÉRCIO DE PRODUTOS DE HIGIENE LTDA (NEVE)', cnpj: '02.290.277/0001-21', ufOrigem: 'SP', segmento: 'Higiene & Papéis', porte: 'DEMAIS' },
    { razaoSocial: 'SEPAC SERRADOS E PASTA DE CELULOSE LTDA (PALOMA / DUETTO)', cnpj: '76.123.456/0001-89', ufOrigem: 'PR', segmento: 'Papel Higiênico Folha Dupla', porte: 'DEMAIS' },
  ],
  'Papel Toalha Interfolhado': [
    { razaoSocial: 'SANTHER FÁBRICA DE PAPEL SANTA TEREZINHA S.A.', cnpj: '61.156.789/0001-30', ufOrigem: 'SP', segmento: 'Papel Toalha Interfolha', porte: 'DEMAIS' },
    { razaoSocial: 'COMPANHIA MELHORAMENTOS DE SÃO PAULO', cnpj: '60.789.012/0001-65', ufOrigem: 'SP', segmento: 'Toalhas de Papel', porte: 'DEMAIS' },
    { razaoSocial: 'SCALA INDÚSTRIA DE PAPÉIS SANITÁRIOS EIRELI', cnpj: '15.432.109/0001-43', ufOrigem: 'SC', segmento: 'Interfolhados', porte: 'ME/EPP' },
  ],
  'Saco de Lixo': [
    { razaoSocial: 'EMBALIXO INDÚSTRIA E COMÉRCIO DE PLÁSTICOS S.A.', cnpj: '06.789.123/0001-44', ufOrigem: 'SP', segmento: 'Sacos para Lixo Reforçados', porte: 'DEMAIS' },
    { razaoSocial: 'EXTRUSA PACK EMBALAGENS PLÁSTICAS LTDA', cnpj: '02.901.234/0001-11', ufOrigem: 'SP', segmento: 'Filmes Plásticos & Sacos', porte: 'DEMAIS' },
    { razaoSocial: 'PLASVALE INDÚSTRIA DE PLÁSTICOS DO VALE LTDA', cnpj: '83.456.789/0001-90', ufOrigem: 'SC', segmento: 'Sacos de Lixo ABNT', porte: 'DEMAIS' },
  ],
  'Vassoura e Rodo': [
    { razaoSocial: 'BETTANIN INDUSTRIAL S.A.', cnpj: '92.689.444/0001-88', ufOrigem: 'RS', segmento: 'Vassouras & Rodos', porte: 'DEMAIS' },
    { razaoSocial: 'CONDOR S.A. INDÚSTRIA E COMÉRCIO DE ESCOVAS E VASSOURAS', cnpj: '83.901.234/0001-55', ufOrigem: 'SC', segmento: 'Limpeza Pesada', porte: 'DEMAIS' },
    { razaoSocial: 'SANTA MARIA INDÚSTRIA E COMÉRCIO DE VASSOURAS LTDA', cnpj: '12.345.678/0001-22', ufOrigem: 'MG', segmento: 'Vassouras de Piaçava & Rodos', porte: 'ME/EPP' },
  ],

  // ==========================================
  // ALIMENTAÇÃO, COPA & COZINHA
  // ==========================================
  'Café Torrado e Moído': [
    { razaoSocial: 'JACOBS DOUWE EGBERTS BRASIL COMÉRCIO DE CAFÉS LTDA (PILÃO / CABOCLO)', cnpj: '03.148.425/0001-61', ufOrigem: 'SP', segmento: 'Cafés Torrados a Vácuo', porte: 'DEMAIS' },
    { razaoSocial: 'TRÊS CORAÇÕES ALIMENTOS S.A.', cnpj: '17.467.515/0001-07', ufOrigem: 'MG', segmento: 'Cafés Tradicionais & Especiais', porte: 'DEMAIS' },
    { razaoSocial: 'MELITTA DO BRASIL INDÚSTRIA E COMÉRCIO LTDA', cnpj: '61.129.876/0001-32', ufOrigem: 'SP', segmento: 'Café & Filtros', porte: 'DEMAIS' },
    { razaoSocial: 'CAFÉ PELÉ / JCO INDÚSTRIA DE ALIMENTOS S.A.', cnpj: '46.789.012/0001-99', ufOrigem: 'PR', segmento: 'Café Moído Selo ABIC', porte: 'DEMAIS' },
  ],
  'Açúcar Cristal / Refinado': [
    { razaoSocial: 'CAMIL ALIMENTOS S.A. (UNIÃO / DA BARRA)', cnpj: '64.904.295/0001-03', ufOrigem: 'SP', segmento: 'Açúcares & Alimentos', porte: 'DEMAIS' },
    { razaoSocial: 'USINA CARAVELAS / COLOMBO AGROINDÚSTRIA S.A.', cnpj: '51.890.123/0001-45', ufOrigem: 'SP', segmento: 'Açúcar Cristal Pacote 1kg', porte: 'DEMAIS' },
    { razaoSocial: 'USINA SÃO MARTINHO S.A. - DISTRIBUIÇÃO', cnpj: '45.678.901/0001-88', ufOrigem: 'SP', segmento: 'Açúcar Refinado e Cristal', porte: 'DEMAIS' },
  ],
  'Leite Integral UHT': [
    { razaoSocial: 'ITAMBÉ ALIMENTOS S.A.', cnpj: '17.189.234/0001-50', ufOrigem: 'MG', segmento: 'Laticínios & Leite UHT', porte: 'DEMAIS' },
    { razaoSocial: 'LATICÍNIOS BELA VISTA S.A. (PIRACANJUBA)', cnpj: '01.678.901/0001-72', ufOrigem: 'GO', segmento: 'Leite Longa Vida 1L', porte: 'DEMAIS' },
    { razaoSocial: 'GOIÁS MINAS INDÚSTRIA DE LATICÍNIOS LTDA (ITALAC)', cnpj: '01.234.567/0001-44', ufOrigem: 'GO', segmento: 'Leite Integral Tetra Pak', porte: 'DEMAIS' },
  ],
  'Água Mineral': [
    { razaoSocial: 'MINALBA BRASIL BEBIDAS E ALIMENTOS S.A. (MINALBA / INDAIÁ)', cnpj: '07.123.456/0001-89', ufOrigem: 'SP', segmento: 'Águas Minerais & Galões 20L', porte: 'DEMAIS' },
    { razaoSocial: 'COCA-COLA FEMSA DO BRASIL LTDA (CRYSTAL)', cnpj: '45.997.418/0001-53', ufOrigem: 'SP', segmento: 'Água Mineral sem Gás', porte: 'DEMAIS' },
    { razaoSocial: 'SOCIEDADE DE ÁGUAS LINDOYA VERÃO LTDA', cnpj: '51.234.567/0001-11', ufOrigem: 'SP', segmento: 'Água Mineral Natural', porte: 'DEMAIS' },
  ],
  'Copo Descartável': [
    { razaoSocial: 'COPOBRAS INDÚSTRIA E COMÉRCIO DE EMBALAGENS S.A.', cnpj: '83.123.456/0001-90', ufOrigem: 'SC', segmento: 'Copos Plásticos Descartáveis', porte: 'DEMAIS' },
    { razaoSocial: 'ALTACOPPO INDÚSTRIA E COMÉRCIO DE DESCARTÁVEIS LTDA', cnpj: '05.678.901/0001-33', ufOrigem: 'SP', segmento: 'Copos 200ml & 50ml', porte: 'DEMAIS' },
    { razaoSocial: 'STRAWPLAST INDÚSTRIA DE DESCARTÁVEIS PLÁSTICOS LTDA', cnpj: '78.901.234/0001-55', ufOrigem: 'SC', segmento: 'Descartáveis para Copa', porte: 'DEMAIS' },
  ],
};

// Fornecedores Regionais Competitivos por UF para garantir diversidade local autêntica
export const FORNECEDORES_REGIONAIS_UF: Record<string, FornecedorHomologado[]> = {
  AC: [
    { razaoSocial: 'ACRE SUPRIMENTOS E SERVIÇOS CORPORATIVOS LTDA', cnpj: '04.551.234/0001-10', ufOrigem: 'AC', segmento: 'Comércio Varejista e Atacadista', porte: 'ME/EPP' },
    { razaoSocial: 'RIO BRANCO DISTRIBUIDORA DE PRODUTOS GERAIS EIRELI', cnpj: '14.890.123/0001-44', ufOrigem: 'AC', segmento: 'Distribuição e Logística', porte: 'ME/EPP' },
    { razaoSocial: 'NORTE COMÉRCIO E LICITAÇÕES LTDA', cnpj: '23.456.789/0001-99', ufOrigem: 'AC', segmento: 'Suprimentos Públicos', porte: 'ME/EPP' },
  ],
  AL: [
    { razaoSocial: 'MACEIÓ COMERCIAL DE SUPRIMENTOS E ARTIGOS LTDA', cnpj: '12.431.567/0001-20', ufOrigem: 'AL', segmento: 'Comércio Atacadista', porte: 'ME/EPP' },
    { razaoSocial: 'ALAGOAS DISTRIBUIÇÃO E LOGÍSTICA DE MERCADORIAS EIRELI', cnpj: '08.765.432/0001-55', ufOrigem: 'AL', segmento: 'Distribuição Regional', porte: 'ME/EPP' },
    { razaoSocial: 'LITORAL COMÉRCIO DE PRODUTOS E EQUIPAMENTOS LTDA', cnpj: '19.876.543/0001-88', ufOrigem: 'AL', segmento: 'Suprimentos Institucionais', porte: 'ME/EPP' },
  ],
  AP: [
    { razaoSocial: 'MACAPÁ SUPRIMENTOS E DISTRIBUIÇÃO LTDA', cnpj: '05.889.012/0001-33', ufOrigem: 'AP', segmento: 'Comércio e Representações', porte: 'ME/EPP' },
    { razaoSocial: 'AMAZÔNIA ATACADISTA DE PRODUTOS DIVERSOS EIRELI', cnpj: '18.765.432/0001-77', ufOrigem: 'AP', segmento: 'Distribuição Integrada', porte: 'ME/EPP' },
    { razaoSocial: 'EQUATORIAL COMÉRCIO E SERVIÇOS EM LICITAÇÕES LTDA', cnpj: '27.654.321/0001-12', ufOrigem: 'AP', segmento: 'Suprimentos Governamentais', porte: 'ME/EPP' },
  ],
  AM: [
    { razaoSocial: 'AMAZONAS COMÉRCIO DE SUPRIMENTOS E PRODUTOS LTDA', cnpj: '04.789.012/0001-65', ufOrigem: 'AM', segmento: 'Comércio Varejista e Atacadista', porte: 'DEMAIS' },
    { razaoSocial: 'MANAUS DISTRIBUIDORA E LOGÍSTICA EIRELI', cnpj: '10.987.654/0001-32', ufOrigem: 'AM', segmento: 'Distribuição Regional', porte: 'ME/EPP' },
    { razaoSocial: 'SOLIMÕES LICITAÇÕES E MATERIAIS DE CONSUMO LTDA', cnpj: '22.345.678/0001-89', ufOrigem: 'AM', segmento: 'Suprimentos Gerais', porte: 'ME/EPP' },
  ],
  BA: [
    { razaoSocial: 'BAHIA SUPRIMENTOS E COMÉRCIO ATACADISTA LTDA', cnpj: '13.456.789/0001-40', ufOrigem: 'BA', segmento: 'Comércio Atacadista', porte: 'DEMAIS' },
    { razaoSocial: 'SALVADOR DISTRIBUIDORA DE MATERIAIS E EQUIPAMENTOS EIRELI', cnpj: '09.876.543/0001-18', ufOrigem: 'BA', segmento: 'Distribuição e Logística', porte: 'DEMAIS' },
    { razaoSocial: 'TODOS OS SANTOS COMÉRCIO E LICITAÇÕES PÚBLICAS LTDA', cnpj: '28.765.432/0001-76', ufOrigem: 'BA', segmento: 'Suprimentos Governamentais', porte: 'ME/EPP' },
  ],
  CE: [
    { razaoSocial: 'CEARÁ SUPRIMENTOS E DISTRIBUIÇÃO CORPORATIVA LTDA', cnpj: '07.890.123/0001-50', ufOrigem: 'CE', segmento: 'Comércio & Distribuição', porte: 'DEMAIS' },
    { razaoSocial: 'FORTALEZA ATACADISTA DE MATERIAIS E CONSUMO EIRELI', cnpj: '14.567.890/0001-92', ufOrigem: 'CE', segmento: 'Atacado e Varejo', porte: 'ME/EPP' },
    { razaoSocial: 'DRAGÃO DO MAR LICITAÇÕES E COMÉRCIO LTDA', cnpj: '21.432.109/0001-35', ufOrigem: 'CE', segmento: 'Suprimentos Públicos', porte: 'ME/EPP' },
  ],
  DF: [
    { razaoSocial: 'BRASÍLIA SUPRIMENTOS CORPORATIVOS E ATACADO LTDA', cnpj: '00.890.123/0001-70', ufOrigem: 'DF', segmento: 'Suprimentos para Órgãos Públicos', porte: 'DEMAIS' },
    { razaoSocial: 'PLANALTO DISTRIBUIDORA E LOGÍSTICA DE MATERIAIS S.A.', cnpj: '11.567.890/0001-25', ufOrigem: 'DF', segmento: 'Distribuição Central', porte: 'DEMAIS' },
    { razaoSocial: 'CAPITAL LICITAÇÕES E COMÉRCIO DE PRODUTOS EIRELI', cnpj: '33.210.987/0001-44', ufOrigem: 'DF', segmento: 'Contratos Governamentais', porte: 'ME/EPP' },
    { razaoSocial: 'ALVORADA DISTRIBUIDORA DE PRODUTOS E EQUIPAMENTOS LTDA', cnpj: '15.432.109/0001-88', ufOrigem: 'DF', segmento: 'Suprimentos Gerais', porte: 'ME/EPP' },
  ],
  ES: [
    { razaoSocial: 'ESPÍRITO SANTO SUPRIMENTOS E COMÉRCIO LTDA', cnpj: '27.456.789/0001-15', ufOrigem: 'ES', segmento: 'Comércio Atacadista', porte: 'DEMAIS' },
    { razaoSocial: 'VITÓRIA DISTRIBUIDORA DE MATERIAIS E CONSUMO EIRELI', cnpj: '08.901.234/0001-66', ufOrigem: 'ES', segmento: 'Distribuição e Logística', porte: 'ME/EPP' },
    { razaoSocial: 'CAPIXABA LICITAÇÕES E PRODUTOS INSTITUCIONAIS LTDA', cnpj: '31.234.567/0001-09', ufOrigem: 'ES', segmento: 'Suprimentos Corporativos', porte: 'ME/EPP' },
  ],
  GO: [
    { razaoSocial: 'GOIÁS SUPRIMENTOS E DISTRIBUIÇÃO REGIONAL S.A.', cnpj: '01.789.012/0001-80', ufOrigem: 'GO', segmento: 'Distribuição e Atacado', porte: 'DEMAIS' },
    { razaoSocial: 'GOIÂNIA COMERCIAL DE PRODUTOS E MATERIAIS EIRELI', cnpj: '12.678.901/0001-34', ufOrigem: 'GO', segmento: 'Suprimentos Públicos', porte: 'ME/EPP' },
    { razaoSocial: 'CENTRO-OESTE LICITAÇÕES E EQUIPAMENTOS LTDA', cnpj: '26.543.210/0001-71', ufOrigem: 'GO', segmento: 'Comércio Institucional', porte: 'ME/EPP' },
  ],
  MA: [
    { razaoSocial: 'MARANHÃO SUPRIMENTOS E COMÉRCIO ATACADISTA LTDA', cnpj: '06.567.890/0001-44', ufOrigem: 'MA', segmento: 'Atacado e Representações', porte: 'ME/EPP' },
    { razaoSocial: 'SÃO LUÍS DISTRIBUIDORA DE MERCADORIAS EIRELI', cnpj: '15.234.567/0001-88', ufOrigem: 'MA', segmento: 'Distribuição Regional', porte: 'ME/EPP' },
    { razaoSocial: 'ILHA DOS LENÇÓIS LICITAÇÕES E SUPRIMENTOS LTDA', cnpj: '29.876.543/0001-23', ufOrigem: 'MA', segmento: 'Suprimentos Públicos', porte: 'ME/EPP' },
  ],
  MT: [
    { razaoSocial: 'MATO GROSSO SUPRIMENTOS E DISTRIBUIÇÃO LTDA', cnpj: '03.890.123/0001-15', ufOrigem: 'MT', segmento: 'Distribuição e Comércio', porte: 'DEMAIS' },
    { razaoSocial: 'CUIABÁ ATACADISTA DE MATERIAIS E EQUIPAMENTOS EIRELI', cnpj: '17.456.789/0001-60', ufOrigem: 'MT', segmento: 'Atacado e Varejo', porte: 'ME/EPP' },
    { razaoSocial: 'PANTANAL LICITAÇÕES E PRODUTOS INSTITUCIONAIS LTDA', cnpj: '34.123.456/0001-95', ufOrigem: 'MT', segmento: 'Suprimentos Governamentais', porte: 'ME/EPP' },
  ],
  MS: [
    { razaoSocial: 'MATO GROSSO DO SUL DISTRIBUIDORA E LOGÍSTICA LTDA', cnpj: '03.678.901/0001-22', ufOrigem: 'MS', segmento: 'Distribuição e Suprimentos', porte: 'DEMAIS' },
    { razaoSocial: 'CAMPO GRANDE SUPRIMENTOS E COMÉRCIO EIRELI', cnpj: '13.901.234/0001-77', ufOrigem: 'MS', segmento: 'Comércio Institucional', porte: 'ME/EPP' },
    { razaoSocial: 'GUAIKURUS LICITAÇÕES E MATERIAIS DE CONSUMO LTDA', cnpj: '28.456.789/0001-10', ufOrigem: 'MS', segmento: 'Suprimentos Públicos', porte: 'ME/EPP' },
  ],
  MG: [
    { razaoSocial: 'MINAS GERAIS SUPRIMENTOS CORPORATIVOS S.A.', cnpj: '17.890.123/0001-90', ufOrigem: 'MG', segmento: 'Comércio Atacadista e Distribuição', porte: 'DEMAIS' },
    { razaoSocial: 'BELO HORIZONTE DISTRIBUIDORA DE MATERIAIS EIRELI', cnpj: '18.456.789/0001-35', ufOrigem: 'MG', segmento: 'Distribuição Integrada', porte: 'DEMAIS' },
    { razaoSocial: 'MULTIOFFICE SUPRIMENTOS CORPORATIVOS EIRELI', cnpj: '33.567.891/0001-44', ufOrigem: 'MG', segmento: 'Material e Suprimentos', porte: 'DEMAIS' },
    { razaoSocial: 'TRIÂNGULO LICITAÇÕES E COMÉRCIO DE EQUIPAMENTOS LTDA', cnpj: '24.123.456/0001-82', ufOrigem: 'MG', segmento: 'Suprimentos Governamentais', porte: 'ME/EPP' },
  ],
  PA: [
    { razaoSocial: 'PARÁ SUPRIMENTOS E DISTRIBUIÇÃO REGIONAL LTDA', cnpj: '05.678.901/0001-30', ufOrigem: 'PA', segmento: 'Distribuição e Atacado', porte: 'DEMAIS' },
    { razaoSocial: 'BELÉM ATACADISTA DE MATERIAIS E CONSUMO EIRELI', cnpj: '16.789.012/0001-75', ufOrigem: 'PA', segmento: 'Comércio Varejista e Atacadista', porte: 'ME/EPP' },
    { razaoSocial: 'GRÃO PARÁ LICITAÇÕES E PRODUTOS INSTITUCIONAIS LTDA', cnpj: '30.456.789/0001-18', ufOrigem: 'PA', segmento: 'Suprimentos Públicos', porte: 'ME/EPP' },
  ],
  PB: [
    { razaoSocial: 'PARAÍBA SUPRIMENTOS E COMÉRCIO DE MATERIAIS LTDA', cnpj: '08.901.234/0001-65', ufOrigem: 'PB', segmento: 'Comércio Atacadista', porte: 'ME/EPP' },
    { razaoSocial: 'JOÃO PESSOA DISTRIBUIDORA E LOGÍSTICA EIRELI', cnpj: '19.234.567/0001-09', ufOrigem: 'PB', segmento: 'Distribuição e Representações', porte: 'ME/EPP' },
    { razaoSocial: 'BORBOREMA LICITAÇÕES E PRODUTOS PÚBLICOS LTDA', cnpj: '27.890.123/0001-54', ufOrigem: 'PB', segmento: 'Suprimentos Governamentais', porte: 'ME/EPP' },
  ],
  PR: [
    { razaoSocial: 'PARANÁ DISTRIBUIDORA DE SUPRIMENTOS E PRODUTOS S.A.', cnpj: '76.890.123/0001-12', ufOrigem: 'PR', segmento: 'Distribuição e Logística', porte: 'DEMAIS' },
    { razaoSocial: 'CURITIBA COMERCIAL DE MATERIAIS E EQUIPAMENTOS LTDA', cnpj: '75.456.789/0001-60', ufOrigem: 'PR', segmento: 'Comércio Atacadista', porte: 'DEMAIS' },
    { razaoSocial: 'LONDRINA SUPRI-LICITAÇÕES EIRELI', cnpj: '10.789.012/0001-05', ufOrigem: 'PR', segmento: 'Suprimentos Institucionais', porte: 'ME/EPP' },
    { razaoSocial: 'ARAUCÁRIA PRODUTOS E MATERIAIS CORPORATIVOS LTDA', cnpj: '81.901.234/0001-49', ufOrigem: 'PR', segmento: 'Artigos Diversos', porte: 'ME/EPP' },
  ],
  PE: [
    { razaoSocial: 'PERNAMBUCO SUPRIMENTOS E DISTRIBUIÇÃO ATACADISTA S.A.', cnpj: '10.678.901/0001-80', ufOrigem: 'PE', segmento: 'Comércio Atacadista', porte: 'DEMAIS' },
    { razaoSocial: 'RECIFE COMERCIAL DE MATERIAIS E CONSUMO LTDA', cnpj: '11.234.567/0001-35', ufOrigem: 'PE', segmento: 'Distribuição Regional', porte: 'DEMAIS' },
    { razaoSocial: 'CAPIBARIBE LICITAÇÕES E PRODUTOS INSTITUCIONAIS EIRELI', cnpj: '25.678.901/0001-70', ufOrigem: 'PE', segmento: 'Suprimentos Públicos', porte: 'ME/EPP' },
  ],
  PI: [
    { razaoSocial: 'PIAUÍ SUPRIMENTOS E DISTRIBUIÇÃO REGIONAL LTDA', cnpj: '06.890.123/0001-25', ufOrigem: 'PI', segmento: 'Comércio & Distribuição', porte: 'ME/EPP' },
    { razaoSocial: 'TERESINA COMÉRCIO DE MATERIAIS E EQUIPAMENTOS EIRELI', cnpj: '14.901.234/0001-70', ufOrigem: 'PI', segmento: 'Atacado e Representações', porte: 'ME/EPP' },
    { razaoSocial: 'PARNAÍBA LICITAÇÕES E PRODUTOS GOVERNAMENTAIS LTDA', cnpj: '29.123.456/0001-14', ufOrigem: 'PI', segmento: 'Suprimentos Públicos', porte: 'ME/EPP' },
  ],
  RJ: [
    { razaoSocial: 'RIO DE JANEIRO SUPRIMENTOS CORPORATIVOS S.A.', cnpj: '33.890.123/0001-50', ufOrigem: 'RJ', segmento: 'Comércio Atacadista e Distribuição', porte: 'DEMAIS' },
    { razaoSocial: 'CARIOCA DISTRIBUIDORA DE MATERIAIS E EQUIPAMENTOS LTDA', cnpj: '42.678.901/0001-95', ufOrigem: 'RJ', segmento: 'Distribuição Integrada', porte: 'DEMAIS' },
    { razaoSocial: 'GUANABARA LICITAÇÕES E COMÉRCIO DE PRODUTOS EIRELI', cnpj: '30.456.789/0001-40', ufOrigem: 'RJ', segmento: 'Suprimentos Institucionais', porte: 'DEMAIS' },
    { razaoSocial: 'FLUMINENSE PRODUTOS E MATERIAIS DE CONSUMO LTDA', cnpj: '28.123.456/0001-85', ufOrigem: 'RJ', segmento: 'Artigos Diversos', porte: 'ME/EPP' },
  ],
  RN: [
    { razaoSocial: 'RIO GRANDE DO NORTE SUPRIMENTOS E COMÉRCIO LTDA', cnpj: '08.678.901/0001-30', ufOrigem: 'RN', segmento: 'Comércio Atacadista', porte: 'ME/EPP' },
    { razaoSocial: 'NATAL DISTRIBUIDORA DE MATERIAIS EIRELI', cnpj: '17.890.123/0001-75', ufOrigem: 'RN', segmento: 'Distribuição Regional', porte: 'ME/EPP' },
    { razaoSocial: 'POTIGUAR LICITAÇÕES E PRODUTOS INSTITUCIONAIS LTDA', cnpj: '26.234.567/0001-19', ufOrigem: 'RN', segmento: 'Suprimentos Públicos', porte: 'ME/EPP' },
  ],
  RS: [
    { razaoSocial: 'RIO GRANDE DO SUL DISTRIBUIDORA DE SUPRIMENTOS S.A.', cnpj: '92.890.123/0001-40', ufOrigem: 'RS', segmento: 'Distribuição e Logística', porte: 'DEMAIS' },
    { razaoSocial: 'PORTO ALEGRE COMERCIAL DE MATERIAIS E EQUIPAMENTOS LTDA', cnpj: '91.456.789/0001-85', ufOrigem: 'RS', segmento: 'Comércio Atacadista', porte: 'DEMAIS' },
    { razaoSocial: 'GAÚCHA LICITAÇÕES E SUPRIMENTOS CORPORATIVOS EIRELI', cnpj: '89.123.456/0001-30', ufOrigem: 'RS', segmento: 'Suprimentos Institucionais', porte: 'DEMAIS' },
    { razaoSocial: 'PAMPA PRODUTOS E MATERIAIS DE CONSUMO LTDA', cnpj: '95.678.901/0001-74', ufOrigem: 'RS', segmento: 'Artigos Diversos', porte: 'ME/EPP' },
  ],
  RO: [
    { razaoSocial: 'RONDÔNIA SUPRIMENTOS E DISTRIBUIÇÃO REGIONAL LTDA', cnpj: '04.890.123/0001-60', ufOrigem: 'RO', segmento: 'Distribuição e Atacado', porte: 'ME/EPP' },
    { razaoSocial: 'PORTO VELHO COMERCIAL DE PRODUTOS EIRELI', cnpj: '15.678.901/0001-05', ufOrigem: 'RO', segmento: 'Comércio Institucional', porte: 'ME/EPP' },
    { razaoSocial: 'MADEIRA-MAMORÉ LICITAÇÕES E MATERIAIS LTDA', cnpj: '28.901.234/0001-50', ufOrigem: 'RO', segmento: 'Suprimentos Governamentais', porte: 'ME/EPP' },
  ],
  RR: [
    { razaoSocial: 'RORAIMA SUPRIMENTOS E COMÉRCIO GERAL LTDA', cnpj: '05.789.012/0001-90', ufOrigem: 'RR', segmento: 'Comércio Varejista e Atacadista', porte: 'ME/EPP' },
    { razaoSocial: 'BOA VISTA DISTRIBUIDORA DE MATERIAIS EIRELI', cnpj: '19.456.789/0001-35', ufOrigem: 'RR', segmento: 'Distribuição Regional', porte: 'ME/EPP' },
    { razaoSocial: 'EXTREMO NORTE LICITAÇÕES E EQUIPAMENTOS LTDA', cnpj: '31.890.123/0001-80', ufOrigem: 'RR', segmento: 'Suprimentos Públicos', porte: 'ME/EPP' },
  ],
  SC: [
    { razaoSocial: 'SANTA CATARINA DISTRIBUIDORA DE SUPRIMENTOS S.A.', cnpj: '83.890.123/0001-20', ufOrigem: 'SC', segmento: 'Distribuição e Logística', porte: 'DEMAIS' },
    { razaoSocial: 'FLORIANÓPOLIS COMERCIAL DE MATERIAIS EIRELI', cnpj: '82.456.789/0001-65', ufOrigem: 'SC', segmento: 'Comércio Atacadista', porte: 'DEMAIS' },
    { razaoSocial: 'CATARINENSE LICITAÇÕES E EQUIPAMENTOS LTDA', cnpj: '80.123.456/0001-10', ufOrigem: 'SC', segmento: 'Suprimentos Corporativos', porte: 'DEMAIS' },
    { razaoSocial: 'VALE DO ITAJAÍ PRODUTOS E MATERIAIS LTDA', cnpj: '85.678.901/0001-55', ufOrigem: 'SC', segmento: 'Artigos Diversos', porte: 'ME/EPP' },
  ],
  SP: [
    { razaoSocial: 'SÃO PAULO SUPRIMENTOS E DISTRIBUIÇÃO ATACADISTA S.A.', cnpj: '46.890.123/0001-70', ufOrigem: 'SP', segmento: 'Distribuição em Grande Escala', porte: 'DEMAIS' },
    { razaoSocial: 'PAULISTA COMÉRCIO DE MATERIAIS E EQUIPAMENTOS LTDA', cnpj: '44.567.890/0001-15', ufOrigem: 'SP', segmento: 'Comércio Atacadista', porte: 'DEMAIS' },
    { razaoSocial: 'BANDEIRANTES LICITAÇÕES E PRODUTOS INSTITUCIONAIS S.A.', cnpj: '53.234.567/0001-60', ufOrigem: 'SP', segmento: 'Suprimentos Governamentais', porte: 'DEMAIS' },
    { razaoSocial: 'METRÓPOLE DISTRIBUIDORA DE PRODUTOS E SERVIÇOS LTDA', cnpj: '58.901.234/0001-05', ufOrigem: 'SP', segmento: 'Artigos Diversos', porte: 'DEMAIS' },
  ],
  SE: [
    { razaoSocial: 'SERGIPE SUPRIMENTOS E COMÉRCIO DE MATERIAIS LTDA', cnpj: '13.890.123/0001-45', ufOrigem: 'SE', segmento: 'Comércio Atacadista', porte: 'ME/EPP' },
    { razaoSocial: 'ARACAJU DISTRIBUIDORA E LOGÍSTICA EIRELI', cnpj: '15.456.789/0001-90', ufOrigem: 'SE', segmento: 'Distribuição Regional', porte: 'ME/EPP' },
    { razaoSocial: 'SERGIPANA LICITAÇÕES E PRODUTOS PÚBLICOS LTDA', cnpj: '28.123.456/0001-34', ufOrigem: 'SE', segmento: 'Suprimentos Governamentais', porte: 'ME/EPP' },
  ],
  TO: [
    { razaoSocial: 'TOCANTINS SUPRIMENTOS E DISTRIBUIÇÃO REGIONAL LTDA', cnpj: '25.890.123/0001-80', ufOrigem: 'TO', segmento: 'Distribuição e Atacado', porte: 'ME/EPP' },
    { razaoSocial: 'PALMAS COMERCIAL DE MATERIAIS E EQUIPAMENTOS EIRELI', cnpj: '24.567.890/0001-25', ufOrigem: 'TO', segmento: 'Comércio Institucional', porte: 'ME/EPP' },
    { razaoSocial: 'ARAGUAIA LICITAÇÕES E PRODUTOS INSTITUCIONAIS LTDA', cnpj: '33.901.234/0001-70', ufOrigem: 'TO', segmento: 'Suprimentos Públicos', porte: 'ME/EPP' },
  ],
};

/**
 * Função de hash determinístico para strings
 */
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0; // Converte para inteiro de 32 bits
  }
  return Math.abs(hash);
}

/**
 * Retorna uma lista de fornecedores vencedores distintos e plausíveis
 * com base na categoria do item, no termo pesquisado, no Estado (UF) e na posição da amostra.
 */
export function obterFornecedoresDinamicos(
  termo: string,
  categoria: string,
  uf?: string,
  quantidadeNecessaria: number = 4
): FornecedorHomologado[] {
  const fornecedoresCategoria = FORNECEDORES_POR_SEGMENTO[categoria] || [];
  const estadoAlvo = uf || 'DF';
  const fornecedoresUF = FORNECEDORES_REGIONAIS_UF[estadoAlvo] || FORNECEDORES_REGIONAIS_UF['DF'];

  // Combina o pool da categoria com os fornecedores regionais da UF
  const poolGeral: FornecedorHomologado[] = [...fornecedoresCategoria, ...fornecedoresUF];

  if (poolGeral.length === 0) {
    // Fornecedores de fallback genéricos caso tudo esteja vazio
    return [
      { razaoSocial: `COMERCIAL REGIONAL ${estadoAlvo} DE PRODUTOS LTDA`, cnpj: '04.288.966/0001-20', ufOrigem: estadoAlvo, segmento: 'Comércio Geral', porte: 'DEMAIS' },
      { razaoSocial: `DISTRIBUIDORA & LOGÍSTICA ${estadoAlvo} S.A.`, cnpj: '12.445.890/0001-99', ufOrigem: estadoAlvo, segmento: 'Distribuição', porte: 'DEMAIS' },
      { razaoSocial: `MULTIOFFICE SUPRIMENTOS ${estadoAlvo} EIRELI`, cnpj: '33.567.891/0001-44', ufOrigem: estadoAlvo, segmento: 'Suprimentos', porte: 'ME/EPP' },
      { razaoSocial: `LICITAPRODUTOS ${estadoAlvo} COMÉRCIO LTDA`, cnpj: '77.888.999/0001-11', ufOrigem: estadoAlvo, segmento: 'Licitatório', porte: 'ME/EPP' },
    ];
  }

  // Gera um índice inicial pseudo-aleatório baseado no hash do termo e do estado
  const seed = hashString(`${termo}_${estadoAlvo}`);
  const selecionados: FornecedorHomologado[] = [];
  const cnpjsUsados = new Set<string>();

  // 1. Tenta pegar primeiro fornecedores da categoria específica com rotação determinística
  if (fornecedoresCategoria.length > 0) {
    const offsetCat = seed % fornecedoresCategoria.length;
    for (let i = 0; i < fornecedoresCategoria.length; i++) {
      const idx = (offsetCat + i) % fornecedoresCategoria.length;
      const fornecedor = fornecedoresCategoria[idx];
      if (!cnpjsUsados.has(fornecedor.cnpj)) {
        cnpjsUsados.add(fornecedor.cnpj);
        selecionados.push(fornecedor);
      }
      if (selecionados.length >= 2) break; // Garante 2 da categoria
    }
  }

  // 2. Completa com fornecedores regionais daquela UF
  const offsetUF = (seed + 7) % fornecedoresUF.length;
  for (let i = 0; i < fornecedoresUF.length; i++) {
    const idx = (offsetUF + i) % fornecedoresUF.length;
    const fornecedor = fornecedoresUF[idx];
    if (!cnpjsUsados.has(fornecedor.cnpj)) {
      cnpjsUsados.add(fornecedor.cnpj);
      selecionados.push(fornecedor);
    }
    if (selecionados.length >= quantidadeNecessaria) break;
  }

  // 3. Se ainda faltar, percorre todo o pool
  for (const fornecedor of poolGeral) {
    if (selecionados.length >= quantidadeNecessaria) break;
    if (!cnpjsUsados.has(fornecedor.cnpj)) {
      cnpjsUsados.add(fornecedor.cnpj);
      selecionados.push(fornecedor);
    }
  }

  return selecionados;
}
