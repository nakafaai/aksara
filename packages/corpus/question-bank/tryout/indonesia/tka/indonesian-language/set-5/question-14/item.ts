import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "main-supporting-ideas",
  },
  stimulus: "air-sensor",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "sensor murah lebih akurat daripada stasiun pemantau resmi",
        },
        {
          correct: false,
          label: "udara lembap membuat jumlah partikel debu bertambah banyak",
        },
        {
          correct: false,
          label: "setiap sekolah wajib membeli stasiun pemantau resmi",
        },
        {
          correct: false,
          label: "harga sensor kualitas udara murah sekitar satu juta rupiah",
        },
        {
          correct: true,
          label:
            "sensor udara murah dapat memperluas pemantauan jika keterbatasannya diatasi dengan koreksi dan cara baca yang tepat",
        },
      ],
    },
  },
};

export default item;
