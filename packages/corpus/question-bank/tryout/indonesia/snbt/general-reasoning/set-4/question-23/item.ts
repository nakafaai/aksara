import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "quantitative-reasoning",
    topic: "data-interpretation",
  },
  stimulus: "unduhan",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Unduhan X naik dengan selisih yang sama setiap bulan.",
        },
        {
          correct: false,
          label: "Total unduhan Y selama lima bulan kurang dari $$200$$ ribu.",
        },
        {
          correct: false,
          label: "Pada bulan Mei, unduhan X sudah melebihi unduhan Y.",
        },
        {
          correct: false,
          label:
            "Persentase kenaikan unduhan Y dari Januari ke Mei lebih besar daripada persentase kenaikan unduhan X.",
        },
        {
          correct: true,
          label:
            "Persentase kenaikan unduhan X dari April ke Mei adalah $$25\\%$$.",
        },
      ],
    },
  },
};

export default item;
