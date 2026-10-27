import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "eng no!miaw mee!ow",
        },
        {
          correct: false,
          label: "no!miaw eng mee!ow",
        },
        {
          correct: false,
          label: "eng n mee!ow o!miaw",
        },
        {
          correct: false,
          label: "no!miawi mee!ow eng",
        },
        {
          correct: true,
          label: "mee!ow no!miawi eng",
        },
      ],
    },
  },
};

export default item;
