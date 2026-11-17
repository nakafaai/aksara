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
            "$$0.70\\text{ m s}^{-2}$$ down the slope, and $$10\\text{ N}$$ up the slope",
        },
        {
          correct: false,
          label:
            "$$1.0\\text{ m s}^{-2}$$ down the slope, and $$4.9\\text{ N}$$ up the slope",
        },
        {
          correct: true,
          label:
            "$$0.70\\text{ m s}^{-2}$$ down the slope, and $$4.9\\text{ N}$$ up the slope",
        },
        {
          correct: false,
          label:
            "$$0.70\\text{ m s}^{-2}$$ down the slope, and no friction, since the block stays at rest",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$0.70\\text{ m s}^{-2}$$ menuruni cerun, dan $$10\\text{ N}$$ ke atas cerun",
        },
        {
          correct: false,
          label:
            "$$1.0\\text{ m s}^{-2}$$ menuruni cerun, dan $$4.9\\text{ N}$$ ke atas cerun",
        },
        {
          correct: true,
          label:
            "$$0.70\\text{ m s}^{-2}$$ menuruni cerun, dan $$4.9\\text{ N}$$ ke atas cerun",
        },
        {
          correct: false,
          label:
            "$$0.70\\text{ m s}^{-2}$$ menuruni cerun, dan tiada geseran, kerana blok kekal pegun",
        },
      ],
    },
  },
};

export default item;
