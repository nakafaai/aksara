import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "calculation",
  },
  stimulus: "dengue-cases",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$94$$ per $$100{.}000$$ penduduk, dan dalam persen sama besar dengan kenaikan banyak kasus",
        },
        {
          correct: false,
          label:
            "sekitar $$13{,}4$$ per $$100{.}000$$ penduduk, dan dalam persen lebih kecil daripada kenaikan banyak kasus karena penduduknya banyak",
        },
        {
          correct: false,
          label:
            "sekitar $$19{,}6$$ per $$100{.}000$$ penduduk, dan dalam persen sama besar dengan kenaikan banyak kasus",
        },
        {
          correct: false,
          label:
            "sekitar $$13{,}4$$ per $$100{.}000$$ penduduk, dan dalam persen lebih besar daripada kenaikan banyak kasus",
        },
        {
          correct: true,
          label:
            "sekitar $$13{,}4$$ per $$100{.}000$$ penduduk, dan dalam persen sama besar dengan kenaikan banyak kasus",
        },
      ],
    },
  },
};

export default item;
