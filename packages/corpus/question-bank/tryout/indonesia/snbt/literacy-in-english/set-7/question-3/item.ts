import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "inference",
  },
  stimulus: "slime-mould",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "The slime mould stores the trail inside its millions of nuclei.",
        },
        {
          correct: false,
          label:
            "The trail helps the slime mould remember the layout of Tokyo.",
        },
        {
          correct: false,
          label:
            "The trail is made of nerve cells that the slime mould leaves behind.",
        },
        {
          correct: false,
          label:
            "The trail allows the slime mould to remember food from years ago.",
        },
        {
          correct: true,
          label:
            "The trail records where it has been, but outside its own body.",
        },
      ],
    },
  },
};

export default item;
