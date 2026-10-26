import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "kerjasama tim dalam uji contoh pencatatan waktu",
        },
        {
          correct: false,
          label: "kerja-sama tim dalam uji contoh pencatatan waktu",
        },
        {
          correct: false,
          label: "kerja samah tim dalam uji contoh pencatatan waktu",
        },
        {
          correct: true,
          label: "kerja sama tim dalam uji contoh pencatatan waktu",
        },
        {
          correct: false,
          label: "kerja sama-sama tim dalam uji contoh pencatatan waktu",
        },
      ],
    },
  },
  stimulus: "passage-2",
};

export default item;
