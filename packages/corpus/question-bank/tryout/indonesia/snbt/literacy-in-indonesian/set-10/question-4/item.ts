import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "application",
  },
  stimulus: "coral-bleaching",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Karang itu akan mati karena warnanya sudah berubah menjadi putih seluruhnya.",
        },
        {
          correct: false,
          label: "Alga lain akan segera menutupi karang dan mencegahnya pulih.",
        },
        {
          correct: false,
          label: "Kerangka kapur karang akan larut karena kehilangan alga.",
        },
        {
          correct: false,
          label:
            "Karang akan berpindah ke perairan yang lebih dingin di dekatnya.",
        },
        {
          correct: true,
          label:
            "Alga kembali menghuni jaringan karang, dan karang itu perlahan pulih.",
        },
      ],
    },
  },
};

export default item;
