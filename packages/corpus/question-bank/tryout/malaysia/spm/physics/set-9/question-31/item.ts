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
        { correct: true, label: "$$4.6\\text{ h}$$, and $$82$$ minutes" },
        { correct: false, label: "$$4.6\\text{ h}$$, and $$63$$ minutes" },
        { correct: false, label: "$$6.5\\text{ h}$$, and $$117$$ minutes" },
        { correct: false, label: "$$2.0\\text{ h}$$, and $$35$$ minutes" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "$$4.6\\text{ h}$$, dan $$82$$ minit" },
        { correct: false, label: "$$4.6\\text{ h}$$, dan $$63$$ minit" },
        { correct: false, label: "$$6.5\\text{ h}$$, dan $$117$$ minit" },
        { correct: false, label: "$$2.0\\text{ h}$$, dan $$35$$ minit" },
      ],
    },
  },
};

export default item;
