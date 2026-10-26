import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "pada Senin, tim menguji contoh pencatatan waktu pada formulir kebisingan.",
        },
        {
          correct: true,
          label:
            "Pada Senin, tim menguji contoh pencatatan waktu pada formulir kebisingan.",
        },
        {
          correct: false,
          label:
            "Pada senin, tim menguji contoh pencatatan waktu pada formulir kebisingan.",
        },
        {
          correct: false,
          label:
            "Pada Senin, Tim menguji contoh pencatatan waktu pada formulir kebisingan.",
        },
        {
          correct: false,
          label:
            "Pada Senin tim menguji contoh pencatatan waktu pada formulir kebisingan",
        },
      ],
    },
  },
  stimulus: "passage-2",
};

export default item;
