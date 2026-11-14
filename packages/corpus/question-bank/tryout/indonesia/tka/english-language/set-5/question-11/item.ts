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
            "Bayu lost the lens cap because he was busy taking too many pictures.",
        },
        {
          correct: false,
          label:
            "Aunt Ratih stayed angry about the cap until Bayu won a prize.",
        },
        {
          correct: true,
          label:
            "The patience Bayu practiced with the film camera helped him take the photo that won second prize.",
        },
        {
          correct: false,
          label:
            "Bayu's phone photos were better than his film photos, so he did not win first prize.",
        },
        {
          correct: false,
          label:
            "The fisherman in the photo encouraged Bayu to enter the contest.",
        },
      ],
    },
  },
};

export default item;
