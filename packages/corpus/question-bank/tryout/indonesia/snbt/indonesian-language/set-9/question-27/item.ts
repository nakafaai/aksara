import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Wulan memilih untuk menjahit label tahun pementasan pada bagian dalam setiap kostum; bentuk fisik benda menetapkan seluruh maknanya sejak penyebutan pertama.",
        },
        {
          isCorrect: false,
          label:
            "Wulan memilih untuk menjahit label tahun pementasan pada bagian dalam setiap kostum; akhir cerita menyatakan makna benda secara langsung sehingga rincian tindakan sebelumnya tidak diperlukan.",
        },
        {
          isCorrect: false,
          label:
            "Wulan memilih untuk menjahit label tahun pementasan pada bagian dalam setiap kostum; perubahan suasana hanya berasal dari latar dan tidak berkaitan dengan pilihan tokoh.",
        },
        {
          isCorrect: true,
          label:
            "Label tahun di bagian dalam kostum menghubungkan benda panggung berulang dengan riwayat pemakaiannya tanpa mengubah tampilan pertunjukan.",
        },
        {
          isCorrect: false,
          label:
            "Wulan memilih untuk menjahit label tahun pementasan pada bagian dalam setiap kostum; benda berulang mempertahankan satu arti meskipun tindakan dan respons akhir tokoh berubah.",
        },
      ],
    },
  },
  stimulusKey: "passage-6",
};

export default item;
