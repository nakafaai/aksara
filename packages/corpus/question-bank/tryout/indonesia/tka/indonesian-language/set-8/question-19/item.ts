import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "fiction",
    topic: "setting-character-phenomenon",
  },
  stimulus: "video-call",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Ia belajar dari Arif, anak tetangga kelas lima SD.",
        },
        {
          correct: false,
          label: "Ia bertanya kepada tetangga dewasa di sekitar rumahnya.",
        },
        { correct: true, label: "Ia melatih jarinya setiap malam." },
        {
          correct: true,
          label:
            "Ia menyimpan gambar tombol buatan Arif di bawah toples kerupuk.",
        },
      ],
    },
  },
};

export default item;
