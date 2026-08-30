import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "main-supporting-ideas",
  },
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "semua pengunjung menolak audio",
        },
        {
          isCorrect: false,
          label: "nama berkas lama harus dipertahankan",
        },
        {
          isCorrect: true,
          label:
            "hasil minggu kedua membaik, tetapi penyebab perubahannya belum dapat dipisahkan",
        },
        {
          isCorrect: false,
          label: "transkrip menyebabkan jumlah peserta turun",
        },
        {
          isCorrect: false,
          label: "minggu pertama dan kedua memakai peserta yang sama",
        },
      ],
    },
  },
  stimulusKey: "audio-labels",
};

export default item;
