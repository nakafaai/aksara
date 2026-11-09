import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "paragraph-meaning",
    topic: "cause",
  },
  stimulus: "panas",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "matahari bersinar lebih lama di pusat kota daripada di daerah pinggiran",
        },
        {
          correct: false,
          label:
            "aspal dan beton memantulkan seluruh panas matahari kembali ke udara",
        },
        {
          correct: true,
          label:
            "panas yang diserap aspal dan beton pada siang hari dilepaskan perlahan",
        },
        {
          correct: false,
          label:
            "pepohonan di kota menguapkan terlalu banyak air pada malam hari",
        },
        {
          correct: false,
          label:
            "angin malam membawa udara panas dari daerah pinggiran ke kota",
        },
      ],
    },
  },
};

export default item;
