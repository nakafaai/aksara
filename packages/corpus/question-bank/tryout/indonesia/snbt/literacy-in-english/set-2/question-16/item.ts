import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "inference",
  },
  stimulus: "market-scale",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "The needle stops a hair below zero when the narrator tests the empty tray, and Grandma turns the screw back for the nurse's daughter.",
        },
        {
          correct: true,
          label:
            "The needle sits exactly on zero for the man in the good coat, and Grandma turns the screw back for the nurse's daughter.",
        },
        {
          correct: false,
          label:
            "The needle sits exactly on zero for the man in the good coat, and the inspector never finds the scale wrong.",
        },
        {
          correct: false,
          label:
            "Grandma calls out weights before the needle stops, and the narrator's customers go home with less rice than the needle promised.",
        },
        {
          correct: false,
          label:
            "The fish seller winks when he says the scale is not to be trusted, and Grandma turns the screw a quarter turn.",
        },
      ],
    },
  },
};

export default item;
