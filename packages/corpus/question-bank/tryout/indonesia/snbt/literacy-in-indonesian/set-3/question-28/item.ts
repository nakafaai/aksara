import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "fact-opinion",
  },
  stimulus: "novel-review",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Separuh mata air itu kini kering.",
        },
        {
          correct: false,
          label:
            "Ia pulang karena kakeknya meninggal dan mewariskan sebuah peta.",
        },
        {
          correct: true,
          label: "Dialog dalam novel ini juga patut dipuji.",
        },
        {
          correct: false,
          label:
            "Rara menyelang-nyelingi bab masa kini dengan catatan harian sang kakek.",
        },
        {
          correct: false,
          label: "Sinta mulai menelusuri penyebab mata air yang kering.",
        },
      ],
    },
  },
};

export default item;
