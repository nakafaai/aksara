import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Definisi *konduksi* membuktikan bahwa suhu akhir kedua wadah hanya ditentukan oleh daya hantar bahannya.",
        },
        {
          correct: false,
          label:
            "Definisi itu menjadikan *konduksi* nama untuk seluruh alat, bukan proses tertentu yang disimulasikan.",
        },
        {
          correct: false,
          label:
            "Istilah *konduksi* menghapus keterbatasan representasi karena prosesnya dapat diulang di kelas.",
        },
        {
          correct: true,
          label:
            "Definisi *konduksi* menjelaskan salah satu jalur perpindahan energi melalui dinding wadah, sekaligus mencegah seluruh pendinginan dianggap terjadi hanya melalui jalur itu.",
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
