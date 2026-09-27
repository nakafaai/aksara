import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Pengamatan awal membuktikan bahwa label foto menyebabkan perbedaan hasil.",
        },
        {
          isCorrect: false,
          label:
            "Tim perlu mengubah beberapa unsur layanan sekaligus sebelum mengukur ulang.",
        },
        {
          isCorrect: false,
          label: "Pola awal membenarkan penerapan permanen label foto.",
        },
        {
          isCorrect: false,
          label:
            "Ketidakpastian yang tersisa membuat perbandingan lanjutan tidak diperlukan.",
        },
        {
          isCorrect: true,
          label:
            "Oleh karena itu, hipotesis tersebut perlu diuji dengan menambahkan label foto pada rak.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
