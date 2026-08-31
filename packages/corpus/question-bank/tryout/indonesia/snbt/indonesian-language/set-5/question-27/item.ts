import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Jahitan merah lama, pilihan pola merah, dan tanggapan pelanggan membuat bekas reparasi terbaca sebagai kesinambungan perawatan pada blus warisan.",
        },
        {
          isCorrect: false,
          label:
            "Ayu memilih untuk memperbaiki jahitan dengan benang yang warnanya sengaja berbeda; bentuk fisik benda menetapkan seluruh maknanya sejak penyebutan pertama.",
        },
        {
          isCorrect: false,
          label:
            "Ayu memilih untuk memperbaiki jahitan dengan benang yang warnanya sengaja berbeda; akhir cerita menyatakan makna benda secara langsung sehingga rincian tindakan sebelumnya tidak diperlukan.",
        },
        {
          isCorrect: false,
          label:
            "Ayu memilih untuk memperbaiki jahitan dengan benang yang warnanya sengaja berbeda; perubahan suasana hanya berasal dari latar dan tidak berkaitan dengan pilihan tokoh.",
        },
        {
          isCorrect: false,
          label:
            "Ayu memilih untuk memperbaiki jahitan dengan benang yang warnanya sengaja berbeda; benda berulang mempertahankan satu arti meskipun tindakan dan respons akhir tokoh berubah.",
        },
      ],
    },
  },
  stimulusKey: "passage-6",
};

export default item;
