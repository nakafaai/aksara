import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Data awal membuktikan bahwa pemesanan sehari sebelumnya menyebabkan perbedaan hasil.",
        },
        {
          isCorrect: true,
          label:
            "Oleh karena itu, hipotesis tersebut perlu diuji melalui pemesanan menu sehari sebelumnya.",
        },
        {
          isCorrect: false,
          label:
            "Tim perlu mengubah beberapa unsur program sarapan sekaligus sebelum mengukur ulang.",
        },
        {
          isCorrect: false,
          label:
            "Pola awal membenarkan pemesanan sehari sebelumnya secara permanen.",
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
