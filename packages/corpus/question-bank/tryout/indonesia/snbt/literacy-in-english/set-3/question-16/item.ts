import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "inference",
  },
  stimulus: "clinic-interpreter",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "That he had been taking the tablets every day, and now moves them so that he will not forget them on busy mornings.",
        },
        {
          correct: true,
          label:
            "That he had not been taking the tablets regularly since his previous appointment, and now means to start.",
        },
        {
          correct: false,
          label:
            "That he stopped taking the tablets only after today's visit, and now means to start again tomorrow.",
        },
        {
          correct: false,
          label:
            "That he had not been taking the tablets, and moves the box only so that the narrator will think he has changed.",
        },
        {
          correct: false,
          label:
            "That he had been taking tablets from a second box, and the one in the drawer was only a spare.",
        },
      ],
    },
  },
};

export default item;
