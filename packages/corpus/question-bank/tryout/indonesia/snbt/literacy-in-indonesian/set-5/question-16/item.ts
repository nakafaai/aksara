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
            "Siswa membandingkan buku pesanan dan sejarah lisan untuk menjelaskan perubahan reparasi tanpa menganggap alasan yang diingat tiga penjahit sebagai motif semua pelanggan.",
        },
        {
          correct: false,
          label:
            "Siswa memakai buku pesanan untuk membuktikan alasan semua pelanggan karena catatan transaksi dibuat pada saat kejadian.",
        },
        {
          correct: false,
          label:
            "Siswa menyamakan buku pesanan dan wawancara karena keduanya membahas perubahan reparasi pada kawasan yang sama.",
        },
        {
          correct: false,
          label:
            "Siswa mengutamakan wawancara tahun $$2026$$ karena sumber yang lebih baru selalu memberikan gambaran masa lalu yang lebih lengkap.",
        },
        {
          correct: false,
          label:
            "Siswa menggabungkan kedua sumber untuk mengisi alasan pelanggan yang tidak tercatat dengan dugaan yang dianggap masuk akal.",
        },
      ],
    },
  },
};

export default item;
