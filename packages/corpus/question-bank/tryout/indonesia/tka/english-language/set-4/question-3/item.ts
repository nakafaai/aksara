import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "descriptive",
    topic: "classification",
  },
  stimulus: "egret-hide",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "The sign asking visitors to stop talking",
        },
        {
          correct: true,
          label: "The reed screens along the end of the boardwalk",
        },
        {
          correct: true,
          label: "The wooden flaps over the viewing slits",
        },
        {
          correct: false,
          label: "The waist-high rail on the upper platform",
        },
      ],
    },
  },
};

export default item;
