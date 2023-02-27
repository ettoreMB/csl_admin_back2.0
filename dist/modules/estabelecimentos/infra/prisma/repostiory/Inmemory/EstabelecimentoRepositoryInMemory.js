"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/modules/estabelecimentos/infra/prisma/repostiory/Inmemory/EstabelecimentoRepositoryInMemory.ts
var EstabelecimentoRepositoryInMemory_exports = {};
__export(EstabelecimentoRepositoryInMemory_exports, {
  EstabelecimentoRepositoryInMemory: () => EstabelecimentoRepositoryInMemory
});
module.exports = __toCommonJS(EstabelecimentoRepositoryInMemory_exports);
var estabelecimentosData = [
  {
    CNPJ: 5371944796,
    CNES: "0000000",
    RAZAO_SOCIAL: "REJANE CELESTE DOS ANJOS BECKER",
    NOME_FANTASIA: "REJANE CELESTE DOS ANJOS BECKER",
    ID_GRUPO_ESTABELECIMENTO: 2,
    LOGRADOURO: null,
    NUMERO: null,
    COMPLEMENTO: null,
    BAIRRO: null,
    CEP: "00000000",
    COD_MUNICIPIO: "3304557",
    COD_NATUREZA: 1e3,
    EMAIL_REPRESENTANTE_DEMANDA: "romeu.soares@cslbehring.com",
    TARGET_DEMANDA: false,
    EMAIL_REPRESENTANTE_VENDA: "orfao@orfao",
    TARGET_VENDA: false,
    DATA_INCLUSAO: "2023-01-16T00:00:00.000Z",
    DATA_ATUALIZACAO: "2023-01-16T00:00:00.000Z"
  }
];
var EstabelecimentoRepositoryInMemory = class {
  findByCNPJ(cnpj) {
    return estabelecimentosData.find((est) => String(est.CNPJ) === cnpj);
  }
  getAll() {
    const estabelecimentos = estabelecimentosData;
    return estabelecimentos;
  }
  getSetorizacaoByEmail(email) {
  }
  edit({ cnpj, cnes, nomeFantasia, razaoSocial }) {
    return { cnpj, cnes, nomeFantasia, razaoSocial };
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  EstabelecimentoRepositoryInMemory
});
