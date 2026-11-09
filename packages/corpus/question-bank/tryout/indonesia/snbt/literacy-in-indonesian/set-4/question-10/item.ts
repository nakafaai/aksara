import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "character",
  },
  stimulus: "island-teacher",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Ia sudah menyerahkan surat itu ke kantor dinas dan menyimpan salinannya.",
        },
        {
          correct: false,
          label: "Ia ingin murid-muridnya menemukan surat itu dan membacanya.",
        },
        {
          correct: true,
          label:
            "Ia menunda niat mundur tanpa sepenuhnya membuang kemungkinan itu.",
        },
        {
          correct: false,
          label: "Ia lupa membawa surat itu ke kantor dinas karena kelelahan.",
        },
        {
          correct: false,
          label: "Ia memutuskan pindah mengajar ke sekolah lain di pulau itu.",
        },
      ],
    },
  },
};

export default item;
