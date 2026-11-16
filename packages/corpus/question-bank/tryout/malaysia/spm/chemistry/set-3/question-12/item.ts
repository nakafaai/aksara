import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "chemical-bonds",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "P is magnesium oxide, Q is copper, R is hydrogen chloride and S is silicon dioxide",
        },
        {
          correct: true,
          label:
            "P is sodium chloride, Q is silicon dioxide, R is hydrogen chloride and S is copper",
        },
        {
          correct: false,
          label:
            "P is sodium chloride, Q is silicon dioxide, R is glucose and S is copper",
        },
        {
          correct: false,
          label:
            "P is copper, Q is silicon dioxide, R is hydrogen chloride and S is sodium chloride",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "P ialah magnesium oksida, Q ialah kuprum, R ialah hidrogen klorida dan S ialah silikon dioksida",
        },
        {
          correct: true,
          label:
            "P ialah natrium klorida, Q ialah silikon dioksida, R ialah hidrogen klorida dan S ialah kuprum",
        },
        {
          correct: false,
          label:
            "P ialah natrium klorida, Q ialah silikon dioksida, R ialah glukosa dan S ialah kuprum",
        },
        {
          correct: false,
          label:
            "P ialah kuprum, Q ialah silikon dioksida, R ialah hidrogen klorida dan S ialah natrium klorida",
        },
      ],
    },
  },
};

export default item;
