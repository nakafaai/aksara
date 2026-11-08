import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "explicit-information",
  },
  stimulus: "novel-review",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Dialog antarwarga terdengar kaku dan terlalu banyak dijelaskan narator.",
        },
        {
          correct: false,
          label:
            "Catatan harian sang kakek terlalu panjang sehingga mengganggu alur cerita.",
        },
        {
          correct: false,
          label:
            "Cerita terlalu banyak membahas sejarah desa dan kurang membahas masa kini.",
        },
        {
          correct: true,
          label:
            "Bagian akhirnya tergesa-gesa dan sebagian tokoh pendukung kurang digarap.",
        },
        {
          correct: false,
          label:
            "Tokoh Sinta digambarkan tidak memahami persoalan mata air yang kering.",
        },
      ],
    },
  },
};

export default item;
