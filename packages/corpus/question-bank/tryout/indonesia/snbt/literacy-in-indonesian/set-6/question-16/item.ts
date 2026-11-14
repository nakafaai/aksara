import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "conclusion",
  },
  stimulus: "hotel-occupancy",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Lembahdaun kehilangan kamar terisi per malam paling banyak dari musim ramai ke musim sepi, karena tingkat huniannya turun paling tajam.",
        },
        {
          correct: false,
          label:
            "Karangwangi paling menguntungkan bagi pemilik hotel, karena tingkat huniannya paling stabil di antara kedua musim.",
        },
        {
          correct: false,
          label:
            "Di ketiga kota, tingkat hunian musim sepi tepat separuh tingkat hunian musim ramai.",
        },
        {
          correct: true,
          label:
            "Dari musim ramai ke musim sepi, Tirtasari kehilangan kamar terisi per malam paling banyak, walaupun penurunan tingkat huniannya bukan yang paling besar.",
        },
        {
          correct: false,
          label:
            "Pada musim sepi, lebih dari separuh kamar hotel di setiap kota kosong.",
        },
      ],
    },
  },
};

export default item;
