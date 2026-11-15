import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "inference",
  },
  stimulus: "piano-lessons",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "That she was losing her hearing, and that she sent the narrator on because the narrator had become too good for her.",
        },
        {
          correct: true,
          label:
            "That she was losing her hearing, and that she sent the narrator on partly because she could no longer judge her playing, which she did not say.",
        },
        {
          correct: false,
          label:
            "That she had grown fond of the narrator, and that she sent her on so as not to have to criticise her again.",
        },
        {
          correct: false,
          label:
            "That she was losing interest in teaching, and that she sent the narrator on so that she could stop giving lessons.",
        },
        {
          correct: false,
          label:
            "That she was losing her hearing, and that she sent the narrator on because she had already told her everything she knew.",
        },
      ],
    },
  },
};

export default item;
