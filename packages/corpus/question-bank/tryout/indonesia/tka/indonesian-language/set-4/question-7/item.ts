import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "fiction",
    topic: "setting-character-phenomenon",
  },
  stimulus: "change-coins",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Empat anak berseragam putih abu-abu berteriak memesan sambil menyodorkan uang receh.",
        },
        {
          correct: false,
          label:
            "Nisa menyusun uang receh di dalam gelas plastik sesuai nilainya.",
        },
        {
          correct: true,
          label:
            "Nisa buru-buru melayani anak-anak setelah menyerahkan kembalian.",
        },
        {
          correct: false,
          label: "Bapak berjaket ojek menunjuk karton di depan warung.",
        },
      ],
    },
  },
};

export default item;
