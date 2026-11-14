import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "fiction",
    topic: "emotional-response",
  },
  stimulus: "video-call",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "marah karena Laras mengejek neneknya sendiri",
        },
        {
          correct: true,
          label:
            "ikut tersenyum karena kekeliruan kecil itu terjadi dalam suasana hangat dan segera teratasi",
        },
        {
          correct: false,
          label: "sedih karena Nenek Sumi gagal melakukan panggilan video",
        },
        { correct: false, label: "cemas karena ponsel Nenek Sumi rusak" },
        {
          correct: false,
          label: "kecewa karena Arif mengajari Nenek Sumi dengan salah",
        },
      ],
    },
  },
};

export default item;
