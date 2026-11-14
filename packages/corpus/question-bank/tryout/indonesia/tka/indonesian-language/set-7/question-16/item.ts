import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "fiction",
    topic: "setting-character-phenomenon",
  },
  stimulus: "rain-stage",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Para penari sudah berlatih selama tiga bulan.",
        },
        { correct: true, label: "Lampu sorot berkedip, lalu padam." },
        {
          correct: true,
          label: "Laksmi berdiri di tengah panggung yang licin.",
        },
        {
          correct: true,
          label: "Cahaya senter ponsel bergoyang di atas genangan air.",
        },
      ],
    },
  },
};

export default item;
