import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Anwohner verloren ihre Motorräder",
        },
        {
          isCorrect: false,
          label: "Die Bewohner sind ängstlich und unruhig",
        },
        {
          isCorrect: true,
          label: "Der Sicherheitsdienst patrouilliert regelmäßig",
        },
        {
          isCorrect: false,
          label: "In Gang Mawar kommt es fast jede Woche zu Diebstählen",
        },
        {
          isCorrect: false,
          label: "Sicherheitskräfte patrouillieren nicht regelmäßig",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Residents lost their motorcycles",
        },
        {
          isCorrect: false,
          label: "Residents are anxious and restless",
        },
        {
          isCorrect: true,
          label: "Security guards patrol regularly",
        },
        {
          isCorrect: false,
          label: "Theft occurs almost every week in Gang Mawar",
        },
        {
          isCorrect: false,
          label: "Security guards do not patrol regularly",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Warga kehilangan motor",
        },
        {
          isCorrect: false,
          label: "Warga resah dan gelisah",
        },
        {
          isCorrect: true,
          label: "Petugas keamanan berpatroli secara rutin",
        },
        {
          isCorrect: false,
          label: "Hampir setiap minggu terjadi pencurian di Gang Mawar",
        },
        {
          isCorrect: false,
          label: "Petugas keamanan tidak berpatroli secara rutin",
        },
      ],
    },
  },
};

export default item;
