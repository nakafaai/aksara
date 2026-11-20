import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "force-and-motion-1",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$24\\text{ s}$$, $$180$$ steps, and he steps straight off at the bottom",
        },
        {
          correct: true,
          label:
            "$$24\\text{ s}$$, $$180$$ steps, and the escalator carries him to the top in $$300\\text{ s}$$",
        },
        {
          correct: false,
          label:
            "$$24\\text{ s}$$, $$36$$ steps, and the escalator carries him to the top in $$300\\text{ s}$$",
        },
        {
          correct: false,
          label:
            "$$24\\text{ s}$$, $$180$$ steps, and the escalator carries him to the top in $$60\\text{ s}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$24\\text{ s}$$, $$180$$ anak tangga, dan dia terus melangkah keluar di bahagian bawah",
        },
        {
          correct: true,
          label:
            "$$24\\text{ s}$$, $$180$$ anak tangga, dan eskalator membawanya ke atas dalam $$300\\text{ s}$$",
        },
        {
          correct: false,
          label:
            "$$24\\text{ s}$$, $$36$$ anak tangga, dan eskalator membawanya ke atas dalam $$300\\text{ s}$$",
        },
        {
          correct: false,
          label:
            "$$24\\text{ s}$$, $$180$$ anak tangga, dan eskalator membawanya ke atas dalam $$60\\text{ s}$$",
        },
      ],
    },
  },
};

export default item;
