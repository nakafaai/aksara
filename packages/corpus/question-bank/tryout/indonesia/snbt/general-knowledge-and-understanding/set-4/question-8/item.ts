import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "paragraph-meaning",
    topic: "paragraph-relation",
  },
  stimulus: "rempah",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Paragraf pertama dan kedua membandingkan cengkih dengan pala.",
        },
        {
          correct: false,
          label:
            "Paragraf kedua membantah keterangan harga pada paragraf pertama.",
        },
        {
          correct: false,
          label:
            "Paragraf pertama berisi contoh-contoh perdagangan rempah, sedangkan paragraf kedua berisi definisi tentang rempah dan cara menanamnya di luar Maluku.",
        },
        {
          correct: false,
          label:
            "Kedua paragraf menceritakan riwayat hidup seorang pedagang rempah.",
        },
        {
          correct: true,
          label:
            "Paragraf pertama menjelaskan kelangkaan dan mahalnya rempah, sedangkan paragraf kedua menjelaskan akibat yang ditimbulkannya.",
        },
      ],
    },
  },
};

export default item;
