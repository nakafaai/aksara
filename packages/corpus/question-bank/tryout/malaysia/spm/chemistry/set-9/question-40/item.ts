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
          label: "Ethanoic anhydride, $$50.0\\%$$, $$9$$ tablets",
        },
        { correct: true, label: "Salicylic acid, $$75.0\\%$$, $$9$$ tablets" },
        { correct: false, label: "Salicylic acid, $$80.0\\%$$, $$9$$ tablets" },
        {
          correct: false,
          label: "Salicylic acid, $$75.0\\%$$, $$12$$ tablets",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Anhidrida etanoik, $$50.0\\%$$, $$9$$ tablet",
        },
        { correct: true, label: "Asid salisilik, $$75.0\\%$$, $$9$$ tablet" },
        { correct: false, label: "Asid salisilik, $$80.0\\%$$, $$9$$ tablet" },
        { correct: false, label: "Asid salisilik, $$75.0\\%$$, $$12$$ tablet" },
      ],
    },
  },
};

export default item;
