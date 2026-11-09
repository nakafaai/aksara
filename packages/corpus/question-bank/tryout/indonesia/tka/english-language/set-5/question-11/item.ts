import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "narrative",
    topic: "synthesis",
  },
  stimulus: "borrowed-camera",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Raka lost the lens cap because he was busy taking too many pictures.",
        },
        {
          correct: false,
          label:
            "Aunt Wulan stayed angry about the cap until Raka won a prize.",
        },
        {
          correct: true,
          label:
            "The patience Raka practiced with the film camera helped him take the photo that won second prize.",
        },
        {
          correct: false,
          label:
            "Raka's phone photos were better than his film photos, so he did not win first prize.",
        },
        {
          correct: false,
          label:
            "The fisherman in the photo encouraged Raka to enter the contest.",
        },
      ],
    },
  },
};

export default item;
