import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "vocabulary",
    topic: "figurative-meaning",
  },
  stimulus: "fansur",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "*harum* pada kalimat (4) dan *mengering* pada kalimat (13)",
        },
        {
          correct: true,
          label: "*harum* pada kalimat (1) dan *lesu* pada kalimat (16)",
        },
        {
          correct: false,
          label: "*mengering* pada kalimat (13) dan *dipikul* pada kalimat (7)",
        },
        {
          correct: false,
          label: "*lesu* pada kalimat (16) dan *hulu* pada kalimat (7)",
        },
        {
          correct: false,
          label: "*harum* pada kalimat (1) dan *mengeras* pada kalimat (4)",
        },
      ],
    },
  },
};

export default item;
