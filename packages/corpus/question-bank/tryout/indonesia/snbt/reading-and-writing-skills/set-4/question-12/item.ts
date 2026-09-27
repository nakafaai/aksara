import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "pada Senin, tim menguji tanda genre di setiap meja pasar tukar buku.",
        },
        {
          isCorrect: false,
          label:
            "Pada senin, tim menguji tanda genre di setiap meja pasar tukar buku.",
        },
        {
          isCorrect: true,
          label:
            "Pada Senin, tim menguji tanda genre di setiap meja pasar tukar buku.",
        },
        {
          isCorrect: false,
          label:
            "Pada Senin, Tim menguji tanda genre di setiap meja pasar tukar buku.",
        },
        {
          isCorrect: false,
          label:
            "Pada Senin tim menguji tanda genre di setiap meja pasar tukar buku",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
