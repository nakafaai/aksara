import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Gajah betina selalu menjaga anaknya sendirian",
        },
        {
          correct: false,
          label: "Gajah betina jumlahnya lebih banyak daripada jantan",
        },
        {
          correct: true,
          label:
            "Pergerakannya dapat mewakili kelompok keluarga yang dipimpinnya",
        },
        {
          correct: false,
          label: "Gajah betina selalu menempuh perjalanan paling jauh",
        },
        {
          correct: false,
          label: "Gajah betina selalu dikawal oleh gajah jantan",
        },
      ],
    },
  },
};

export default item;
