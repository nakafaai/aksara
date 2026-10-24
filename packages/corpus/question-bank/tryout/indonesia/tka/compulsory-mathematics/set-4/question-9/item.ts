import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "algebra",
    topic: "sequences-series",
  },
  responses: {
    id: {
      kind: "multiple-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Pada gelombang ke-$$2$$ ada $$6$$ orang yang baru mengetahui kabar itu.",
        },
        {
          isCorrect: true,
          label:
            "Setelah $$3$$ gelombang, ada $$40$$ orang yang mengetahui kabar itu, termasuk orang pertama.",
        },
        {
          isCorrect: true,
          label:
            "Setelah $$4$$ gelombang, jumlah orang yang mengetahui kabar itu lebih dari $$120$$ orang.",
        },
        {
          isCorrect: false,
          label:
            "Pada gelombang ke-$$4$$ ada $$64$$ orang yang baru mengetahui kabar itu.",
        },
        {
          isCorrect: true,
          label:
            "Jumlah orang yang baru pada gelombang ke-$$3$$ adalah tiga kali jumlah orang yang baru pada gelombang ke-$$2$$.",
        },
      ],
    },
  },
};

export default item;
