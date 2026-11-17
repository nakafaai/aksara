import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "electronics",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "OR output stuck at $$1$$; $$1$$ combination; $$I=1,F=1,D=0$$",
        },
        {
          correct: false,
          label:
            "NOT output stuck at $$1$$; $$1$$ combination; $$I=1,F=1,D=0$$",
        },
        {
          correct: false,
          label:
            "OR output stuck at $$1$$; $$4$$ combinations; $$I=1,F=0,D=0$$",
        },
        {
          correct: false,
          label:
            "AND output stuck at $$1$$; $$5$$ combinations; $$I=0,F=0,D=0$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Output OR tersekat pada $$1$$; $$1$$ gabungan; $$I=1,F=1,D=0$$",
        },
        {
          correct: false,
          label:
            "Output NOT tersekat pada $$1$$; $$1$$ gabungan; $$I=1,F=1,D=0$$",
        },
        {
          correct: false,
          label:
            "Output OR tersekat pada $$1$$; $$4$$ gabungan; $$I=1,F=0,D=0$$",
        },
        {
          correct: false,
          label:
            "Output AND tersekat pada $$1$$; $$5$$ gabungan; $$I=0,F=0,D=0$$",
        },
      ],
    },
  },
};

export default item;
