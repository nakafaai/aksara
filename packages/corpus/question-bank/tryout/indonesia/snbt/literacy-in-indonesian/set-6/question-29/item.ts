import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "tone-attitude",
  },
  stimulus: "dawn-market",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "tegang dan mencekam karena pasar dipenuhi pertengkaran",
        },
        {
          correct: true,
          label:
            "sibuk tetapi akrab, digambarkan dengan rincian kerja yang hangat",
        },
        {
          correct: false,
          label: "sepi dan muram karena para pedagang tidak mendapat pembeli",
        },
        {
          correct: false,
          label: "meriah dan gemerlap seperti pasar malam pada hari raya",
        },
        {
          correct: false,
          label:
            "marah dan getir karena para pedagang merasa diperas oleh pembeli",
        },
      ],
    },
  },
};

export default item;
