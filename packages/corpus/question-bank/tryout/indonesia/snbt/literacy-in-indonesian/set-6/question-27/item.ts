import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-6",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Reno memilih untuk membaca ulang kartu kondisi sebelum memutuskan apakah lukisan terakhir akan dipindahkan. Bentuk fisik benda menetapkan seluruh maknanya sejak penyebutan pertama.",
        },
        {
          correct: true,
          label:
            "Catatan $$2019$$, pembacaan ulang, dan nama Reno pada catatan baru mengubah kartu kondisi dari formulir rutin menjadi hubungan tanggung jawab antarpengelola karya.",
        },
        {
          correct: false,
          label:
            "Reno memilih untuk membaca ulang kartu kondisi sebelum memutuskan apakah lukisan terakhir akan dipindahkan. Akhir cerita menyatakan makna benda secara langsung sehingga rincian tindakan sebelumnya tidak diperlukan.",
        },
        {
          correct: false,
          label:
            "Reno memilih untuk membaca ulang kartu kondisi sebelum memutuskan apakah lukisan terakhir akan dipindahkan. Perubahan suasana hanya berasal dari latar dan tidak berkaitan dengan pilihan tokoh.",
        },
        {
          correct: false,
          label:
            "Reno memilih untuk membaca ulang kartu kondisi sebelum memutuskan apakah lukisan terakhir akan dipindahkan. Benda berulang mempertahankan satu arti meskipun tindakan dan respons akhir tokoh berubah.",
        },
      ],
    },
  },
};

export default item;
