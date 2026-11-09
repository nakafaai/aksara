import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-4",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Karena surat dan foto sama-sama berkaitan dengan kegiatan baca, keduanya pasti dibuat untuk tujuan yang sama.",
        },
        {
          correct: true,
          label:
            "Surat menjelaskan tujuan pendirian panggung, sedangkan foto menunjukkan penggunaannya di ruang tunggu. Keduanya mendukung keberadaan kegiatan baca, tetapi tidak menjelaskan alasan setiap penumpang membaca.",
        },
        {
          correct: false,
          label:
            "Foto penumpang membuktikan bahwa alasan panitia mendirikan panggung diterima oleh seluruh penumpang.",
        },
        {
          correct: false,
          label:
            "Foto harus menjadi sumber utama karena merekam tindakan langsung, sedangkan surat hanya berisi rencana panitia.",
        },
        {
          correct: false,
          label:
            "Setelah informasi surat dan foto digabungkan, asal serta waktu pembuatan masing-masing sumber tidak lagi penting.",
        },
      ],
    },
  },
};

export default item;
