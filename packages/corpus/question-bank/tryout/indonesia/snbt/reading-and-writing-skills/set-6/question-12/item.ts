import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "pada Senin, tim menguji contoh pencatatan waktu pada formulir kebisingan.",
        },
        {
          isCorrect: true,
          label:
            "Pada Senin, tim menguji contoh pencatatan waktu pada formulir kebisingan.",
        },
        {
          isCorrect: false,
          label:
            "Pada senin, tim menguji contoh pencatatan waktu pada formulir kebisingan.",
        },
        {
          isCorrect: false,
          label:
            "Pada Senin, Tim menguji contoh pencatatan waktu pada formulir kebisingan.",
        },
        {
          isCorrect: false,
          label:
            "Pada Senin tim menguji contoh pencatatan waktu pada formulir kebisingan",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
