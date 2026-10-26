import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-2",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "pada Senin, tim menguji peta kecil dengan waktu tempuh di taman kota.",
        },
        {
          correct: false,
          label:
            "Pada senin, tim menguji peta kecil dengan waktu tempuh di taman kota.",
        },
        {
          correct: true,
          label:
            "Pada Senin, tim menguji peta kecil dengan waktu tempuh di taman kota.",
        },
        {
          correct: false,
          label:
            "Pada Senin, Tim menguji peta kecil dengan waktu tempuh di taman kota.",
        },
        {
          correct: false,
          label:
            "Pada Senin tim menguji peta kecil dengan waktu tempuh di taman kota",
        },
      ],
    },
  },
};

export default item;
