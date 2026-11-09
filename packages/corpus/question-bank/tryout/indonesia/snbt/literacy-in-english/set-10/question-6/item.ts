import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "author-view",
  },
  stimulus: "machine-pictures",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Anything made with the help of AI should never receive copyright.",
        },
        {
          correct: false,
          label:
            "Photographs should lose copyright, since cameras do most of the work.",
        },
        {
          correct: false,
          label:
            "People who type prompts are authors in the same way as photographers.",
        },
        {
          correct: false,
          label:
            "AI image generators should be banned until their training is proved fair.",
        },
        {
          correct: true,
          label:
            "Copyright should follow a person's creative choices, not a prompt alone.",
        },
      ],
    },
  },
};

export default item;
