import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "daily-relevance",
  },
  stimulus: "silat-club",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "selalu berusaha menang dalam setiap persaingan",
        },
        {
          correct: true,
          label:
            "menghormati orang lain dan mengendalikan diri, bahkan ketika sedang bersaing",
        },
        {
          correct: false,
          label:
            "mengerahkan tenaga sekuat-kuatnya saat berlatih bersama teman",
        },
        {
          correct: false,
          label: "menghindari kegiatan yang membutuhkan latihan rutin",
        },
        { correct: false, label: "berlatih hanya ketika ada pertandingan" },
      ],
    },
  },
};

export default item;
