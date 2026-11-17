import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-5",
    topic: "electricity",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$5$$ extra electrons, and it accelerates upwards at $$20\\text{ m s}^{-2}$$",
        },
        {
          correct: false,
          label: "$$5$$ extra electrons, and it stays at rest",
        },
        {
          correct: true,
          label:
            "$$5$$ extra electrons, and it accelerates upwards at $$10\\text{ m s}^{-2}$$",
        },
        {
          correct: false,
          label:
            "$$5$$ electrons missing, and it accelerates upwards at $$10\\text{ m s}^{-2}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$5$$ elektron tambahan, dan ia memecut ke atas pada $$20\\text{ m s}^{-2}$$",
        },
        {
          correct: false,
          label: "$$5$$ elektron tambahan, dan ia kekal pegun",
        },
        {
          correct: true,
          label:
            "$$5$$ elektron tambahan, dan ia memecut ke atas pada $$10\\text{ m s}^{-2}$$",
        },
        {
          correct: false,
          label:
            "$$5$$ elektron kurang, dan ia memecut ke atas pada $$10\\text{ m s}^{-2}$$",
        },
      ],
    },
  },
};

export default item;
