import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "narrative",
    topic: "prediction",
  },
  stimulus: "borrowed-camera",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "take as many pictures as possible and keep only the best one",
        },
        {
          correct: true,
          label: "wait for the right moment before taking each picture",
        },
        {
          correct: false,
          label: "refuse to borrow the camera again because he lost the cap",
        },
        {
          correct: false,
          label: "leave the lens cap at home so that he cannot lose it",
        },
        {
          correct: false,
          label: "enter only photos from his phone in future contests",
        },
      ],
    },
  },
};

export default item;
