import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "reading",
    topic: "inference",
  },
  stimulus: "larva-monitors",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Kartu pemantauan menjadi lebih lengkap.",
        },
        {
          correct: false,
          label: "Kasus demam berdarah langsung hilang.",
        },
        {
          correct: false,
          label: "Musim hujan menjadi lebih pendek.",
        },
        {
          correct: false,
          label:
            "Kader kesehatan tidak perlu lagi melapor ke puskesmas karena kasus sudah turun.",
        },
        {
          correct: true,
          label:
            "Jentik nyamuk dapat kembali berkembang di wadah air yang tidak dikuras.",
        },
      ],
    },
  },
};

export default item;
