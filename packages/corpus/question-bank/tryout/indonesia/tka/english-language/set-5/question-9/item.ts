import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "recount",
    topic: "explicit-information",
  },
  stimulus: "cave-visit",
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "a flashlight and a map of the cave" },
        { correct: false, label: "a pair of gloves to protect the rocks" },
        { correct: false, label: "a notebook for writing one sentence" },
        {
          correct: false,
          label: "a photograph of the cave from fifty years ago",
        },
        { correct: true, label: "a helmet with a headlamp" },
      ],
    },
  },
};

export default item;
