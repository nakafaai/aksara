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
            "Setiap kali bola memantul, tinggi pantulan berikutnya berkurang $$40\\text{ cm}$$ dari tinggi pantulan sebelumnya.",
        },
        {
          isCorrect: true,
          label: "Tinggi pantulan pertama bola adalah $$120\\text{ cm}$$.",
        },
        {
          isCorrect: false,
          label:
            "Bola menempuh jarak $$4{,}375\\text{ m}$$ sejak dijatuhkan sampai menyentuh lantai untuk keempat kalinya.",
        },
        {
          isCorrect: true,
          label:
            "Pantulan pertama yang tingginya kurang dari $$40\\text{ cm}$$ adalah pantulan ke-$$5$$.",
        },
        {
          isCorrect: true,
          label:
            "Bola menempuh jarak $$7{,}15\\text{ m}$$ sejak dijatuhkan sampai menyentuh lantai untuk keempat kalinya.",
        },
      ],
    },
  },
};

export default item;
