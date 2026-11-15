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
            "$$200$$ per $$100{.}000$$ penduduk, jauh di atas laju kabupaten",
        },
        {
          correct: false,
          label:
            "$$80$$ per $$100{.}000$$ penduduk, jauh di bawah laju kabupaten, yaitu sekitar $$93$$",
        },
        {
          correct: false,
          label:
            "$$130$$ per $$100{.}000$$ penduduk, tertinggi di antara semua kecamatan",
        },
        {
          correct: false,
          label:
            "$$80$$ per $$100{.}000$$ penduduk, di atas laju kabupaten, yaitu sekitar $$69$$",
        },
        {
          correct: true,
          label:
            "$$80$$ per $$100{.}000$$ penduduk, sedikit di bawah laju kabupaten, yaitu $$82$$",
        },
      ],
    },
  },
};

export default item;
