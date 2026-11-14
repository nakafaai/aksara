import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "flaw",
  },
  stimulus: "hotel-occupancy",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Ia hanya memakai data musim ramai dan mengabaikan musim sepi.",
        },
        {
          correct: true,
          label:
            "Ia menyamakan persentase kamar yang terisi dengan banyaknya wisatawan, padahal kamar terisi per malam di Lembahdaun paling sedikit di antara ketiga kota.",
        },
        {
          correct: false,
          label: "Ia tidak menyebut tarif kamar hotel di Lembahdaun.",
        },
        {
          correct: false,
          label:
            "Ia membandingkan Lembahdaun dengan kota yang tidak berada di provinsi yang sama.",
        },
        {
          correct: false,
          label:
            "Ia memakai data tahun 2024, padahal data tahun 2023 untuk Lembahdaun tidak tersedia.",
        },
      ],
    },
  },
};

export default item;
