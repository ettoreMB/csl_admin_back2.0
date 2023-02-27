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

// src/modules/estabelecimentos/usecases/editEstabelecimento/editEstabelecimentoUsecase.ts
var editEstabelecimentoUsecase_exports = {};
__export(editEstabelecimentoUsecase_exports, {
  EditEstabelecimentoUsecase: () => EditEstabelecimentoUsecase
});
module.exports = __toCommonJS(editEstabelecimentoUsecase_exports);

// src/shared/errors/AppErros.ts
var AppError = class {
  constructor(message, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
};

// src/modules/estabelecimentos/usecases/editEstabelecimento/editEstabelecimentoUsecase.ts
var EditEstabelecimentoUsecase = class {
  constructor(estabelecimentoRepository) {
    this.estabelecimentoRepository = estabelecimentoRepository;
    this.estabelecimentoRepository = estabelecimentoRepository;
  }
  execute(_0) {
    return __async(this, arguments, function* ({
      cnpj,
      razaoSocial,
      nomeFantasia,
      cnes
    }) {
      const estabelecimento = yield this.estabelecimentoRepository.findByCNPJ(
        cnpj
      );
      if (!estabelecimento) {
        throw new AppError("Estabelecimento  nao encontrado", 404);
      }
      yield this.estabelecimentoRepository.edit({
        cnpj: String(estabelecimento.CNPJ),
        razaoSocial,
        nomeFantasia,
        cnes
      });
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  EditEstabelecimentoUsecase
});
