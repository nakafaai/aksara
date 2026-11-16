import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "redox-equilibrium",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$720\\text{ kg}$$, because cryolite lowers the melting point",
        },
        {
          correct: false,
          label:
            "$$360\\text{ kg}$$, because cryolite makes solid aluminium oxide conduct",
        },
        {
          correct: false,
          label:
            "$$480\\text{ kg}$$, because cryolite lowers the melting point",
        },
        {
          correct: true,
          label:
            "$$360\\text{ kg}$$, because cryolite lowers the melting point of the electrolyte",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$720\\text{ kg}$$, kerana kriolit merendahkan takat lebur",
        },
        {
          correct: false,
          label:
            "$$360\\text{ kg}$$, kerana kriolit menjadikan aluminium oksida pepejal mengkonduksi",
        },
        {
          correct: false,
          label: "$$480\\text{ kg}$$, kerana kriolit merendahkan takat lebur",
        },
        {
          correct: true,
          label:
            "$$360\\text{ kg}$$, kerana kriolit merendahkan takat lebur elektrolit",
        },
      ],
    },
  },
};

export default item;
