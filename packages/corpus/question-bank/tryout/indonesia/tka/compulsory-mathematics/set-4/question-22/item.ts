import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "data-probability",
    topic: "data",
  },
  stimulus: "school-transport",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Lebih dari $$40\\,\\%$$ siswa kelas XII naik angkutan umum.",
        },
        {
          correct: true,
          label:
            "Di antara siswa yang diantar keluarga, $$40\\,\\%$$ adalah siswa kelas X.",
        },
        {
          correct: false,
          label:
            "Siswa yang berjalan kaki kurang dari $$15\\,\\%$$ dari seluruh siswa.",
        },
        {
          correct: true,
          label:
            "Di setiap kelas, angkutan umum adalah cara berangkat yang paling banyak dipilih.",
        },
        {
          correct: false,
          label:
            "Persentase siswa yang bersepeda di kelas XI lebih besar daripada di kelas X.",
        },
      ],
    },
  },
};

export default item;
