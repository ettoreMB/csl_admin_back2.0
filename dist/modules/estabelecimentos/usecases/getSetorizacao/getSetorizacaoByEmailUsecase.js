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

// src/modules/estabelecimentos/usecases/getSetorizacao/getSetorizacaoByEmailUsecase.ts
var getSetorizacaoByEmailUsecase_exports = {};
__export(getSetorizacaoByEmailUsecase_exports, {
  GetSetorizacaoByEmailUsecase: () => GetSetorizacaoByEmailUsecase
});
module.exports = __toCommonJS(getSetorizacaoByEmailUsecase_exports);

// src/shared/errors/AppErros.ts
var AppError = class {
  constructor(message, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
};

// src/modules/estabelecimentos/usecases/getSetorizacao/getSetorizacaoByEmailUsecase.ts
var GetSetorizacaoByEmailUsecase = class {
  constructor(estabelecimetosRepository, setorizacaoRepository) {
    this.estabelecimetosRepository = estabelecimetosRepository;
    this.setorizacaoRepository = setorizacaoRepository;
    this.estabelecimetosRepository = estabelecimetosRepository;
    this.setorizacaoRepository = setorizacaoRepository;
  }
  execute(email) {
    return __async(this, null, function* () {
      const emailExists = this.setorizacaoRepository.findByemail(email);
      if (!emailExists) {
        throw new AppError("Email n\xE3o existe na base de dados");
      }
      const estabelecimentosSetorizacao = this.estabelecimetosRepository.getSetorizacaoByEmail(email);
      return estabelecimentosSetorizacao;
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GetSetorizacaoByEmailUsecase
});
