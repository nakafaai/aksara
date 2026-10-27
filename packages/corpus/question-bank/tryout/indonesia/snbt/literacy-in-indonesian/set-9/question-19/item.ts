import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-4",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Memberi kriteria untuk menilai kesinambungan identitas mantel dan menjelaskan mengapa celah riwayat membatasi hubungan antara M-17 dan foto $$2019$$.",
        },
        {
          correct: false,
          label:
            "Membuktikan bahwa mantel dengan bentuk sama selalu merupakan benda yang sama meskipun kode bagian dalam tidak terlihat.",
        },
        {
          correct: false,
          label:
            "Mengizinkan siswa mengisi halaman yang hilang selama dugaan tersebut selaras dengan foto publikasi.",
        },
        {
          correct: false,
          label:
            "Menjadikan buku perawatan lebih dapat dipercaya daripada foto hanya karena riwayatnya ditulis secara kronologis.",
        },
        {
          correct: false,
          label:
            "Menetapkan bahwa riwayat penyimpanan lebih penting daripada bukti penggunaan sehingga foto panggung tidak diperlukan.",
        },
      ],
    },
  },
};

export default item;
