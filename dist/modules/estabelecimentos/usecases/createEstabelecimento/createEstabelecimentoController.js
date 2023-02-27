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

// src/modules/estabelecimentos/usecases/createEstabelecimento/createEstabelecimentoController.ts
var createEstabelecimentoController_exports = {};
__export(createEstabelecimentoController_exports, {
  CreateEstabelecimentoController: () => CreateEstabelecimentoController
});
module.exports = __toCommonJS(createEstabelecimentoController_exports);
var import_zod = require("zod");
var CreateEstabelecimentoController = class {
  handle(req, res) {
    return __async(this, null, function* () {
      const reqParams = import_zod.z.object({
        cnpj: import_zod.z.string()
      });
      const { cnpj } = reqParams.parse(req.body);
      const createEstabelecimentoUseCase = req.diScope.resolve(
        "createEstabelecimentoUsecase"
      );
      yield createEstabelecimentoUseCase.execute(cnpj);
      console.log(cnpj);
      return res.status(200).send("Estabelecimento Criado Com sucesso");
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CreateEstabelecimentoController
});
