import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Pada Senin, tim menguji daftar pemeriksaan di studio rekaman sekolah.",
        },
        {
          correct: false,
          label:
            "pada Senin, tim menguji daftar pemeriksaan di studio rekaman sekolah.",
        },
        {
          correct: false,
          label:
            "Pada senin, tim menguji daftar pemeriksaan di studio rekaman sekolah.",
        },
        {
          correct: false,
          label:
            "Pada Senin, Tim menguji daftar pemeriksaan di studio rekaman sekolah.",
        },
        {
          correct: false,
          label:
            "Pada Senin tim menguji daftar pemeriksaan di studio rekaman sekolah",
        },
      ],
    },
  },
  stimulus: "passage-2",
};

export default item;
