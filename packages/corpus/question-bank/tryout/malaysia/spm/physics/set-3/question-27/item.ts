import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-5",
    topic: "pressure",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$86\\text{ cm}$$, and the flow becomes $$1.3$$ times as fast",
        },
        {
          correct: false,
          label:
            "$$19\\text{ cm}$$, and the flow becomes $$2.0$$ times as fast",
        },
        {
          correct: false,
          label:
            "$$67\\text{ cm}$$, and the flow becomes $$1.3$$ times as fast",
        },
        {
          correct: false,
          label:
            "$$86\\text{ cm}$$, and the flow becomes $$1.2$$ times as fast",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$86\\text{ cm}$$, dan aliran menjadi $$1.3$$ kali lebih laju",
        },
        {
          correct: false,
          label:
            "$$19\\text{ cm}$$, dan aliran menjadi $$2.0$$ kali lebih laju",
        },
        {
          correct: false,
          label:
            "$$67\\text{ cm}$$, dan aliran menjadi $$1.3$$ kali lebih laju",
        },
        {
          correct: false,
          label:
            "$$86\\text{ cm}$$, dan aliran menjadi $$1.2$$ kali lebih laju",
        },
      ],
    },
  },
};

export default item;
