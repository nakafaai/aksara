import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "research-design",
  },
  stimulus: "chili-prices",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Harga rata-rata cabai rawit di pasar induk yang sama pada bulan Juli dan Agustus tahun itu",
        },
        {
          correct: false,
          label:
            "Harga cabai merah besar di pasar induk itu pada bulan Januari sampai Juni tahun itu",
        },
        {
          correct: false,
          label:
            "Pendapat para pembeli di pasar induk tentang harga cabai rawit pada bulan Februari",
        },
        {
          correct: true,
          label:
            "Curah hujan dan pasokan pada bulan yang sama selama beberapa tahun di kabupaten itu",
        },
        {
          correct: false,
          label:
            "Jumlah pedagang cabai rawit di pasar induk itu pada setiap bulan selama tahun itu",
        },
      ],
    },
  },
};

export default item;
