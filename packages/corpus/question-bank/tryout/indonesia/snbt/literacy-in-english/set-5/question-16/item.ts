import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "character",
  },
  stimulus: "night-orchard",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "He believes the pump is close to failing, and he wants her to call him if it stops.",
        },
        {
          correct: false,
          label:
            "He is more tired than he will admit, and he sends her to watch the pump so that he can rest without her seeing him.",
        },
        {
          correct: false,
          label:
            "He wants to find out whether the narrator knows how to repair the old pump if it should break down during the coldest part of the night.",
        },
        {
          correct: false,
          label:
            "He is annoyed that she questioned his method, and he gives her a task to keep her quiet.",
        },
        {
          correct: true,
          label:
            "He is more tired than he will admit, and he gives her a task so that neither of them has to say so.",
        },
      ],
    },
  },
};

export default item;
