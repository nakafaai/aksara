import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-6",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Jahitan merah lama, pilihan pola merah, dan tanggapan pelanggan membuat bekas reparasi terbaca sebagai kesinambungan perawatan pada blus warisan.",
        },
        {
          correct: false,
          label:
            "Ayu memilih untuk memperbaiki jahitan dengan benang yang warnanya sengaja berbeda. Bentuk fisik benda menetapkan seluruh maknanya sejak penyebutan pertama.",
        },
        {
          correct: false,
          label:
            "Ayu memilih untuk memperbaiki jahitan dengan benang yang warnanya sengaja berbeda. Akhir cerita menyatakan makna benda secara langsung sehingga rincian tindakan sebelumnya tidak diperlukan.",
        },
        {
          correct: false,
          label:
            "Ayu memilih untuk memperbaiki jahitan dengan benang yang warnanya sengaja berbeda. Perubahan suasana hanya berasal dari latar dan tidak berkaitan dengan pilihan tokoh.",
        },
        {
          correct: false,
          label:
            "Ayu memilih untuk memperbaiki jahitan dengan benang yang warnanya sengaja berbeda. Benda berulang mempertahankan satu arti meskipun tindakan dan respons akhir tokoh berubah.",
        },
      ],
    },
  },
};

export default item;
