import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Data awal telah membuktikan bahwa label lokasi menyebabkan perbedaan.",
        },
        {
          isCorrect: false,
          label:
            "Tim perlu mengubah beberapa unsur pembagian bibit sekaligus sebelum mengukur ulang.",
        },
        {
          isCorrect: true,
          label:
            "Oleh karena itu, dugaan tentang kegunaan label lokasi perlu diuji pada setiap baki bibit.",
        },
        {
          isCorrect: false,
          label:
            "Pola awal membenarkan penggunaan label lokasi secara permanen.",
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
