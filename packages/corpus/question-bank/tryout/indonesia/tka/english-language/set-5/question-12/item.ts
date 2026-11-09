import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "narrative",
    topic: "character",
  },
  stimulus: "borrowed-camera",
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: true, label: "She is forgiving when accidents happen." },
        { correct: true, label: "She expects Raka to use the film carefully." },
        {
          correct: false,
          label: "She cares more about the camera than about Raka's feelings.",
        },
        {
          correct: true,
          label:
            "She wants Raka to keep the habit of thinking before taking pictures.",
        },
      ],
    },
  },
};

export default item;
