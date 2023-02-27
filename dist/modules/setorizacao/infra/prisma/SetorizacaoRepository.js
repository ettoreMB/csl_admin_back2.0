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

// src/modules/setorizacao/infra/prisma/SetorizacaoRepository.ts
var SetorizacaoRepository_exports = {};
__export(SetorizacaoRepository_exports, {
  SetorizacaoRepository: () => SetorizacaoRepository
});
module.exports = __toCommonJS(SetorizacaoRepository_exports);

// src/db/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient({
  log: ["error", "warn"]
});

// src/modules/setorizacao/infra/prisma/SetorizacaoRepository.ts
var SetorizacaoRepository = class {
  findByemail(email) {
    return __async(this, null, function* () {
      const emailRep = yield prisma.tBL_FV_REPRESENTANTES_DEMANDA.findFirst({
        where: {
          EMAIL_REPRESENTANTE_DEMANDA: email
        },
        select: {
          EMAIL_REPRESENTANTE_DEMANDA: true
        }
      });
      return emailRep;
    });
  }
  getEmails() {
    return __async(this, null, function* () {
      const emails = yield prisma.tBL_FV_REPRESENTANTES_DEMANDA.groupBy({
        by: ["EMAIL_REPRESENTANTE_DEMANDA"]
      });
      return emails;
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SetorizacaoRepository
});
