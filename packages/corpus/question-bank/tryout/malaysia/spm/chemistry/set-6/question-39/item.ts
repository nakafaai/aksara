import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "consumer-and-industrial-chemistry",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$0.145\\text{ g}$$, it turns tooth enamel into fluorapatite, which resists acid",
        },
        {
          correct: true,
          label:
            "$$1.10\\text{ g}$$, it turns tooth enamel into fluorapatite, which resists acid",
        },
        {
          correct: false,
          label:
            "$$11.0\\text{ g}$$, it turns tooth enamel into fluorapatite, which resists acid",
        },
        {
          correct: false,
          label:
            "$$1.10\\text{ g}$$, it neutralises acid in the mouth the way an antacid does",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$0.145\\text{ g}$$, ia menukar enamel gigi kepada fluorapatit yang tahan asid",
        },
        {
          correct: true,
          label:
            "$$1.10\\text{ g}$$, ia menukar enamel gigi kepada fluorapatit yang tahan asid",
        },
        {
          correct: false,
          label:
            "$$11.0\\text{ g}$$, ia menukar enamel gigi kepada fluorapatit yang tahan asid",
        },
        {
          correct: false,
          label:
            "$$1.10\\text{ g}$$, ia meneutralkan asid dalam mulut seperti antasid",
        },
      ],
    },
  },
};

export default item;
