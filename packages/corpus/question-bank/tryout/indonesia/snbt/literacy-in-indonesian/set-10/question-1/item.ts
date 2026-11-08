import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "cause-effect",
  },
  stimulus: "coral-bleaching",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Karang melepaskan alga, sehingga kerangka kapur yang putih terlihat.",
        },
        {
          correct: false,
          label: "Suhu air yang panas melarutkan warna kerangka kapur karang.",
        },
        {
          correct: false,
          label:
            "Alga lain tumbuh menutupi permukaan karang yang sedang sakit.",
        },
        {
          correct: false,
          label:
            "Karang mengeluarkan lendir putih yang tebal untuk melindungi diri dari panas.",
        },
        {
          correct: false,
          label:
            "Jaringan karang menebal dan menutupi alga yang memberi warna.",
        },
      ],
    },
  },
};

export default item;
