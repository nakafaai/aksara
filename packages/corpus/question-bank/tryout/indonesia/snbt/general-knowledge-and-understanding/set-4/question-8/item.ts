import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "vocabulary",
    topic: "affix-meaning",
  },
  stimulus: "purnama",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "Kemeja itu _kebesaran_ untuk adikku." },
        {
          correct: true,
          label: "Daun yang mulai layu itu tampak _kekuningan_.",
        },
        { correct: false, label: "Para pendaki _kemalaman_ di lereng gunung." },
        {
          correct: false,
          label: "_Kemerahan_ pada kulitnya hilang setelah diolesi salep.",
        },
        { correct: false, label: "Ia _kehilangan_ dompet di pasar." },
      ],
    },
  },
};

export default item;
