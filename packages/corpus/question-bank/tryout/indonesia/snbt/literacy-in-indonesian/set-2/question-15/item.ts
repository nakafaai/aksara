import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Tahapan mengidentifikasi gajah sasaran",
        },
        {
          correct: false,
          label: "Perkiraan populasi gajah sumatra di Riau",
        },
        {
          correct: true,
          label:
            "Pemanfaatan GPS Collar untuk memitigasi interaksi negatif manusia dan gajah",
        },
        {
          correct: false,
          label: "Peran BBKSDA Riau dalam konservasi satwa liar",
        },
        {
          correct: false,
          label: "Kerja sama masyarakat dalam memulihkan habitat gajah",
        },
      ],
    },
  },
};

export default item;
