import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "pada Senin, tim menguji formulir dengan pilihan lokasi terstruktur.",
        },
        {
          isCorrect: false,
          label:
            "Pada senin, tim menguji formulir dengan pilihan lokasi terstruktur.",
        },
        {
          isCorrect: false,
          label:
            "Pada Senin, Tim menguji formulir dengan pilihan lokasi terstruktur.",
        },
        {
          isCorrect: true,
          label:
            "Pada Senin, tim menguji formulir dengan pilihan lokasi terstruktur.",
        },
        {
          isCorrect: false,
          label:
            "Pada Senin tim menguji formulir dengan pilihan lokasi terstruktur",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
