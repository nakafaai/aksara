import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-1",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Oleh karena itu, hipotesis tersebut perlu diuji dengan memasang panah arah di persimpangan lorong.",
        },
        {
          correct: false,
          label:
            "Pengamatan awal membuktikan bahwa panah menyebabkan perbedaan penyelesaian rute.",
        },
        {
          correct: false,
          label:
            "Tim perlu mengubah beberapa unsur pameran sekaligus sebelum mengukur ulang.",
        },
        {
          correct: false,
          label: "Pola awal membenarkan pemasangan panah secara permanen.",
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
