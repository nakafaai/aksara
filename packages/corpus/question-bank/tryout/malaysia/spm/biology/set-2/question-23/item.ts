import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "nutrition-in-plants",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "$$6\\text{ mg}$$ per hour, at $$4$$ units" },
        { correct: false, label: "$$10\\text{ mg}$$ per hour, at $$4$$ units" },
        {
          correct: true,
          label: "$$10\\text{ mg}$$ per hour, at about $$2.7$$ units",
        },
        {
          correct: false,
          label: "$$6\\text{ mg}$$ per hour, at about $$2.7$$ units",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$6\\text{ mg}$$ sejam, pada $$4$$ unit" },
        { correct: false, label: "$$10\\text{ mg}$$ sejam, pada $$4$$ unit" },
        {
          correct: true,
          label: "$$10\\text{ mg}$$ sejam, pada kira-kira $$2.7$$ unit",
        },
        {
          correct: false,
          label: "$$6\\text{ mg}$$ sejam, pada kira-kira $$2.7$$ unit",
        },
      ],
    },
  },
};

export default item;
