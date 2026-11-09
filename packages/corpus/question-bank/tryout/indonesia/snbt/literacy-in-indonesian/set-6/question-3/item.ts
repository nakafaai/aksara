import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "application",
  },
  stimulus: "liquefaction",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Bukit berbatu keras yang hanya tertutup lapisan tanah yang sangat tipis",
        },
        {
          correct: false,
          label: "Lahan bertanah liat padat yang letaknya jauh dari sungai",
        },
        {
          correct: false,
          label: "Lapisan pasir padat yang jauh di atas permukaan air tanah",
        },
        {
          correct: false,
          label: "Lahan berpasir kering di puncak bukit kapur yang tinggi",
        },
        {
          correct: true,
          label:
            "Lahan urukan berpasir lepas di bekas rawa dengan air tanah dangkal",
        },
      ],
    },
  },
};

export default item;
