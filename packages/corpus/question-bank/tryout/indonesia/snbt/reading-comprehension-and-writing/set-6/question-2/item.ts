import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "menyebabkan nilai awal menjadi lebih rendah",
        },
        {
          isCorrect: false,
          label: "menggantikan nilai pembanding dalam perhitungan",
        },
        {
          isCorrect: true,
          label: "memiliki nilai numerik yang lebih tinggi daripada",
        },
        {
          isCorrect: false,
          label: "berada di luar rentang yang boleh diukur",
        },
        {
          isCorrect: false,
          label: "membuktikan perubahan sebagai satu-satunya penyebab",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
