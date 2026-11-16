import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "manufactured-substances-in-industry",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "3.69 dm³ of hydrogen forms, because all 10.0 g of the brass reacts",
        },
        {
          correct: false,
          label: "1.11 dm³ of hydrogen forms, and 3.0 g of solid is left",
        },
        {
          correct: true,
          label:
            "1.11 dm³ of hydrogen forms, and 7.0 g of copper is left unreacted",
        },
        {
          correct: false,
          label:
            "2.22 dm³ of hydrogen forms, because each zinc atom gives two hydrogen atoms",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "3.69 dm³ hidrogen terbentuk, kerana kesemua 10.0 g loyang bertindak balas",
        },
        {
          correct: false,
          label: "1.11 dm³ hidrogen terbentuk, dan 3.0 g pepejal berbaki",
        },
        {
          correct: true,
          label:
            "1.11 dm³ hidrogen terbentuk, dan 7.0 g kuprum berbaki tanpa bertindak balas",
        },
        {
          correct: false,
          label:
            "2.22 dm³ hidrogen terbentuk, kerana setiap atom zink memberikan dua atom hidrogen",
        },
      ],
    },
  },
};

export default item;
