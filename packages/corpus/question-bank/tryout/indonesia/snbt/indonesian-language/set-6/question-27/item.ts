import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Reno memilih untuk membaca kartu kondisi satu per satu sebelum memindahkan lukisan terakhir; bentuk fisik benda menetapkan seluruh maknanya sejak penyebutan pertama.",
        },
        {
          isCorrect: true,
          label:
            "Catatan 2019, pembacaan ulang, dan tanda tangan Reno mengubah kartu kondisi dari formulir rutin menjadi hubungan tanggung jawab antarpengelola karya.",
        },
        {
          isCorrect: false,
          label:
            "Reno memilih untuk membaca kartu kondisi satu per satu sebelum memindahkan lukisan terakhir; akhir cerita menyatakan makna benda secara langsung sehingga rincian tindakan sebelumnya tidak diperlukan.",
        },
        {
          isCorrect: false,
          label:
            "Reno memilih untuk membaca kartu kondisi satu per satu sebelum memindahkan lukisan terakhir; perubahan suasana hanya berasal dari latar dan tidak berkaitan dengan pilihan tokoh.",
        },
        {
          isCorrect: false,
          label:
            "Reno memilih untuk membaca kartu kondisi satu per satu sebelum memindahkan lukisan terakhir; benda berulang mempertahankan satu arti meskipun tindakan dan respons akhir tokoh berubah.",
        },
      ],
    },
  },
  stimulusKey: "passage-6",
};

export default item;
