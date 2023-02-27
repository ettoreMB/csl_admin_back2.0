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

// src/modules/estabelecimentos/usecases/editEstabelecimento/editEstabelecimentoController.ts
var editEstabelecimentoController_exports = {};
__export(editEstabelecimentoController_exports, {
  EditEstabelecimentoController: () => EditEstabelecimentoController
});
module.exports = __toCommonJS(editEstabelecimentoController_exports);
var import_zod = require("zod");
var EditEstabelecimentoController = class {
  handle(req, res) {
    return __async(this, null, function* () {
      const getReqParams = import_zod.z.object({
        cnpj: import_zod.z.string()
      });
      const getReqBody = import_zod.z.object({
        razao_social: import_zod.z.string(),
        nome_fantasia: import_zod.z.string(),
        cnes: import_zod.z.string()
      });
      const { cnpj } = getReqParams.parse(req.params);
      const { cnes, nome_fantasia, razao_social } = getReqBody.parse(req.body);
      const editEstabelecimetoUseCase = req.diScope.resolve(
        "editEstabelecimentoUsecase"
      );
      yield editEstabelecimetoUseCase.execute({
        cnpj,
        cnes,
        nomeFantasia: nome_fantasia,
        razaoSocial: razao_social
      });
      return res.status(200).send("Estabelecimento editado com sucesso");
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  EditEstabelecimentoController
});
