import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "inference",
  },
  stimulus: "spare-key",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            'She asked "Which flowerpot?" instead of asking where the key was.',
        },
        {
          correct: false,
          label:
            "Her question shows that she already knew the key was in a flowerpot before the narrator mentioned one.",
        },
        {
          correct: true,
          label:
            "She had walked past all five flowerpots on her way round the house before she rang.",
        },
        {
          correct: false,
          label:
            "She was sitting on the bench with the key in her lap when the narrator arrived.",
        },
        {
          correct: false,
          label: "She told the narrator that she had found the key at once.",
        },
      ],
    },
  },
};

export default item;
