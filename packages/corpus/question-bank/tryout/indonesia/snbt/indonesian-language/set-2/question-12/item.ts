import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Gajah betina selalu menjaga anaknya sendirian",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Pergerakannya dapat mewakili kelompok keluarga yang dipimpinnya",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Gajah betina jumlahnya lebih banyak daripada jantan",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Gajah betina selalu menempuh perjalanan paling jauh",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Gajah betina selalu dikawal oleh gajah jantan",
            },
          ],
        },
      ],
    },
  },
};

export default item;
