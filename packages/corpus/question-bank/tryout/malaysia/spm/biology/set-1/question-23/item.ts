import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "nutrition-in-plants",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "At 1 unit: light intensity; at 5 units: light intensity",
        },
        {
          correct: false,
          label:
            "At 1 unit: $$\\text{CO}_2$$ concentration; at 5 units: temperature",
        },
        {
          correct: true,
          label: "At 1 unit: light intensity; at 5 units: temperature",
        },
        {
          correct: false,
          label:
            "At 1 unit: temperature; at 5 units: $$\\text{CO}_2$$ concentration",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Pada 1 unit: keamatan cahaya; pada 5 unit: keamatan cahaya",
        },
        {
          correct: false,
          label: "Pada 1 unit: kepekatan $$\\text{CO}_2$$; pada 5 unit: suhu",
        },
        {
          correct: true,
          label: "Pada 1 unit: keamatan cahaya; pada 5 unit: suhu",
        },
        {
          correct: false,
          label: "Pada 1 unit: suhu; pada 5 unit: kepekatan $$\\text{CO}_2$$",
        },
      ],
    },
  },
};

export default item;
