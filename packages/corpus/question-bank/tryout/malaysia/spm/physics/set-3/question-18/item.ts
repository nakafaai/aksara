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
          label: "$$40\\text{ cm}$$ toward the mirror; $$4$$",
        },
        {
          correct: false,
          label: "$$40\\text{ cm}$$ away from the mirror; $$2$$",
        },
        {
          correct: false,
          label: "$$5\\text{ cm}$$ away from the mirror; $$2$$",
        },
        {
          correct: true,
          label: "$$40\\text{ cm}$$ away from the mirror; $$4$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$40\\text{ cm}$$ mendekati cermin; $$4$$",
        },
        {
          correct: false,
          label: "$$40\\text{ cm}$$ menjauhi cermin; $$2$$",
        },
        {
          correct: false,
          label: "$$5\\text{ cm}$$ menjauhi cermin; $$2$$",
        },
        {
          correct: true,
          label: "$$40\\text{ cm}$$ menjauhi cermin; $$4$$",
        },
      ],
    },
  },
};

export default item;
