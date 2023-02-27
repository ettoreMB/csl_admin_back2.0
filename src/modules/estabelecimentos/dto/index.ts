export interface IEstabelecimentoSOADTO {
  Documento?: string
  RazaoSocial?: string
  NomeFantasia?: string
  DataFundacao?: string
  MatrizFilial?: string
  Capital?: string
  CodigoAtividadeEconomica?: string
  CodigoAtividadeEconomicaDescricao?: string
  CodigoNaturezaJuridica?: string
  CodigoNaturezaJuridicaDescricao?: string
  SituacaoRFB?: string
  DataSituacaoRFB?: string
  DataConsultaRFB?: string
  MotivoSituacaoRFB?: string
  DataMotivoEspecialSituacaoRFB?: string
  CNAES?: []
  Enderecos?: {
    Tipo?: number
    Logradouro?: string
    Numero?: string
    Complemento?: string
    Bairro?: string
    Cidade?: string
    Estado?: string
    CEP?: string
    GeoLocalizacao?: []
    DataAtualizacao?: Date
    CodigoIBGE?: number
  }
  Mensagem?: string
  Transacao?: {
    Status?: boolean
    CodigoStatus?: string
    CodigoStatusDescricao?: string
  }
}
