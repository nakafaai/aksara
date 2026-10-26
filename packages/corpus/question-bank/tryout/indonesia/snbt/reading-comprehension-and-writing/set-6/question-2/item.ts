import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "menyebabkan nilai awal menjadi lebih rendah",
        },
        {
          correct: false,
          label: "menggantikan nilai pembanding dalam perhitungan",
        },
        {
          correct: true,
          label: "memiliki nilai numerik yang lebih tinggi daripada",
        },
        {
          correct: false,
          label: "berada di luar rentang yang boleh diukur",
        },
        {
          correct: false,
          label: "membuktikan perubahan sebagai satu-satunya penyebab",
        },
      ],
    },
  },
  stimulus: "passage-1",
};

export default item;
