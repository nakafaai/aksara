import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "fiction",
    topic: "fiction-evidence",
  },
  stimulus: "change-coins",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Nisa tidak bisa memperhatikan guru sepanjang pelajaran.",
        },
        {
          correct: false,
          label:
            "Bapak berjaket ojek baru sadar kembaliannya kelebihan ketika berada di pangkalan.",
        },
        {
          correct: true,
          label:
            "Bapak berjaket ojek berkata ia juga mau antre lebih sabar setelah membaca tulisan Nisa.",
        },
        {
          correct: false,
          label:
            "Nisa menyusun uang receh di dalam gelas plastik sesuai nilainya.",
        },
        {
          correct: false,
          label: "Empat anak berseragam putih abu-abu berteriak memesan.",
        },
      ],
    },
  },
};

export default item;
