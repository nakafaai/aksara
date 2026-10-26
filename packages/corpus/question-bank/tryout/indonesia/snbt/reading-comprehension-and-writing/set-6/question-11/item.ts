import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-2",
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
};

export default item;
