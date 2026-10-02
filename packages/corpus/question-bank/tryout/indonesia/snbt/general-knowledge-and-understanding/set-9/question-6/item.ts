import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "aturan moral tentang perilaku yang seharusnya dilakukan",
        },
        {
          isCorrect: true,
          label:
            "gambaran mengenai perilaku yang lazim dilakukan orang dalam suatu kelompok",
        },
        {
          isCorrect: false,
          label: "sanksi hukum bagi perilaku yang dilarang",
        },
        {
          isCorrect: false,
          label: "kesukaan pribadi seorang penumpang",
        },
        {
          isCorrect: false,
          label: "catatan tentang tindakan satu orang pada satu perjalanan",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
