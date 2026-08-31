import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Buku pesanan menunjukkan perubahan jenis perbaikan, sedangkan cerita penjahit memberi kemungkinan alasan pelanggan; gabungan keduanya mendukung penafsiran perubahan kebutuhan, tetapi tidak menetapkan motif semua pelanggan.",
        },
        {
          isCorrect: false,
          label:
            "Buku pesanan membuktikan alasan setiap pelanggan memilih reparasi karena jenis perbaikan selalu menunjukkan motifnya.",
        },
        {
          isCorrect: false,
          label:
            "Cerita tiga penjahit lebih dapat dipercaya daripada catatan dua puluh tahun karena kesaksian lisan selalu menjelaskan konteks secara lengkap.",
        },
        {
          isCorrect: false,
          label:
            "Jika jenis perbaikan dan alasan pelanggan berbeda, salah satu sumber tidak dapat dipakai untuk menulis sejarah reparasi.",
        },
        {
          isCorrect: false,
          label:
            "Setelah kedua sumber dibandingkan, siapa yang membuat catatan dan kapan cerita direkam tidak lagi memengaruhi penafsiran.",
        },
      ],
    },
  },
  stimulusKey: "passage-4",
};

export default item;
