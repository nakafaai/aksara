import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-5",
    topic: "inheritance",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$RrYy$$, and $$\\tfrac{1}{4}$$ of its gametes carry $$R$$ and $$y$$",
        },
        {
          correct: false,
          label: "$$RRYY$$, and none of its gametes carry $$R$$ and $$y$$",
        },
        {
          correct: false,
          label:
            "$$RrYY$$, and $$\\tfrac{1}{2}$$ of its gametes carry $$R$$ and $$y$$",
        },
        {
          correct: true,
          label:
            "$$RRYy$$, and $$\\tfrac{1}{2}$$ of its gametes carry $$R$$ and $$y$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$RrYy$$, dan $$\\tfrac{1}{4}$$ daripada gametnya membawa $$R$$ dan $$y$$",
        },
        {
          correct: false,
          label: "$$RRYY$$, dan tiada gametnya yang membawa $$R$$ dan $$y$$",
        },
        {
          correct: false,
          label:
            "$$RrYY$$, dan $$\\tfrac{1}{2}$$ daripada gametnya membawa $$R$$ dan $$y$$",
        },
        {
          correct: true,
          label:
            "$$RRYy$$, dan $$\\tfrac{1}{2}$$ daripada gametnya membawa $$R$$ dan $$y$$",
        },
      ],
    },
  },
};

export default item;
