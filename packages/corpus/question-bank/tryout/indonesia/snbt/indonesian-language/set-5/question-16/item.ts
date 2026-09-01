import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Siswa membandingkan buku pesanan dan sejarah lisan untuk menjelaskan perubahan reparasi tanpa menganggap alasan tiga penjahit sebagai motif semua pelanggan.",
        },
        {
          isCorrect: false,
          label:
            "Siswa memakai buku pesanan untuk membuktikan alasan semua pelanggan karena catatan transaksi dibuat pada saat kejadian.",
        },
        {
          isCorrect: false,
          label:
            "Siswa menyamakan buku pesanan dan wawancara karena keduanya membahas perubahan reparasi pada kawasan yang sama.",
        },
        {
          isCorrect: false,
          label:
            "Siswa mengutamakan wawancara tahun 2026 karena sumber yang lebih baru selalu memberikan gambaran masa lalu yang lebih lengkap.",
        },
        {
          isCorrect: false,
          label:
            "Siswa menggabungkan kedua sumber untuk mengisi alasan pelanggan yang tidak tercatat dengan dugaan yang dianggap masuk akal.",
        },
      ],
    },
  },
  stimulusKey: "passage-4",
};

export default item;
