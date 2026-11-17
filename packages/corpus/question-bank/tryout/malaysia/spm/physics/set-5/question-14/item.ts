import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "waves",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "About $$4.5$$ minutes, then caught about $$2.5$$ minutes later",
        },
        {
          correct: false,
          label:
            "About $$1.5$$ minutes, then caught about $$35\\text{ s}$$ later",
        },
        {
          correct: false,
          label:
            "About $$4.5$$ minutes, then caught about $$1.0$$ minute later",
        },
        {
          correct: false,
          label:
            "About $$4.5$$ minutes, then caught about $$1.5$$ minutes later",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Kira-kira $$4.5$$ minit, kemudian dikejar kira-kira $$2.5$$ minit kemudian",
        },
        {
          correct: false,
          label:
            "Kira-kira $$1.5$$ minit, kemudian dikejar kira-kira $$35\\text{ s}$$ kemudian",
        },
        {
          correct: false,
          label:
            "Kira-kira $$4.5$$ minit, kemudian dikejar kira-kira $$1.0$$ minit kemudian",
        },
        {
          correct: false,
          label:
            "Kira-kira $$4.5$$ minit, kemudian dikejar kira-kira $$1.5$$ minit kemudian",
        },
      ],
    },
  },
};

export default item;
