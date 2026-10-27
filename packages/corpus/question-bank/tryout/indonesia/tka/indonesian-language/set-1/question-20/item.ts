import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "fiction",
    topic: "emotional-response",
  },
  stimulus: "seat-seven",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "lega karena ketekunan Mira akhirnya menjamin Seno akan pulang",
        },
        {
          correct: false,
          label:
            "kecewa karena pertunjukan tanpa dua pemain dianggap kehilangan makna",
        },
        {
          correct: true,
          label:
            "terharu karena Mira mengubah harapan akan kepulangan menjadi kekuatan untuk tetap tampil",
        },
        {
          correct: false,
          label:
            "marah karena Pak Damar mempertahankan kursi kosong ketika Seno tidak hadir",
        },
        {
          correct: false,
          label:
            "cemas karena Mira memilih berhenti berlatih setelah panggilan Seno",
        },
      ],
    },
  },
};

export default item;
