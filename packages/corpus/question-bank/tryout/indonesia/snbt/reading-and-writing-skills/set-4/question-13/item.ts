import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "kerja sama tim dalam uji tanda genre",
        },
        {
          isCorrect: false,
          label: "kerjasama tim dalam uji tanda genre",
        },
        {
          isCorrect: false,
          label: "kerja-sama tim dalam uji tanda genre",
        },
        {
          isCorrect: false,
          label: "kerja samah tim dalam uji tanda genre",
        },
        {
          isCorrect: false,
          label: "kerja sama-sama tim dalam uji tanda genre",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
