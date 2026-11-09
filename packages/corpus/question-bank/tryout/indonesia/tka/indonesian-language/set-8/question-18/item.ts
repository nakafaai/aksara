import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "meaning-relations",
  },
  stimulus: "video-call",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Arif sebenarnya seorang guru di sekolah dasar",
        },
        {
          correct: false,
          label: "Nenek Sumi salah menulis nama pembeli kerupuk",
        },
        {
          correct: true,
          label:
            "Nenek Sumi menghargai Arif sebagai guru yang telah mengajarinya, meskipun Arif masih anak-anak",
        },
        {
          correct: false,
          label: "Nenek Sumi ingin Arif menjadi guru di sekolah",
        },
        {
          correct: false,
          label: "kerupuk itu akan dijual kepada guru Arif di sekolah",
        },
      ],
    },
  },
};

export default item;
