import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "cause-effect",
  },
  stimulus: "tempe-mold",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Kapang *Rhizopus* menghasilkan B12 jauh lebih banyak di tempat pembuatan yang dingin.",
        },
        {
          correct: false,
          label:
            "Kedelai impor mengandung B12 lebih banyak daripada kedelai lokal.",
        },
        {
          correct: false,
          label:
            "Daun jati menambahkan B12 ke dalam tempe selama proses fermentasi.",
        },
        {
          correct: false,
          label:
            "Tempe yang terlalu basah mungkin menghasilkan B12 dua kali lipat.",
        },
        {
          correct: true,
          label:
            "B12 berasal dari bakteri yang ikut tumbuh, dan jumlahnya tidak selalu sama.",
        },
      ],
    },
  },
};

export default item;
