import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "fiction",
    topic: "fiction-evidence",
  },
  stimulus: "chess-draw",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Bima menghafal satu pembukaan dari buku perpustakaan.",
        },
        {
          correct: false,
          label: "Bima menahan senyum ketika Kakek berpikir lama.",
        },
        {
          correct: false,
          label: "Bima menatap papan dengan kecewa setelah permainan remis.",
        },
        {
          correct: false,
          label: "Kuda Bima mengancam benteng dan menteri Kakek sekaligus.",
        },
        {
          correct: true,
          label:
            "Bima tetap mengingat kalimat catatannya setiap kali menyusun bidak walaupun tulisannya sudah dihapus.",
        },
      ],
    },
  },
};

export default item;
