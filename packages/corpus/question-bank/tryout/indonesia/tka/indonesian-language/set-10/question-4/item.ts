import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "information-quality",
  },
  stimulus: "butterfly-garden",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "kenaikan itu membuktikan bahwa taman menjadi satu-satunya penyebabnya",
        },
        {
          correct: true,
          label:
            "kenaikan itu menjanjikan, tetapi sebagian mungkin disebabkan oleh musim berbunga di sekitar sekolah",
        },
        {
          correct: false,
          label:
            "kenaikan itu tidak berarti apa-apa karena pengamatan hanya berlangsung 15 menit",
        },
        {
          correct: false,
          label:
            "kenaikan itu salah karena jumlah jenis kupu-kupu justru turun",
        },
        {
          correct: false,
          label:
            "kenaikan itu disebabkan oleh pestisida yang disemprotkan orang tua",
        },
      ],
    },
  },
};

export default item;
