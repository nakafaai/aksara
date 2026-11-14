import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "meaning-relations",
  },
  stimulus: "solar-lamps",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "curah hujan yang rendah membuktikan bahwa pembersihan panel tidak berpengaruh",
        },
        {
          correct: false,
          label:
            "curah hujan yang rendah merupakan akibat dari pemindahan dua tiang lampu",
        },
        {
          correct: false,
          label:
            "curah hujan yang rendah menjelaskan mengapa warga merasa lebih aman",
        },
        {
          correct: false,
          label:
            "curah hujan yang rendah menyebabkan daun ketapang lebih banyak menutup panel",
        },
        {
          correct: true,
          label:
            "curah hujan yang rendah menjadi kemungkinan penjelasan lain sehingga pengaruh pembersihan panel belum pasti",
        },
      ],
    },
  },
};

export default item;
