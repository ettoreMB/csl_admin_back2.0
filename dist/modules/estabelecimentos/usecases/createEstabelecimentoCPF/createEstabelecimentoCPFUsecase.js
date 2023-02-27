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
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/modules/estabelecimentos/usecases/createEstabelecimentoCPF/createEstabelecimentoCPFUsecase.ts
var createEstabelecimentoCPFUsecase_exports = {};
__export(createEstabelecimentoCPFUsecase_exports, {
  CreateEstabelecimentoCPFUsecase: () => CreateEstabelecimentoCPFUsecase
});
module.exports = __toCommonJS(createEstabelecimentoCPFUsecase_exports);

// src/shared/errors/AppErros.ts
var AppError = class {
  constructor(message, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
};

// src/modules/estabelecimentos/usecases/createEstabelecimentoCPF/createEstabelecimentoCPFUsecase.ts
var CreateEstabelecimentoCPFUsecase = class {
  constructor(estabelecimentoRepository) {
    this.estabelecimentoRepository = estabelecimentoRepository;
    this.estabelecimentoRepository = estabelecimentoRepository;
  }
  execute(cnpj, name) {
    return __async(this, null, function* () {
      const filteredCNPJ = cnpj.replace(/\D+/g, "");
      const estabelecimento = yield this.estabelecimentoRepository.findByCNPJ(
        filteredCNPJ
      );
      if (estabelecimento) {
        throw new AppError("Estabelecimento J\xE1 cadastrado");
      }
      try {
        yield this.estabelecimentoRepository.createCPF(filteredCNPJ, name);
      } catch (error) {
        console.log(error);
        throw new AppError("Erro ao cadastrar no banco");
      }
      return "deu certo";
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CreateEstabelecimentoCPFUsecase
});
