import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "calculation",
  },
  stimulus: "household-spending",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "kelompok $$20\\%$$ kedua ke kelompok $$20\\%$$ tengah, sekitar Rp$$126{.}000$$",
        },
        {
          correct: false,
          label:
            "kelompok $$20\\%$$ terbawah ke kelompok $$20\\%$$ kedua, sekitar Rp$$150{.}000$$",
        },
        {
          correct: false,
          label:
            "kelompok $$20\\%$$ tengah ke kelompok $$20\\%$$ keempat, sekitar Rp$$198{.}000$$",
        },
        {
          correct: false,
          label:
            "kelompok $$20\\%$$ kedua ke kelompok $$20\\%$$ tengah, sekitar Rp$$300{.}000$$",
        },
        {
          correct: false,
          label:
            "kelompok $$20\\%$$ keempat ke kelompok $$20\\%$$ teratas, sekitar Rp$$414{.}000$$",
        },
      ],
    },
  },
};

export default item;
