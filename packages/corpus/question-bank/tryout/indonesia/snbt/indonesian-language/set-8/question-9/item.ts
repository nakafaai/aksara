import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Definisi *konduksi* membuktikan bahwa hasil model selalu sama dengan keadaan tanah di lapangan.",
        },
        {
          isCorrect: false,
          label:
            "Definisi itu menjadikan *konduksi* nama untuk seluruh alat, bukan proses tertentu yang disimulasikan.",
        },
        {
          isCorrect: false,
          label:
            "Istilah *konduksi* menghapus keterbatasan representasi karena prosesnya dapat diulang di kelas.",
        },
        {
          isCorrect: true,
          label:
            "Definisi *konduksi* menghubungkan proses pada model dengan proses yang diwakilinya sehingga kegunaan model dapat dibedakan dari batas penerapannya.",
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
