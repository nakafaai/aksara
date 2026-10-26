import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Definisi *jaring-jaring makanan* membuktikan bahwa hasil model selalu sama dengan keadaan ekosistem di lapangan.",
        },
        {
          correct: true,
          label:
            "Definisi *jaring-jaring makanan* menghubungkan proses pada model dengan proses yang diwakilinya sehingga kegunaan model dapat dibedakan dari batas penerapannya.",
        },
        {
          correct: false,
          label:
            "Definisi itu menjadikan *jaring-jaring makanan* nama untuk seluruh alat, bukan proses tertentu yang disimulasikan.",
        },
        {
          correct: false,
          label:
            "Istilah *jaring-jaring makanan* menghapus keterbatasan representasi karena prosesnya dapat diulang di kelas.",
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
