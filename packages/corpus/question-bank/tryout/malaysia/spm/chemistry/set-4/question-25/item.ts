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
            "A yield of $$90\\%$$, using $$192\\text{ m}^3$$ of carbon monoxide",
        },
        {
          correct: false,
          label:
            "A yield of $$72\\%$$, using $$576\\text{ m}^3$$ of carbon monoxide",
        },
        {
          correct: true,
          label:
            "A yield of $$90\\%$$, using $$576\\text{ m}^3$$ of carbon monoxide",
        },
        {
          correct: false,
          label:
            "A yield of $$90\\%$$, using $$384\\text{ m}^3$$ of carbon monoxide",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Peratus hasil $$90\\%$$, menggunakan $$192\\text{ m}^3$$ karbon monoksida",
        },
        {
          correct: false,
          label:
            "Peratus hasil $$72\\%$$, menggunakan $$576\\text{ m}^3$$ karbon monoksida",
        },
        {
          correct: true,
          label:
            "Peratus hasil $$90\\%$$, menggunakan $$576\\text{ m}^3$$ karbon monoksida",
        },
        {
          correct: false,
          label:
            "Peratus hasil $$90\\%$$, menggunakan $$384\\text{ m}^3$$ karbon monoksida",
        },
      ],
    },
  },
};

export default item;
