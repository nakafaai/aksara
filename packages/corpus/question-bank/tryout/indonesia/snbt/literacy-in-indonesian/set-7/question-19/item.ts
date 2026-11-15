import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "argument-evaluation",
  },
  stimulus: "bus-ridership",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Seandainya Koridor A dan B juga hanya naik $$10\\%$$ seperti Koridor C dan D, total November sekitar $$39{,}6$$ ribu, jadi tarif saja kira-kira menjelaskan $$3{,}6$$ dari $$11{,}8$$ ribu tambahan penumpang.",
        },
        {
          correct: false,
          label:
            "Total naik dari $$36$$ ribu ke $$47{,}8$$ ribu, yaitu sekitar $$33\\%$$, jadi klaim wali kota sudah tepat dan tidak punya kelemahan.",
        },
        {
          correct: false,
          label:
            "Seandainya semua koridor naik $$60\\%$$ seperti Koridor A, total November sekitar $$57{,}6$$ ribu, jadi tarif murah seharusnya menambah penumpang lebih dari sepertiga.",
        },
        {
          correct: false,
          label:
            "Koridor A naik $$60\\%$$ dan Koridor B naik $$50\\%$$, jadi tarif murah paling berpengaruh di koridor yang busnya lebih sering.",
        },
        {
          correct: false,
          label:
            "Pendapatan tiket turun dari Rp$$180$$ juta menjadi sekitar Rp$$143$$ juta per hari kerja, jadi penumpang sebenarnya tidak bertambah.",
        },
      ],
    },
  },
};

export default item;
