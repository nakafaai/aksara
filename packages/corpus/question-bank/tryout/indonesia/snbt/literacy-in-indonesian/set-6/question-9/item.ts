import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Definisi *erosi* membuktikan bahwa hasil model selalu sama dengan keadaan tanah di lapangan.",
        },
        {
          correct: false,
          label:
            "Definisi itu menjadikan *erosi* nama untuk seluruh alat, bukan proses tertentu yang disimulasikan.",
        },
        {
          correct: false,
          label:
            "Istilah *erosi* menghapus keterbatasan representasi karena prosesnya dapat diulang di kelas.",
        },
        {
          correct: true,
          label:
            "Definisi *erosi* menjelaskan mengapa massa tanah yang berpindah bersama aliran menjadi hasil ukur, sekaligus membatasi penafsiran pada pemindahan partikel.",
        },
        {
          correct: false,
          label:
            "Definisi tersebut hanya menjelaskan bahan pembuat model dan tidak berhubungan dengan proses yang diamati.",
        },
      ],
    },
  },
  stimulus: "passage-2",
};

export default item;
