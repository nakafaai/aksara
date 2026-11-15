import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "author-view",
  },
  stimulus: "pantun-tradition",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Sampiran itu menyimpan makna tersembunyi bahwa air pasang melambangkan kemakmuran yang membuat orang sombong.",
        },
        {
          correct: true,
          label:
            "Sampiran itu terutama menyiapkan bunyi akhir -ur dan -i yang muncul lagi di baris isi, sedangkan kaitan gambarannya dengan nasihat itu paling jauh hanya longgar.",
        },
        {
          correct: false,
          label:
            "Sampiran itu menyiapkan bunyi akhir -ur dan -i, dan gambarannya pasti menggemakan isi karena nelayan yang pulang melambangkan orang yang mencari ilmu.",
        },
        {
          correct: false,
          label:
            "Sampiran itu tidak berfungsi, karena rimanya a-a-b-b sehingga bait itu bukan pantun.",
        },
        {
          correct: false,
          label:
            "Sampiran itu lebih penting daripada isi, karena gambaran pantai lebih mudah diingat pendengar.",
        },
      ],
    },
  },
};

export default item;
