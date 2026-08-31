import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Lila memilih untuk menuliskan satu pertanyaan pada kartu kosong dan menempelkannya di alat yang paling sunyi; bentuk fisik benda menetapkan seluruh maknanya sejak penyebutan pertama.",
        },
        {
          isCorrect: true,
          label:
            "Kartu kosong pada alat yang sunyi mengubah ketiadaan tanggapan menjadi undangan bagi pengunjung untuk memulai percakapan.",
        },
        {
          isCorrect: false,
          label:
            "Lila memilih untuk menuliskan satu pertanyaan pada kartu kosong dan menempelkannya di alat yang paling sunyi; akhir cerita menyatakan makna benda secara langsung sehingga rincian tindakan sebelumnya tidak diperlukan.",
        },
        {
          isCorrect: false,
          label:
            "Lila memilih untuk menuliskan satu pertanyaan pada kartu kosong dan menempelkannya di alat yang paling sunyi; perubahan suasana hanya berasal dari latar dan tidak berkaitan dengan pilihan tokoh.",
        },
        {
          isCorrect: false,
          label:
            "Lila memilih untuk menuliskan satu pertanyaan pada kartu kosong dan menempelkannya di alat yang paling sunyi; benda berulang mempertahankan satu arti meskipun tindakan dan respons akhir tokoh berubah.",
        },
      ],
    },
  },
  stimulusKey: "passage-6",
};

export default item;
