import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Pemakaian melebihi batas dan aliran listrik tidak terputus",
        },
        {
          isCorrect: false,
          label: "Pemakaian melebihi batas dan aliran listrik terputus",
        },
        {
          isCorrect: false,
          label:
            "Jika aliran listrik tidak terputus, pemakaian tidak melebihi batas",
        },
        {
          isCorrect: false,
          label: "Pemakaian tidak melebihi batas atau aliran listrik terputus",
        },
        {
          isCorrect: false,
          label:
            "Tidak benar bahwa pemakaian melebihi batas sementara listrik tetap menyala",
        },
      ],
    },
  },
};

export default item;
