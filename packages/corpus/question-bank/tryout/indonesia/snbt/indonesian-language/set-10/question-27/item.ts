import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Nara memilih untuk menggambar lingkaran cahaya terakhir sebelum lampu padam; bentuk fisik benda menetapkan seluruh maknanya sejak penyebutan pertama.",
        },
        {
          isCorrect: false,
          label:
            "Nara memilih untuk menggambar lingkaran cahaya terakhir sebelum lampu padam; akhir cerita menyatakan makna benda secara langsung sehingga rincian tindakan sebelumnya tidak diperlukan.",
        },
        {
          isCorrect: false,
          label:
            "Nara memilih untuk menggambar lingkaran cahaya terakhir sebelum lampu padam; perubahan suasana hanya berasal dari latar dan tidak berkaitan dengan pilihan tokoh.",
        },
        {
          isCorrect: false,
          label:
            "Nara memilih untuk menggambar lingkaran cahaya terakhir sebelum lampu padam; benda berulang mempertahankan satu arti meskipun tindakan dan respons akhir tokoh berubah.",
        },
        {
          isCorrect: true,
          label:
            "Lingkaran cahaya terakhir mengubah padamnya lampu berulang dari akhir yang hilang menjadi jejak pengalaman malam yang dapat diingat.",
        },
      ],
    },
  },
  stimulusKey: "passage-6",
};

export default item;
