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

// src/routes/estabelecimentos.routes.ts
var estabelecimentos_routes_exports = {};
__export(estabelecimentos_routes_exports, {
  estabelecimentosRoutes: () => estabelecimentosRoutes
});
module.exports = __toCommonJS(estabelecimentos_routes_exports);
var import_zod6 = require("zod");

// src/modules/estabelecimentos/usecases/createEstabelecimento/createEstabelecimentoController.ts
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

// src/modules/estabelecimentos/usecases/createEstabelecimentoCPF/createEstabelecimentoCPFController.ts
var import_zod2 = require("zod");
var CreateEstabelecimentoCPFController = class {
  handle(req, res) {
    return __async(this, null, function* () {
      const reqParams = import_zod2.z.object({
        cnpj: import_zod2.z.string(),
        nome: import_zod2.z.string()
      });
      const { cnpj, nome } = reqParams.parse(req.body);
      const createEstabelecimentoCPFUseCase = req.diScope.resolve(
        "createEstabelecimentoCPFUsecase"
      );
      yield createEstabelecimentoCPFUseCase.execute(cnpj, nome);
      return res.status(200).send("Estabelecimento Criado Com sucesso");
    });
  }
};

// src/modules/estabelecimentos/usecases/editEstabelecimento/editEstabelecimentoController.ts
var import_zod3 = require("zod");
var EditEstabelecimentoController = class {
  handle(req, res) {
    return __async(this, null, function* () {
      const getReqParams = import_zod3.z.object({
        cnpj: import_zod3.z.string()
      });
      const getReqBody = import_zod3.z.object({
        razao_social: import_zod3.z.string(),
        nome_fantasia: import_zod3.z.string(),
        cnes: import_zod3.z.string()
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

// src/modules/estabelecimentos/usecases/getAllEstabelecimentos/getALLEstabelecimentosHandle.ts
var import_zod4 = require("zod");
var GetAllEstabelecimentosHandler = class {
  handle(request, reply) {
    return __async(this, null, function* () {
      const getAllEstabelecimentosUseCase = request.diScope.resolve(
        "getAllEstabelecimentosUsecase"
      );
      const reqParams = import_zod4.z.object({
        search: import_zod4.z.string().default("")
      });
      const { search } = reqParams.parse(request.query);
      const result = getAllEstabelecimentosUseCase.execute(search);
      return result;
    });
  }
};

// src/modules/estabelecimentos/usecases/getEstabelecimentoByCnpj/getEstabelecimentoByCnpjController.ts
var import_zod5 = require("zod");
var GetEstabelecimentoByCnpjController = class {
  handle(req, res) {
    return __async(this, null, function* () {
      const getReqParams = import_zod5.z.object({
        cnpj: import_zod5.z.string()
      });
      const { cnpj } = getReqParams.parse(req.params);
      const usecase = req.diScope.resolve("getEstabelecimentoByCnpjUsecase");
      const estabelecimento = yield usecase.execute(cnpj);
      return res.status(200).send(estabelecimento);
    });
  }
};

// src/routes/estabelecimentos.routes.ts
var getAllEstabelecimentosHandler = new GetAllEstabelecimentosHandler();
var editEstabelecimentoController = new EditEstabelecimentoController();
var createEstabelecimentoController = new CreateEstabelecimentoController();
var createEstabelecimentoCPFController = new CreateEstabelecimentoCPFController();
var getestabelecimentoByCnpjController = new GetEstabelecimentoByCnpjController();
function estabelecimentosRoutes(app) {
  return __async(this, null, function* () {
    app.put("/edit/:cnpj", editEstabelecimentoController.handle);
    app.get("/", getAllEstabelecimentosHandler.handle);
    app.post("/cnpj", createEstabelecimentoController.handle);
    app.post("/cpf", createEstabelecimentoCPFController.handle);
    app.get("/:cnpj", getestabelecimentoByCnpjController.handle);
    app.get("/setorizacao/:email", (request) => __async(this, null, function* () {
      const getEmailParams = import_zod6.z.object({
        email: import_zod6.z.string()
      });
      const { email } = getEmailParams.parse(request.params);
      const estabelecimentoRepository = request.diScope.resolve(
        "estabelecimentoRepository"
      );
      const setorizacao = yield estabelecimentoRepository.getSetorizacaoByEmail(
        email
      );
      return setorizacao;
    }));
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  estabelecimentosRoutes
});
