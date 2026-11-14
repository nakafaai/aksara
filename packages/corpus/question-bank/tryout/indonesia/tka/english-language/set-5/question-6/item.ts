import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "recount",
    topic: "summary",
  },
  stimulus: "cave-visit",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "A guide explains how stalactites form and why they grow so slowly.",
        },
        {
          correct: false,
          label:
            "Students break off pieces of rock in a cave and later regret it.",
        },
        {
          correct: true,
          label:
            "A class explores a limestone cave with a guide, experiences total darkness, and learns at a museum why the cave is protected.",
        },
        {
          correct: false,
          label:
            "A class takes a long bus trip and writes stories about their favorite places.",
        },
        {
          correct: false,
          label:
            "Visitors are shown photographs of a cave taken fifty years ago.",
        },
      ],
    },
  },
};

export default item;
