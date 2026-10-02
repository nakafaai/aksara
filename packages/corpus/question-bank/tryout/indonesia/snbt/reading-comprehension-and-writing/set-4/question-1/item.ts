import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Catatan Awal Sebelum Pengujian Label Rak",
        },
        {
          isCorrect: true,
          label: "Pengujian Label Foto pada Rak Pengembalian Alat Olahraga",
        },
        {
          isCorrect: false,
          label:
            "Pengujian Beberapa Perubahan Serentak pada Layanan Peminjaman",
        },
        {
          isCorrect: false,
          label:
            "Tanggapan Peminjam terhadap Perancangan Ulang Permanen Layanan",
        },
        {
          isCorrect: false,
          label: "Evaluasi Menyeluruh atas Layanan Peminjaman Alat Olahraga",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
