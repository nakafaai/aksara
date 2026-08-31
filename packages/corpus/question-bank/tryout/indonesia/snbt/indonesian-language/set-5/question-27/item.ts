import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Benang berbeda warna membuat reparasi pada pakaian berulang menjadi bukti perawatan yang terlihat, bukan cacat yang disembunyikan.",
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
