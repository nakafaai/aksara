import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "reading",
    topic: "referent",
  },
  stimulus: "rooftop-garden",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "menanam bibit dalam gelas plastik berisi sabut kelapa",
        },
        {
          correct: false,
          label: "menyiram tanaman setiap hari",
        },
        {
          correct: false,
          label: "memeriksa keasaman larutan dua kali seminggu",
        },
        {
          correct: false,
          label: "menjual hasil panen kepada guru dan orang tua siswa",
        },
        {
          correct: true,
          label: "mengalirkan larutan nutrisi terus-menerus melalui pipa dengan pompa dan kemiringan pipa",
        },
      ],
    },
  },
};

export default item;
