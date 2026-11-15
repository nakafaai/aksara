import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "calculation",
  },
  stimulus: "bus-ridership",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "naik sekitar $$33\\%$$, sama dengan kenaikan banyak penumpang",
        },
        {
          correct: false,
          label: "turun $$40\\%$$, sama dengan penurunan tarif",
        },
        {
          correct: false,
          label:
            "naik sekitar $$20\\%$$, karena penumpang bertambah lebih cepat daripada tarif turun",
        },
        {
          correct: true,
          label:
            "turun sekitar $$20\\%$$, dari Rp$$180$$ juta menjadi sekitar Rp$$143$$ juta",
        },
        {
          correct: false,
          label:
            "turun sekitar $$25\\%$$, dengan pendapatan November sebagai pembagi",
        },
      ],
    },
  },
};

export default item;
