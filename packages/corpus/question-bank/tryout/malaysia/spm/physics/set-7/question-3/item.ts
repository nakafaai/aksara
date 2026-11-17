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
          label: "$$24\\text{ s}$$, $$60$$ steps and $$60$$ steps",
        },
        {
          correct: false,
          label: "$$24\\text{ s}$$, $$36$$ steps and $$36$$ steps",
        },
        {
          correct: true,
          label: "$$24\\text{ s}$$, $$36$$ steps and $$180$$ steps",
        },
        {
          correct: false,
          label: "$$50\\text{ s}$$, $$75$$ steps and $$180$$ steps",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$24\\text{ s}$$, $$60$$ anak tangga dan $$60$$ anak tangga",
        },
        {
          correct: false,
          label: "$$24\\text{ s}$$, $$36$$ anak tangga dan $$36$$ anak tangga",
        },
        {
          correct: true,
          label: "$$24\\text{ s}$$, $$36$$ anak tangga dan $$180$$ anak tangga",
        },
        {
          correct: false,
          label: "$$50\\text{ s}$$, $$75$$ anak tangga dan $$180$$ anak tangga",
        },
      ],
    },
  },
};

export default item;
