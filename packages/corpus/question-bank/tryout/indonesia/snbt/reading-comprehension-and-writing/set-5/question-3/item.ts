import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Data awal membuktikan bahwa contoh foto menyebabkan perbedaan kesepakatan.",
        },
        {
          isCorrect: false,
          label:
            "Tim perlu mengubah beberapa unsur pendataan sekaligus sebelum mengukur ulang.",
        },
        {
          isCorrect: false,
          label: "Pola awal membenarkan penerapan permanen contoh foto.",
        },
        {
          isCorrect: true,
          label:
            "Oleh karena itu, hipotesis tersebut perlu diuji dengan menambahkan contoh foto untuk setiap kategori kondisi.",
        },
        {
          isCorrect: false,
          label:
            "Ketidakpastian yang tersisa membuat perbandingan lanjutan tidak diperlukan.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
