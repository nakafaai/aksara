import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "fiction",
    topic: "fiction-evidence",
  },
  stimulus: "lost-cat",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Nayla menulis di buku hariannya bahwa ia ingin memelihara salah satu anak kucing.",
        },
        {
          correct: false,
          label: "Nayla meminjam ponsel ibunya untuk membuat selebaran.",
        },
        {
          correct: false,
          label: "Nayla bersepeda ke gudang beras sepulang sekolah.",
        },
        {
          correct: false,
          label: "Nayla menelepon ibunya karena tidak tahu harus berbuat apa.",
        },
        { correct: false, label: "Nayla menempelkan selebaran di pos ronda." },
      ],
    },
  },
};

export default item;
