import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-1",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "aturan moral tentang perilaku yang seharusnya dilakukan",
        },
        {
          correct: true,
          label:
            "gambaran mengenai perilaku yang lazim dilakukan orang dalam suatu kelompok",
        },
        {
          correct: false,
          label: "sanksi hukum bagi perilaku yang dilarang",
        },
        {
          correct: false,
          label: "kesukaan pribadi seorang penumpang",
        },
        {
          correct: false,
          label: "catatan tentang tindakan satu orang pada satu perjalanan",
        },
      ],
    },
  },
};

export default item;
