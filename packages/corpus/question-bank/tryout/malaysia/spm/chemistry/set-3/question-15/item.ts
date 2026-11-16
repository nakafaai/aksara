import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "acids-bases-and-salts",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Basicity $$1$$, $$240\\text{ cm}^3$$ of carbon dioxide, and $$2.24\\text{ g}$$ of salt",
        },
        {
          correct: false,
          label:
            "Basicity $$2$$, $$960\\text{ cm}^3$$ of carbon dioxide, and $$2.68\\text{ g}$$ of salt",
        },
        {
          correct: false,
          label:
            "Basicity $$2$$, $$480\\text{ cm}^3$$ of carbon dioxide, and $$1.34\\text{ g}$$ of salt",
        },
        {
          correct: true,
          label:
            "Basicity $$2$$, $$480\\text{ cm}^3$$ of carbon dioxide, and $$2.68\\text{ g}$$ of salt",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Kebesan $$1$$, $$240\\text{ cm}^3$$ karbon dioksida, dan $$2.24\\text{ g}$$ garam",
        },
        {
          correct: false,
          label:
            "Kebesan $$2$$, $$960\\text{ cm}^3$$ karbon dioksida, dan $$2.68\\text{ g}$$ garam",
        },
        {
          correct: false,
          label:
            "Kebesan $$2$$, $$480\\text{ cm}^3$$ karbon dioksida, dan $$1.34\\text{ g}$$ garam",
        },
        {
          correct: true,
          label:
            "Kebesan $$2$$, $$480\\text{ cm}^3$$ karbon dioksida, dan $$2.68\\text{ g}$$ garam",
        },
      ],
    },
  },
};

export default item;
