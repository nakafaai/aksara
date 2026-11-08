import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "paragraph-meaning",
    topic: "main-idea",
  },
  stimulus: "rabies",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Rabies dapat disembuhkan dengan mudah setelah gejalanya muncul pada manusia.",
        },
        {
          correct: false,
          label:
            "Mencuci luka gigitan sudah cukup untuk mencegah semua kasus rabies pada manusia.",
        },
        {
          correct: false,
          label:
            "Vaksinasi anjing tidak berpengaruh terhadap penyebaran virus rabies di suatu wilayah.",
        },
        {
          correct: true,
          label:
            "Vaksinasi anjing yang cakupannya cukup luas paling efektif menghentikan rabies.",
        },
        {
          correct: false,
          label:
            "Anjing yang tidak menggigit manusia tidak perlu divaksin antirabies sama sekali.",
        },
      ],
    },
  },
};

export default item;
