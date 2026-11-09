import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "fiction",
    topic: "theme-message",
  },
  stimulus: "island-teacher",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "guru sebaiknya tidak menyeberang ketika laut sedang berbahaya bagi perahu kecil",
        },
        {
          correct: false,
          label:
            "kenaikan honor adalah satu-satunya cara agar guru di pulau terpencil bertahan",
        },
        {
          correct: false,
          label:
            "nelayan lebih memahami cuaca laut daripada nakhoda kapal motor",
        },
        {
          correct: true,
          label:
            "kesungguhan orang yang dilayani dapat memperbarui semangat di tengah kesulitan",
        },
        {
          correct: false,
          label:
            "murid yang rajin menghafal perkalian akan selalu disayangi gurunya",
        },
      ],
    },
  },
};

export default item;
