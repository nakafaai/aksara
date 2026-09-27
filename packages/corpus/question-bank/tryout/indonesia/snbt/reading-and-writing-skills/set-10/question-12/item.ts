import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "pada Senin, tim menguji peta kecil dengan waktu tempuh di taman kota.",
        },
        {
          isCorrect: false,
          label:
            "Pada senin, tim menguji peta kecil dengan waktu tempuh di taman kota.",
        },
        {
          isCorrect: true,
          label:
            "Pada Senin, tim menguji peta kecil dengan waktu tempuh di taman kota.",
        },
        {
          isCorrect: false,
          label:
            "Pada Senin, Tim menguji peta kecil dengan waktu tempuh di taman kota.",
        },
        {
          isCorrect: false,
          label:
            "Pada Senin tim menguji peta kecil dengan waktu tempuh di taman kota",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
