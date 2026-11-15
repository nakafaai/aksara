import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "inference",
  },
  stimulus: "mozart-effect",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "That students did better on the task after Mozart than after relaxation instructions.",
        },
        {
          correct: true,
          label: "That the benefit lasts long after the music stops.",
        },
        {
          correct: false,
          label:
            "That students did better on the task after Mozart than after silence.",
        },
        {
          correct: true,
          label:
            "That the music raises intelligence in general rather than performance on one kind of task.",
        },
        {
          correct: true,
          label:
            "That the benefit comes from Mozart's music in particular rather than from music in general.",
        },
      ],
    },
  },
};

export default item;
