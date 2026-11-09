import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "reading",
    topic: "argument-evaluation",
  },
  stimulus: "infiltration-well",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Musim kemarau tahun ini jauh lebih pendek daripada musim kemarau tahun-tahun sebelumnya.",
        },
        {
          correct: false,
          label: "Sumur resapan di kampung itu diisi batu dan ijuk.",
        },
        {
          correct: false,
          label: "Warga membuat sumur resapan secara bergotong royong.",
        },
        {
          correct: false,
          label:
            "Rumah yang tidak membuat sumur resapan tetap mengalami sumur kering.",
        },
        {
          correct: false,
          label: "Selokan kampung dibersihkan setiap bulan.",
        },
      ],
    },
  },
};

export default item;
