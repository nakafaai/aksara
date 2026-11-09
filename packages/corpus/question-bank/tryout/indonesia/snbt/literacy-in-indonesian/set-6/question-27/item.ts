import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "figurative-language",
  },
  stimulus: "dawn-market",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "hiperbola, karena keramaian pasar dilebih-lebihkan hingga tidak masuk akal",
        },
        {
          correct: false,
          label:
            'simile, karena pasar dibandingkan dengan sesuatu memakai kata "seperti"',
        },
        {
          correct: true,
          label:
            "personifikasi, karena pasar digambarkan dapat membuka mata seperti manusia",
        },
        {
          correct: false,
          label:
            "ironi, karena pasar disebut terjaga padahal sebenarnya masih tertidur",
        },
        {
          correct: false,
          label: 'metonimia, karena kata "pasar" menggantikan nama pemiliknya',
        },
      ],
    },
  },
};

export default item;
