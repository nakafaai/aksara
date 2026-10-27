import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-1",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Pengamatan itu membuktikan bahwa simbol yang lebih kontras menyebabkan perbedaan.",
        },
        {
          correct: false,
          label:
            "Tim perlu mengubah beberapa unsur peta sekaligus sebelum mengukur ulang.",
        },
        {
          correct: false,
          label:
            "Pola awal itu sudah membenarkan penerapan permanen simbol yang lebih kontras.",
        },
        {
          correct: true,
          label:
            "Oleh karena itu, hipotesis tersebut perlu diuji dengan simbol titik kumpul yang lebih kontras.",
        },
        {
          correct: false,
          label:
            "Ketidakpastian yang tersisa membuat perbandingan lanjutan tidak diperlukan.",
        },
      ],
    },
  },
};

export default item;
