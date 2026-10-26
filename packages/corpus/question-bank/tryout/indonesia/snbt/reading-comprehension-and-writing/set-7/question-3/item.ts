import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Data awal membuktikan bahwa pemesanan sehari sebelumnya menyebabkan perbedaan hasil.",
        },
        {
          correct: true,
          label:
            "Oleh karena itu, hipotesis tersebut perlu diuji melalui pemesanan menu sehari sebelumnya.",
        },
        {
          correct: false,
          label:
            "Tim perlu mengubah beberapa unsur program sarapan sekaligus sebelum mengukur ulang.",
        },
        {
          correct: false,
          label:
            "Pola awal membenarkan pemesanan sehari sebelumnya secara permanen.",
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
