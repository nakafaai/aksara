import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "writing",
    topic: "effective-sentence",
  },
  stimulus: "waste-bank",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Bagi warga yang rajin menabung sampah akan mendapat bingkisan dari pengurus pada akhir tahun.",
        },
        {
          correct: true,
          label:
            "Warga yang rajin menabung sampah mendapat bingkisan dari pengurus pada akhir tahun.",
        },
        {
          correct: false,
          label:
            "Bagi warga-warga yang rajin menabung sampah mendapat bingkisan dari pengurus pada akhir tahun.",
        },
        {
          correct: false,
          label:
            "Kepada warga yang rajin menabung sampah mendapat bingkisan dari pengurus pada akhir tahun.",
        },
        {
          correct: false,
          label:
            "Warga yang rajin menabung sampah, mendapat bingkisan dari pengurus pada akhir tahun.",
        },
      ],
    },
  },
};

export default item;
