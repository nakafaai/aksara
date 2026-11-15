import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "inference",
  },
  stimulus: "framing-effect",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$72\\%$$ kelompok pertama memilih program A, dan $$72\\%$$ kelompok kedua memilih program D.",
        },
        {
          correct: false,
          label:
            "$$72\\%$$ kelompok pertama memilih program A, dan $$78\\%$$ kelompok kedua memilih program D, karena selisihnya kurang dari $$10$$ poin persen.",
        },
        {
          correct: false,
          label:
            "$$60\\%$$ kelompok pertama memilih program A, dan $$60\\%$$ kelompok kedua memilih program D.",
        },
        {
          correct: false,
          label:
            "$$72\\%$$ kelompok pertama memilih program B, dan $$72\\%$$ kelompok kedua memilih program C.",
        },
        {
          correct: true,
          label:
            "$$72\\%$$ kelompok pertama memilih program A, dan sekitar $$72\\%$$ kelompok kedua memilih program C.",
        },
      ],
    },
  },
};

export default item;
