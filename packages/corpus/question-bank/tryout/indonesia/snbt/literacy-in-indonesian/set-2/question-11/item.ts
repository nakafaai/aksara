import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "character",
  },
  stimulus: "sewing-machine",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Mbah Darsih mulai menerima Sekar sebagai penerus yang layak menjahit bersamanya.",
        },
        {
          correct: false,
          label:
            "Mbah Darsih ingin berhenti menjahit dan menyerahkan semua pesanan kepada Sekar.",
        },
        {
          correct: false,
          label:
            "Mbah Darsih marah karena Sekar memakai mesin jahitnya tanpa izin.",
        },
        {
          correct: false,
          label:
            "Mbah Darsih menyiapkan tempat duduk bagi pembeli yang datang ke rumah.",
        },
        {
          correct: false,
          label: "Mbah Darsih berencana membeli mesin jahit kedua untuk Sekar.",
        },
      ],
    },
  },
};

export default item;
