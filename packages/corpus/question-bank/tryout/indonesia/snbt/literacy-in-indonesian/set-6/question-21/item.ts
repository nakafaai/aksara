import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "argument-evaluation",
  },
  stimulus: "food-estate",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Konsumsi beras per orang di negara itu terus naik selama sepuluh tahun terakhir.",
        },
        {
          correct: false,
          label:
            "Mesin panen modern mempercepat panen di lahan yang sangat luas.",
        },
        {
          correct: true,
          label:
            "Banyak sawah baru di lahan gambut panennya jauh di bawah perkiraan.",
        },
        {
          correct: false,
          label:
            "Harga beras dunia melonjak tajam dalam beberapa tahun terakhir.",
        },
        {
          correct: false,
          label:
            "Sebagian warga kota mungkin lebih menyukai nasi daripada sagu.",
        },
      ],
    },
  },
};

export default item;
