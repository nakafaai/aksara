import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "continuation",
  },
  stimulus: "change-coins",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Nisa melepas karton karena uang yang kurang sudah dikembalikan",
        },
        {
          correct: false,
          label:
            "Nisa menolak melayani pembeli yang membayar dengan uang besar",
        },
        { correct: false, label: "ibu Nisa melarang Nisa menjaga warung lagi" },
        {
          correct: false,
          label: "Nisa menaikkan harga kue untuk menutup kekurangan uang",
        },
        {
          correct: true,
          label:
            "Nisa tetap menghitung kembalian dua kali walaupun antrean sedang panjang",
        },
      ],
    },
  },
};

export default item;
