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
          correct: true,
          label:
            "1.2 dm³ of hydrogen, with nickel as the catalyst, to give ethane",
        },
        {
          correct: false,
          label:
            "2.4 dm³ of hydrogen, with nickel as the catalyst, to give ethane",
        },
        {
          correct: false,
          label:
            "1.2 dm³ of hydrogen, with nickel as the catalyst, to give ethanol",
        },
        {
          correct: false,
          label:
            "0.6 dm³ of hydrogen, with nickel as the catalyst, to give ethane",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "1.2 dm³ hidrogen, dengan nikel sebagai mangkin, untuk menghasilkan etana",
        },
        {
          correct: false,
          label:
            "2.4 dm³ hidrogen, dengan nikel sebagai mangkin, untuk menghasilkan etana",
        },
        {
          correct: false,
          label:
            "1.2 dm³ hidrogen, dengan nikel sebagai mangkin, untuk menghasilkan etanol",
        },
        {
          correct: false,
          label:
            "0.6 dm³ hidrogen, dengan nikel sebagai mangkin, untuk menghasilkan etana",
        },
      ],
    },
  },
};

export default item;
