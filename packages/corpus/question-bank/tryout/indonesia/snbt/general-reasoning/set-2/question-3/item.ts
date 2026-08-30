import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Anwohner verloren ihre Motorräder" }],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Die Bewohner sind ängstlich und unruhig" },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "In Gang Mawar kommt es fast jede Woche zu Diebstählen",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Sicherheitskräfte patrouillieren nicht regelmäßig",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Der Sicherheitsdienst patrouilliert regelmäßig",
            },
          ],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Residents lost their motorcycles" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Residents are anxious and restless" }],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Theft occurs almost every week in Gang Mawar",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Security guards do not patrol regularly" },
          ],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "Security guards patrol regularly" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Warga kehilangan motor" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Warga resah dan gelisah" }],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Hampir setiap minggu terjadi pencurian di Gang Mawar",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Petugas keamanan tidak berpatroli secara rutin",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            { kind: "text", text: "Petugas keamanan berpatroli secara rutin" },
          ],
        },
      ],
    },
  },
};

export default item;
