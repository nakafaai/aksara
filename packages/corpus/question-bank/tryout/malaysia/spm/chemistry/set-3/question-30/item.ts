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
            "X is ethene, and it releases $$0.24\\text{ dm}^3$$ of gas with the calcium carbonate",
        },
        {
          correct: true,
          label:
            "X is ethanoic acid, $$4.5\\text{ g}$$ of it forms, and it releases $$0.24\\text{ dm}^3$$ of carbon dioxide with the calcium carbonate",
        },
        {
          correct: false,
          label:
            "X is ethanoic acid, $$4.5\\text{ g}$$ of it forms, and it releases $$0.90\\text{ dm}^3$$ of carbon dioxide with the calcium carbonate",
        },
        {
          correct: false,
          label: "X is ethyl ethanoate, and $$4.5\\text{ g}$$ of it forms",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "X ialah etena, dan ia membebaskan $$0.24\\text{ dm}^3$$ gas dengan kalsium karbonat",
        },
        {
          correct: true,
          label:
            "X ialah asid etanoik, $$4.5\\text{ g}$$ daripadanya terbentuk, dan ia membebaskan $$0.24\\text{ dm}^3$$ karbon dioksida dengan kalsium karbonat",
        },
        {
          correct: false,
          label:
            "X ialah asid etanoik, $$4.5\\text{ g}$$ daripadanya terbentuk, dan ia membebaskan $$0.90\\text{ dm}^3$$ karbon dioksida dengan kalsium karbonat",
        },
        {
          correct: false,
          label:
            "X ialah etil etanoat, dan $$4.5\\text{ g}$$ daripadanya terbentuk",
        },
      ],
    },
  },
};

export default item;
