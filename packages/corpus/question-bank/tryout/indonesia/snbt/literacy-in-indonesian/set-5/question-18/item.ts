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
            "Buku pesanan menunjukkan perubahan jenis perbaikan, sedangkan cerita penjahit memberi kemungkinan alasan pelanggan. Gabungan keduanya mendukung penafsiran perubahan kebutuhan, tetapi tidak menetapkan motif semua pelanggan.",
        },
        {
          correct: false,
          label:
            "Buku pesanan membuktikan alasan setiap pelanggan memilih reparasi karena jenis perbaikan selalu menunjukkan motifnya.",
        },
        {
          correct: false,
          label:
            "Cerita tiga penjahit lebih dapat dipercaya daripada catatan dua puluh tahun karena kesaksian lisan selalu menjelaskan konteks secara lengkap.",
        },
        {
          correct: false,
          label:
            "Jika jenis perbaikan dan alasan pelanggan berbeda, salah satu sumber tidak dapat dipakai untuk menulis sejarah reparasi.",
        },
        {
          correct: false,
          label:
            "Setelah kedua sumber dibandingkan, siapa yang membuat catatan dan kapan cerita direkam tidak lagi memengaruhi penafsiran.",
        },
      ],
    },
  },
};

export default item;
