import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "light-and-optics",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$2.7\\text{ mm}$$ toward the slide; $$19$$",
        },
        {
          correct: false,
          label: "$$2.7\\text{ mm}$$ away from the slide; $$39$$",
        },
        {
          correct: true,
          label: "$$2.7\\text{ mm}$$ away from the slide; $$19$$",
        },
        {
          correct: false,
          label: "$$27\\text{ mm}$$ away from the slide; $$20$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$2.7\\text{ mm}$$ mendekati slaid; $$19$$",
        },
        {
          correct: false,
          label: "$$2.7\\text{ mm}$$ menjauhi slaid; $$39$$",
        },
        {
          correct: true,
          label: "$$2.7\\text{ mm}$$ menjauhi slaid; $$19$$",
        },
        {
          correct: false,
          label: "$$27\\text{ mm}$$ menjauhi slaid; $$20$$",
        },
      ],
    },
  },
};

export default item;
