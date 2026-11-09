import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "continuation",
  },
  stimulus: "video-call",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Nenek Sumi memberikan kantong kerupuk itu kepada Arif sebagai ucapan terima kasih",
        },
        {
          correct: false,
          label: "Nenek Sumi menjual ponselnya karena terlalu sulit dipakai",
        },
        {
          correct: false,
          label: "Nenek Sumi meminta Laras berhenti melakukan panggilan video",
        },
        {
          correct: false,
          label: "Arif meminta bayaran mahal untuk pelajarannya",
        },
        {
          correct: false,
          label: "Nenek Sumi membuang kertas gambar tombol dari Arif",
        },
      ],
    },
  },
};

export default item;
