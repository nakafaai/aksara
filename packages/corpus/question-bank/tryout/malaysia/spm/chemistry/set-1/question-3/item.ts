import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-4",
    topic: "matter-and-atomic-structure",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Atom X is $$^{38}_{18}\\text{X}$$ and the formula of the compound is $$\\text{XY}_2$$",
        },
        {
          correct: false,
          label:
            "Atom X is $$^{40}_{20}\\text{X}$$ and the formula of the compound is $$\\text{X}_2\\text{Y}$$",
        },
        {
          correct: false,
          label:
            "Atom X is $$^{36}_{16}\\text{X}$$ and the formula of the compound is $$\\text{XY}_2$$",
        },
        {
          correct: true,
          label:
            "Atom X is $$^{40}_{20}\\text{X}$$ and the formula of the compound is $$\\text{XY}_2$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Atom X ialah $$^{38}_{18}\\text{X}$$ dan formula sebatiannya ialah $$\\text{XY}_2$$",
        },
        {
          correct: false,
          label:
            "Atom X ialah $$^{40}_{20}\\text{X}$$ dan formula sebatiannya ialah $$\\text{X}_2\\text{Y}$$",
        },
        {
          correct: false,
          label:
            "Atom X ialah $$^{36}_{16}\\text{X}$$ dan formula sebatiannya ialah $$\\text{XY}_2$$",
        },
        {
          correct: true,
          label:
            "Atom X ialah $$^{40}_{20}\\text{X}$$ dan formula sebatiannya ialah $$\\text{XY}_2$$",
        },
      ],
    },
  },
};

export default item;
