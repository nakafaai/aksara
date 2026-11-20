import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-4",
    topic: "light-and-optics",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$0.50°$$, $$+0.25\\text{ D}$$ and $$6.5\\text{ mm}$$ away from the objective",
        },
        {
          correct: false,
          label: "$$0.50°$$, $$+25\\text{ D}$$ and no movement",
        },
        {
          correct: true,
          label:
            "$$0.50°$$, $$+25\\text{ D}$$ and $$6.5\\text{ mm}$$ away from the objective",
        },
        {
          correct: false,
          label:
            "$$0.50°$$, $$+25\\text{ D}$$ and $$6.5\\text{ mm}$$ towards the objective",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$0.50°$$, $$+0.25\\text{ D}$$ dan $$6.5\\text{ mm}$$ menjauhi kanta objek",
        },
        {
          correct: false,
          label: "$$0.50°$$, $$+25\\text{ D}$$ dan tidak perlu digerakkan",
        },
        {
          correct: true,
          label:
            "$$0.50°$$, $$+25\\text{ D}$$ dan $$6.5\\text{ mm}$$ menjauhi kanta objek",
        },
        {
          correct: false,
          label:
            "$$0.50°$$, $$+25\\text{ D}$$ dan $$6.5\\text{ mm}$$ mendekati kanta objek",
        },
      ],
    },
  },
};

export default item;
