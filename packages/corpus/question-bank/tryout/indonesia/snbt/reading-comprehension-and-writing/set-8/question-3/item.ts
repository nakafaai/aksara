import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Data awal telah membuktikan bahwa kartu pertanyaan menyebabkan perbedaan.",
        },
        {
          isCorrect: false,
          label:
            "Tim perlu mengubah beberapa unsur tur sekaligus sebelum mengukur ulang.",
        },
        {
          isCorrect: true,
          label:
            "Oleh karena itu, dugaan tentang kegunaan kartu pertanyaan perlu diuji pada setiap meja demonstrasi.",
        },
        {
          isCorrect: false,
          label:
            "Pola awal membenarkan penggunaan kartu pertanyaan secara permanen.",
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
