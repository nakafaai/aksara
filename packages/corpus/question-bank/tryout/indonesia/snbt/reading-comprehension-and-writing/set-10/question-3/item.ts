import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Pengamatan awal membuktikan bahwa pengelompokan bahan menyebabkan perbedaan.",
        },
        {
          isCorrect: false,
          label:
            "Tim perlu mengubah beberapa unsur kelas sekaligus sebelum mengukur ulang.",
        },
        {
          isCorrect: false,
          label: "Pola awal membenarkan pengelompokan bahan secara permanen.",
        },
        {
          isCorrect: true,
          label:
            "Oleh karena itu, dugaan tersebut perlu diuji dengan mengelompokkan bahan menurut tahap resep.",
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
