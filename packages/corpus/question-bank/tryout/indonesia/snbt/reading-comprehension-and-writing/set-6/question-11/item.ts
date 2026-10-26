import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "analisa efektivitas contoh pencatatan waktu suara",
        },
        {
          correct: false,
          label: "analisis efektifitas contoh pencatatan waktu suara",
        },
        {
          correct: true,
          label: "analisis efektivitas contoh pencatatan waktu suara",
        },
        {
          correct: false,
          label: "analisa efektifitas contoh pencatatan waktu suara",
        },
        {
          correct: false,
          label:
            "analisis efektivitas contoh pencatatan dalam kontek kebisingan",
        },
      ],
    },
  },
  stimulus: "passage-2",
};

export default item;
