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
          label: "$$16\\text{ m}^2$$, then $$10\\text{ m}^2$$ with the oil",
        },
        {
          correct: false,
          label: "$$16\\text{ m}^2$$, then $$46\\text{ m}^2$$ with the oil",
        },
        {
          correct: true,
          label:
            "$$16\\text{ m}^2$$, and still $$16\\text{ m}^2$$ with the oil",
        },
        {
          correct: false,
          label:
            "$$9.6\\text{ m}^2$$, and still $$9.6\\text{ m}^2$$ with the oil",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$16\\text{ m}^2$$, kemudian $$10\\text{ m}^2$$ dengan minyak",
        },
        {
          correct: false,
          label:
            "$$16\\text{ m}^2$$, kemudian $$46\\text{ m}^2$$ dengan minyak",
        },
        {
          correct: true,
          label:
            "$$16\\text{ m}^2$$, dan masih $$16\\text{ m}^2$$ dengan minyak",
        },
        {
          correct: false,
          label:
            "$$9.6\\text{ m}^2$$, dan masih $$9.6\\text{ m}^2$$ dengan minyak",
        },
      ],
    },
  },
};

export default item;
