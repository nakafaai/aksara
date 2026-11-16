import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "carbon-compounds",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "X is ethene, and it releases 1.8 dm³ of gas with excess calcium carbonate",
        },
        {
          correct: true,
          label:
            "X is ethanoic acid; 4.5 g of it forms, and it releases 0.90 dm³ of carbon dioxide with excess calcium carbonate",
        },
        {
          correct: false,
          label:
            "X is ethanoic acid; 4.5 g of it forms, and it releases 1.8 dm³ of carbon dioxide with excess calcium carbonate",
        },
        {
          correct: false,
          label: "X is ethyl ethanoate, and 4.5 g of it forms",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "X ialah etena, dan ia membebaskan 1.8 dm³ gas dengan kalsium karbonat berlebihan",
        },
        {
          correct: true,
          label:
            "X ialah asid etanoik; 4.5 g daripadanya terbentuk, dan ia membebaskan 0.90 dm³ karbon dioksida dengan kalsium karbonat berlebihan",
        },
        {
          correct: false,
          label:
            "X ialah asid etanoik; 4.5 g daripadanya terbentuk, dan ia membebaskan 1.8 dm³ karbon dioksida dengan kalsium karbonat berlebihan",
        },
        {
          correct: false,
          label: "X ialah etil etanoat, dan 4.5 g daripadanya terbentuk",
        },
      ],
    },
  },
};

export default item;
