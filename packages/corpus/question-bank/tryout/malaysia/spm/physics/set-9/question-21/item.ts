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
          label: "$$10\\text{ N}$$ up the slope, and $$3.5\\text{ kg}$$",
        },
        {
          correct: false,
          label: "$$4.9\\text{ N}$$ up the slope, and $$1.5\\text{ kg}$$",
        },
        {
          correct: true,
          label: "$$4.9\\text{ N}$$ up the slope, and $$3.5\\text{ kg}$$",
        },
        {
          correct: false,
          label: "$$4.9\\text{ N}$$ up the slope, and $$2.5\\text{ kg}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$10\\text{ N}$$ ke atas cerun, dan $$3.5\\text{ kg}$$",
        },
        {
          correct: false,
          label: "$$4.9\\text{ N}$$ ke atas cerun, dan $$1.5\\text{ kg}$$",
        },
        {
          correct: true,
          label: "$$4.9\\text{ N}$$ ke atas cerun, dan $$3.5\\text{ kg}$$",
        },
        {
          correct: false,
          label: "$$4.9\\text{ N}$$ ke atas cerun, dan $$2.5\\text{ kg}$$",
        },
      ],
    },
  },
};

export default item;
