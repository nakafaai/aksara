import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "inference",
  },
  stimulus: "umbrella-stand",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            'That people returned the umbrellas they had borrowed during the three weeks she was in hospital, as the note "Sorry it took so long" shows.',
        },
        {
          correct: false,
          label:
            'That neighbours bought her new umbrellas as get-well presents, as the note "Hope you\'re mending" shows.',
        },
        {
          correct: false,
          label:
            "That the narrator's sign had finally persuaded people to bring their umbrellas back.",
        },
        {
          correct: true,
          label:
            'That people returned umbrellas they had kept for a long time, not only recent loans, as the note "Sorry it took so long" also shows.',
        },
        {
          correct: false,
          label:
            'That people returned umbrellas they had kept for a long time, not only recent loans, as the note "Hope you\'re mending" also shows.',
        },
      ],
    },
  },
};

export default item;
