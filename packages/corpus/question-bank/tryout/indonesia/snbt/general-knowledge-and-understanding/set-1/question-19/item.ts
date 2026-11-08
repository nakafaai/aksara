import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "paragraph-meaning",
    topic: "inference",
  },
  stimulus: "karang",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Peluang karang untuk pulih bergantung pada seberapa cepat suhu air kembali normal.",
        },
        {
          correct: false,
          label:
            "Alga hanya dapat tumbuh di jaringan karang ketika suhu air tinggi.",
        },
        {
          correct: false,
          label: "Kerangka kapur karang berubah warna ketika suhu air turun.",
        },
        {
          correct: false,
          label: "Luas karang yang memutih tidak dapat diukur oleh pengamat.",
        },
        {
          correct: false,
          label: "Penyakit karang hanya muncul ketika suhu air normal.",
        },
      ],
    },
  },
};

export default item;
