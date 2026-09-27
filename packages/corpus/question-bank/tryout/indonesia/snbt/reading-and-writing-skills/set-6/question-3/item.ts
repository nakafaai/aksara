import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Oleh karena itu, hipotesis tersebut perlu diuji dengan memasang panah arah di persimpangan lorong.",
        },
        {
          isCorrect: false,
          label:
            "Pengamatan awal membuktikan bahwa panah menyebabkan perbedaan penyelesaian rute.",
        },
        {
          isCorrect: false,
          label:
            "Tim perlu mengubah beberapa unsur pameran sekaligus sebelum mengukur ulang.",
        },
        {
          isCorrect: false,
          label: "Pola awal membenarkan pemasangan panah secara permanen.",
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
