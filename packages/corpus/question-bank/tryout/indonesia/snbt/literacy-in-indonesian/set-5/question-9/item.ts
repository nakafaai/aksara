import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-2",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Definisi *rangkaian tertutup* membuktikan bahwa hasil model selalu sama dengan keadaan nyata.",
        },
        {
          correct: true,
          label:
            "Definisi *rangkaian tertutup* menghubungkan proses pada model dengan proses yang diwakilinya sehingga kegunaan model dapat dibedakan dari batas penerapannya.",
        },
        {
          correct: false,
          label:
            "Definisi itu menjadikan *rangkaian tertutup* nama untuk seluruh alat, bukan proses tertentu yang disimulasikan.",
        },
        {
          correct: false,
          label:
            "Istilah *rangkaian tertutup* menghapus keterbatasan representasi karena prosesnya dapat diulang di kelas.",
        },
        {
          correct: false,
          label:
            "Definisi tersebut hanya menjelaskan bahan pembuat model dan tidak berhubungan dengan proses yang diamati.",
        },
      ],
    },
  },
};

export default item;
