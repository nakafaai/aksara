import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
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
            "0.150 g of benzoic acid, 455 mg per kg, so the drink is within the limit",
        },
        {
          correct: false,
          label:
            "0.127 g of benzoic acid, 1270 mg per kg, so the drink is over the limit",
        },
        {
          correct: false,
          label:
            "0.150 g of benzoic acid, 1500 mg per kg, so the drink is over the limit",
        },
        {
          correct: true,
          label:
            "0.127 g of benzoic acid, about 385 mg per kg, so the drink is within the limit",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "0.150 g asid benzoik, 455 mg per kg, jadi minuman itu dalam had",
        },
        {
          correct: false,
          label:
            "0.127 g asid benzoik, 1270 mg per kg, jadi minuman itu melebihi had",
        },
        {
          correct: false,
          label:
            "0.150 g asid benzoik, 1500 mg per kg, jadi minuman itu melebihi had",
        },
        {
          correct: true,
          label:
            "0.127 g asid benzoik, kira-kira 385 mg per kg, jadi minuman itu dalam had",
        },
      ],
    },
  },
};

export default item;
