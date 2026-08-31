import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Karena surat dan foto sama-sama berkaitan dengan kegiatan baca, keduanya pasti dibuat untuk tujuan yang sama.",
        },
        {
          isCorrect: true,
          label:
            "Surat menjelaskan tujuan pendirian panggung, sedangkan foto menunjukkan penggunaannya di ruang tunggu; keduanya mendukung keberadaan kegiatan baca, tetapi tidak menjelaskan alasan setiap penumpang membaca.",
        },
        {
          isCorrect: false,
          label:
            "Foto penumpang membuktikan bahwa alasan panitia mendirikan panggung diterima oleh seluruh penumpang.",
        },
        {
          isCorrect: false,
          label:
            "Foto harus menjadi sumber utama karena merekam tindakan langsung, sedangkan surat hanya berisi rencana panitia.",
        },
        {
          isCorrect: false,
          label:
            "Setelah informasi surat dan foto digabungkan, asal serta waktu pembuatan masing-masing sumber tidak lagi penting.",
        },
      ],
    },
  },
  stimulusKey: "passage-4",
};

export default item;
