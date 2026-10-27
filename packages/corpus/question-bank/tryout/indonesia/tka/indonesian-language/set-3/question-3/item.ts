import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "main-supporting-ideas",
  },
  stimulus: "audio-labels",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "hasil minggu kedua membaik, tetapi penyebab perubahannya belum dapat dipisahkan",
        },
        {
          correct: false,
          label:
            "pengunjung cenderung menghindari audio karena labelnya tidak berbentuk pertanyaan",
        },
        {
          correct: false,
          label: "nama berkas lama harus dipertahankan",
        },
        {
          correct: false,
          label: "transkrip menyebabkan jumlah peserta turun",
        },
        {
          correct: false,
          label: "minggu pertama dan kedua memakai peserta yang sama",
        },
      ],
    },
  },
};

export default item;
