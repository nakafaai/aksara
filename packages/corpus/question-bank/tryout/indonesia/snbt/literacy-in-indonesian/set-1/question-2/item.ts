import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Lingkungan mendapat kesempatan untuk memulihkan diri",
        },
        {
          isCorrect: false,
          label: "Bumi akan kembali persis seperti pada masa lampau",
        },
        {
          isCorrect: false,
          label: "Seluruh bentuk polusi udara akan hilang",
        },
        {
          isCorrect: false,
          label: "Kehidupan baru pasti tercipta tanpa campur tangan manusia",
        },
        {
          isCorrect: false,
          label: "Keadaan Bumi akan menjadi tidak terkendali",
        },
      ],
    },
  },
};

export default item;
