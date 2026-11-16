import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-5",
    topic: "biodiversity",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "X is about $$0.79$$ and Y about $$0.28$$, but both are equally diverse because both have four species",
        },
        {
          correct: false,
          label:
            "X is about $$0.21$$ and Y about $$0.72$$, so Y is more diverse",
        },
        {
          correct: false,
          label:
            "X is about $$0.79$$ and Y about $$0.28$$, so Y is more diverse because one species thrives there",
        },
        {
          correct: true,
          label:
            "X is about $$0.79$$ and Y about $$0.28$$, so X is more diverse even though both have four species",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "X kira-kira $$0.79$$ dan Y kira-kira $$0.28$$, tetapi kedua-duanya sama pelbagai kerana kedua-duanya mempunyai empat spesies",
        },
        {
          correct: false,
          label:
            "X kira-kira $$0.21$$ dan Y kira-kira $$0.72$$, jadi Y lebih pelbagai",
        },
        {
          correct: false,
          label:
            "X kira-kira $$0.79$$ dan Y kira-kira $$0.28$$, jadi Y lebih pelbagai kerana satu spesies berkembang maju di situ",
        },
        {
          correct: true,
          label:
            "X kira-kira $$0.79$$ dan Y kira-kira $$0.28$$, jadi X lebih pelbagai walaupun kedua-duanya mempunyai empat spesies",
        },
      ],
    },
  },
};

export default item;
