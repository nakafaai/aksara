import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "kerjasama tim dalam uji peta dengan waktu tempuh",
        },
        {
          isCorrect: true,
          label: "kerja sama tim dalam uji peta dengan waktu tempuh",
        },
        {
          isCorrect: false,
          label: "kerja-sama tim dalam uji peta dengan waktu tempuh",
        },
        {
          isCorrect: false,
          label: "kerja samah tim dalam uji peta dengan waktu tempuh",
        },
        {
          isCorrect: false,
          label: "kerja sama-sama tim dalam uji peta dengan waktu tempuh",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
