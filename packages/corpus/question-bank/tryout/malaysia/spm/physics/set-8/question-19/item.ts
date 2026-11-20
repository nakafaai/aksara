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
          label:
            "$$3.0\\text{ cm}$$ below the top face, $$90\\text{ cm}$$ and $$10$$",
        },
        {
          correct: false,
          label:
            "$$4.5\\text{ cm}$$ below the top face, $$210\\text{ cm}$$ and $$20$$",
        },
        {
          correct: true,
          label:
            "$$2.0\\text{ cm}$$ below the top face, $$40\\text{ cm}$$ and $$5.0$$",
        },
        {
          correct: false,
          label:
            "$$2.0\\text{ cm}$$ below the top face, $$4.4\\text{ cm}$$ and $$0.56$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$3.0\\text{ cm}$$ di bawah permukaan atas, $$90\\text{ cm}$$ dan $$10$$",
        },
        {
          correct: false,
          label:
            "$$4.5\\text{ cm}$$ di bawah permukaan atas, $$210\\text{ cm}$$ dan $$20$$",
        },
        {
          correct: true,
          label:
            "$$2.0\\text{ cm}$$ di bawah permukaan atas, $$40\\text{ cm}$$ dan $$5.0$$",
        },
        {
          correct: false,
          label:
            "$$2.0\\text{ cm}$$ di bawah permukaan atas, $$4.4\\text{ cm}$$ dan $$0.56$$",
        },
      ],
    },
  },
};

export default item;
