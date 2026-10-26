import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Definisi *daya dukung* membuktikan bahwa hasil model selalu sama dengan keadaan populasi di lapangan.",
        },
        {
          correct: true,
          label:
            "Definisi *daya dukung* menjelaskan mengapa populasi berhenti pada dua batas sumber daya, sekaligus menegaskan bahwa batas lingkungan nyata dapat berubah dan bukan angka tetap.",
        },
        {
          correct: false,
          label:
            "Definisi itu menjadikan *daya dukung* nama untuk seluruh alat, bukan proses tertentu yang disimulasikan.",
        },
        {
          correct: false,
          label:
            "Istilah *daya dukung* menghapus keterbatasan representasi karena prosesnya dapat diulang di kelas.",
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
