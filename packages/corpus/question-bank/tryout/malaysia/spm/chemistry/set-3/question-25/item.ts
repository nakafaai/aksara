import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "redox-equilibrium",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "The nail touching zinc rusts fastest, because zinc speeds up the corrosion of iron",
        },
        {
          correct: true,
          label:
            "The nail touching copper rusts fastest, because iron is more electropositive than copper and gives electrons to it",
        },
        {
          correct: false,
          label:
            "The nail touching magnesium shows the most dark blue colour, because magnesium makes iron lose electrons",
        },
        {
          correct: false,
          label:
            "The pink colour around a nail shows that iron(II) ions are forming there",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Paku yang bersentuhan dengan zink paling cepat berkarat, kerana zink mempercepatkan kakisan besi",
        },
        {
          correct: true,
          label:
            "Paku yang bersentuhan dengan kuprum paling cepat berkarat, kerana besi lebih elektropositif daripada kuprum dan memberikan elektron kepadanya",
        },
        {
          correct: false,
          label:
            "Paku yang bersentuhan dengan magnesium menunjukkan paling banyak warna biru tua, kerana magnesium menyebabkan besi kehilangan elektron",
        },
        {
          correct: false,
          label:
            "Warna merah jambu di sekeliling paku menunjukkan ion ferum(II) terbentuk di situ",
        },
      ],
    },
  },
};

export default item;
