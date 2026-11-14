import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "procedure",
    topic: "sequence",
  },
  stimulus: "fried-rice",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "pushing them to one side and cracking the eggs into the empty space",
        },
        { correct: false, label: "adding the sweet soy sauce and salt" },
        { correct: false, label: "breaking up lumps in the cold rice" },
        { correct: false, label: "tasting the rice and adding more salt" },
        { correct: false, label: "serving the rice with cucumber slices" },
      ],
    },
  },
};

export default item;
