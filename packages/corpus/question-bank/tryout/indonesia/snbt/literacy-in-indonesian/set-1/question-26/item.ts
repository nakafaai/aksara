import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "conclusion",
  },
  stimulus: "kawi-script",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Aksara Jawa dan Bali kembali menjadi aksara utama dalam kehidupan sehari-hari masyarakat.",
        },
        {
          correct: false,
          label:
            "Huruf Latin akan segera tergantikan oleh aksara daerah karena aksara daerah sudah dapat diketik di ponsel.",
        },
        {
          correct: false,
          label:
            "Standar pengodean komputer menjadi penyebab tersisihnya aksara turunan Kawi.",
        },
        {
          correct: false,
          label:
            "Aksara Arab dan huruf Latin tidak pernah dipakai pada masa yang sama dengan aksara turunan Kawi.",
        },
        {
          correct: true,
          label:
            "Aksara turunan Kawi kembali dipelajari meskipun tidak lagi menjadi alat tulis utama sehari-hari karena masyarakat menganggapnya bagian dari jati diri.",
        },
      ],
    },
  },
};

export default item;
