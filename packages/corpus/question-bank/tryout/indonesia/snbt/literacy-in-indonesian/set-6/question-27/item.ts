import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Reno memilih untuk membaca ulang kartu kondisi sebelum memutuskan apakah lukisan terakhir akan dipindahkan. Bentuk fisik benda menetapkan seluruh maknanya sejak penyebutan pertama.",
        },
        {
          isCorrect: true,
          label:
            "Catatan $$2019$$, pembacaan ulang, dan nama Reno pada catatan baru mengubah kartu kondisi dari formulir rutin menjadi hubungan tanggung jawab antarpengelola karya.",
        },
        {
          isCorrect: false,
          label:
            "Reno memilih untuk membaca ulang kartu kondisi sebelum memutuskan apakah lukisan terakhir akan dipindahkan. Akhir cerita menyatakan makna benda secara langsung sehingga rincian tindakan sebelumnya tidak diperlukan.",
        },
        {
          isCorrect: false,
          label:
            "Reno memilih untuk membaca ulang kartu kondisi sebelum memutuskan apakah lukisan terakhir akan dipindahkan. Perubahan suasana hanya berasal dari latar dan tidak berkaitan dengan pilihan tokoh.",
        },
        {
          isCorrect: false,
          label:
            "Reno memilih untuk membaca ulang kartu kondisi sebelum memutuskan apakah lukisan terakhir akan dipindahkan. Benda berulang mempertahankan satu arti meskipun tindakan dan respons akhir tokoh berubah.",
        },
      ],
    },
  },
  stimulusKey: "passage-6",
};

export default item;
