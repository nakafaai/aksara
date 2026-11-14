import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "geometry-measurement",
    topic: "measurement",
  },
  stimulus: "menara",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Pukul $$16{.}42$$",
        },
        {
          correct: false,
          label: "Pukul $$17{.}24$$",
        },
        {
          correct: false,
          label: "Pukul $$17{.}45$$",
        },
        {
          correct: false,
          label: "Pukul $$17{.}52$$",
        },
        {
          correct: true,
          label: "Pukul $$18{.}06$$",
        },
      ],
    },
  },
};

export default item;
