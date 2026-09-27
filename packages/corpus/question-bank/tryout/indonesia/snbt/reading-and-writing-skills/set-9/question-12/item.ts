import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "pada Senin, tim menguji jadwal digital setelah pembatalan.",
        },
        {
          isCorrect: true,
          label: "Pada Senin, tim menguji jadwal digital setelah pembatalan.",
        },
        {
          isCorrect: false,
          label: "Pada senin, tim menguji jadwal digital setelah pembatalan.",
        },
        {
          isCorrect: false,
          label: "Pada Senin, Tim menguji jadwal digital setelah pembatalan.",
        },
        {
          isCorrect: false,
          label: "Pada Senin tim menguji jadwal digital setelah pembatalan",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
