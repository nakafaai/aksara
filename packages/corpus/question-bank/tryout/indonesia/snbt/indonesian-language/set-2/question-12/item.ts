import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Gajah betina selalu menjaga anaknya sendirian",
        },
        {
          isCorrect: false,
          label: "Gajah betina jumlahnya lebih banyak daripada jantan",
        },
        {
          isCorrect: false,
          label: "Gajah betina selalu menempuh perjalanan paling jauh",
        },
        {
          isCorrect: true,
          label:
            "Pergerakannya dapat mewakili kelompok keluarga yang dipimpinnya",
        },
        {
          isCorrect: false,
          label: "Gajah betina selalu dikawal oleh gajah jantan",
        },
      ],
    },
  },
};

export default item;
