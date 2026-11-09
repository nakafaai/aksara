import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "continuation",
  },
  stimulus: "cracked-voice",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Gilang tetap berlatih di barisan bas dengan lebih percaya diri",
        },
        {
          correct: false,
          label: "Gilang meminta kembali ke barisan suara tinggi",
        },
        {
          correct: false,
          label: "Gilang berhenti dari paduan suara karena masih malu",
        },
        {
          correct: false,
          label: "Bu Sekar mengeluarkan Gilang karena suaranya pecah",
        },
        {
          correct: false,
          label:
            "teman-teman di barisan belakang kembali menertawakan suara Gilang",
        },
      ],
    },
  },
};

export default item;
