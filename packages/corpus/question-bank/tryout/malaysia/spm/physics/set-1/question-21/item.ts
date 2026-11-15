import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "force-and-motion-2",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Moving upwards with its speed decreasing at $$2\\text{ m s}^{-2}$$",
        },
        {
          correct: true,
          label:
            "Moving downwards with its speed decreasing at $$2\\text{ m s}^{-2}$$",
        },
        {
          correct: false,
          label:
            "Moving downwards with its speed increasing at $$2\\text{ m s}^{-2}$$",
        },
        {
          correct: false,
          label:
            "Moving downwards with its speed decreasing at $$12\\text{ m s}^{-2}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Bergerak ke atas dengan laju yang berkurang pada kadar $$2\\text{ m s}^{-2}$$",
        },
        {
          correct: true,
          label:
            "Bergerak ke bawah dengan laju yang berkurang pada kadar $$2\\text{ m s}^{-2}$$",
        },
        {
          correct: false,
          label:
            "Bergerak ke bawah dengan laju yang bertambah pada kadar $$2\\text{ m s}^{-2}$$",
        },
        {
          correct: false,
          label:
            "Bergerak ke bawah dengan laju yang berkurang pada kadar $$12\\text{ m s}^{-2}$$",
        },
      ],
    },
  },
};

export default item;
