import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "fiction",
    topic: "fiction-evidence",
  },
  stimulus: "training-wheels",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Raras menggeleng ketika ayahnya menunggu dengan kunci motor, lalu menuntun sepeda keluar dari pagar.",
        },
        {
          correct: false,
          label: "Raras bisa meluncur beberapa meter tanpa menurunkan kaki.",
        },
        {
          correct: false,
          label: "Raras jatuh dua kali, sekali ke rumput dan sekali ke aspal.",
        },
        {
          correct: false,
          label: "Raras menjawab bahwa ia lebih suka berjalan kaki.",
        },
        {
          correct: false,
          label:
            "Raras hampir oleng karena kaget melihat kakaknya jauh di tengah lapangan.",
        },
      ],
    },
  },
};

export default item;
