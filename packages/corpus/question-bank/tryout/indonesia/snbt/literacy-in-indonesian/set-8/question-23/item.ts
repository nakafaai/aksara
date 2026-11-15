import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "text-structure",
  },
  stimulus: "thomas-cup-1958",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Keterangan itu mengoreksi cerita bahwa Indonesia menang hanya dengan semangat, dan kalimat itu menyimpulkannya: para pemain sudah terbentuk sebelum regu nasional ada.",
        },
        {
          correct: false,
          label:
            "Keterangan itu mengoreksi cerita bahwa Indonesia menang hanya dengan semangat, dan kalimat itu menjelaskan bahwa PBSI sudah menyiapkan perlengkapan dan tempat latihan bagi regu.",
        },
        {
          correct: false,
          label:
            "Keterangan itu membuktikan bahwa semangat tidak berperan dalam kemenangan, dan kalimat itu menyimpulkan bahwa para pemain sudah terbentuk sebelum regu nasional ada.",
        },
        {
          correct: false,
          label:
            "Keterangan itu menjelaskan mengapa Malaya kalah, dan kalimat itu menyimpulkan bahwa Malaya kekurangan pemain yang terlatih.",
        },
        {
          correct: false,
          label:
            "Keterangan itu menunjukkan bahwa pemerintah membiayai klub-klub sejak awal, dan kalimat itu menyimpulkan bahwa negara sudah menyiapkan regu sejak PBSI berdiri.",
        },
      ],
    },
  },
};

export default item;
