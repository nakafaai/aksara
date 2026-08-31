import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Definisi *daya dukung* membuktikan bahwa hasil model selalu sama dengan keadaan tanah di lapangan.",
        },
        {
          isCorrect: true,
          label:
            "Definisi *daya dukung* menghubungkan proses pada model dengan proses yang diwakilinya sehingga kegunaan model dapat dibedakan dari batas penerapannya.",
        },
        {
          isCorrect: false,
          label:
            "Definisi itu menjadikan *daya dukung* nama untuk seluruh alat, bukan proses tertentu yang disimulasikan.",
        },
        {
          isCorrect: false,
          label:
            "Istilah *daya dukung* menghapus keterbatasan representasi karena prosesnya dapat diulang di kelas.",
        },
        {
          isCorrect: false,
          label:
            "Definisi tersebut hanya menjelaskan bahan pembuat model dan tidak berhubungan dengan proses yang diamati.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
