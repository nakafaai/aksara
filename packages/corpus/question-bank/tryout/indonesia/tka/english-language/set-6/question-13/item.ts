import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "narrative",
    topic: "prediction",
  },
  stimulus: "stage-lines",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "leave the stage and ask the teacher for the script",
        },
        { correct: false, label: "refuse to take part in another school play" },
        { correct: false, label: "ask Tomi to say all of her lines for her" },
        { correct: false, label: "blame the audience for making noise" },
        {
          correct: true,
          label:
            "use what is happening on stage to find her way back to her lines",
        },
      ],
    },
  },
};

export default item;
