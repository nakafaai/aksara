import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "cause-effect",
  },
  stimulus: "rumah-gadang",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Tiang yang diletakkan di atas batu sandi dapat bergeser sedikit ketika tanah berguncang.",
        },
        {
          correct: false,
          label:
            "Atap yang curam ikut mengalirkan guncangan ke tanah bersama air hujan.",
        },
        {
          correct: true,
          label: "Sambungan pasak dapat bergerak sedikit tanpa patah.",
        },
        {
          correct: false,
          label:
            "Pasak kayu mengunci sambungan begitu rapat sehingga rumah tidak bergerak sama sekali.",
        },
        {
          correct: true,
          label:
            "Bangunan yang kaku menahan seluruh guncangan sampai bagian terlemahnya patah.",
        },
      ],
    },
  },
};

export default item;
