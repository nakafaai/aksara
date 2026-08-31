import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Memberi kriteria untuk menilai kesinambungan identitas mantel dan menjelaskan mengapa celah riwayat membatasi hubungan antara M-17 dan foto 2019.",
        },
        {
          isCorrect: false,
          label:
            "Membuktikan bahwa mantel dengan bentuk sama selalu merupakan benda yang sama meskipun kode bagian dalam tidak terlihat.",
        },
        {
          isCorrect: false,
          label:
            "Mengizinkan siswa mengisi halaman yang hilang selama dugaan tersebut selaras dengan foto publikasi.",
        },
        {
          isCorrect: false,
          label:
            "Menjadikan buku perawatan lebih dapat dipercaya daripada foto hanya karena riwayatnya ditulis secara kronologis.",
        },
        {
          isCorrect: false,
          label:
            "Menetapkan bahwa riwayat penyimpanan lebih penting daripada bukti penggunaan sehingga foto panggung tidak diperlukan.",
        },
      ],
    },
  },
  stimulusKey: "passage-4",
};

export default item;
