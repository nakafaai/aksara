import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Data awal membuktikan bahwa contoh foto menyebabkan perbedaan kesepakatan.",
        },
        {
          correct: false,
          label:
            "Tim perlu mengubah beberapa unsur pendataan sekaligus sebelum mengukur ulang.",
        },
        {
          correct: false,
          label: "Pola awal membenarkan penerapan permanen contoh foto.",
        },
        {
          correct: true,
          label:
            "Oleh karena itu, hipotesis tersebut perlu diuji dengan menambahkan contoh foto untuk setiap kategori kondisi.",
        },
        {
          correct: false,
          label:
            "Ketidakpastian yang tersisa membuat perbandingan lanjutan tidak diperlukan.",
        },
      ],
    },
  },
  stimulus: "passage-1",
};

export default item;
