import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "figurative-language",
  },
  stimulus: "island-teacher",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Menggambarkan cuaca mendung yang menandai hari yang berat.",
        },
        {
          correct: false,
          label: "Menunjukkan bahwa pulau itu kaya akan tambang timah.",
        },
        {
          correct: false,
          label:
            "Menjelaskan bahwa kapal motor di dermaga itu terbuat dari logam timah.",
        },
        {
          correct: false,
          label: "Menandakan bahwa hari itu adalah hari libur sekolah.",
        },
        {
          correct: false,
          label: "Menggambarkan langit cerah yang cocok untuk berlayar.",
        },
      ],
    },
  },
};

export default item;
