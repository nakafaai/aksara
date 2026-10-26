import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "ong ybeeppz! yum!meeongw",
        },
        {
          correct: false,
          label: "yum ybeeppzpz! ong!meeongw",
        },
        {
          correct: false,
          label: "yum !meeongw ongybeeppz!",
        },
        {
          correct: false,
          label: "ong beeppz! yum y!meeongw",
        },
        {
          correct: true,
          label: "yum y!meeongw ongbeeppzpz!",
        },
      ],
    },
  },
};

export default item;
