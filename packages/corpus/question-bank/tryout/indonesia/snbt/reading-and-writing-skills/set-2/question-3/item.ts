import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Ein Familien-Medienplan sollte Kindern Grenzen setzen, weil für Erwachsene ebenfalls Grenzen bei der Mediennutzung gelten sollten.",
        },
        {
          isCorrect: false,
          label:
            "Ein Familien-Medienplan sollte Kindern Grenzen setzen, sobald für Erwachsene ebenfalls Grenzen bei der Mediennutzung gelten sollten.",
        },
        {
          isCorrect: false,
          label:
            "Ein Familien-Medienplan sollte Kindern Grenzen setzen, für Erwachsene sollten ebenfalls Grenzen bei der Mediennutzung gelten.",
        },
        {
          isCorrect: false,
          label:
            "Ein Familien-Medienplan sollte Kindern Grenzen setzen; deshalb sollten für Erwachsene ebenfalls Grenzen bei der Mediennutzung gelten.",
        },
        {
          isCorrect: true,
          label:
            "Ein Familien-Medienplan sollte Kindern Grenzen setzen, aber für Erwachsene sollten ebenfalls Grenzen bei der Mediennutzung gelten.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "A family media plan should set boundaries for children, because adults should also have boundaries for media use.",
        },
        {
          isCorrect: false,
          label:
            "A family media plan should set boundaries for children, as soon as adults should also have boundaries for media use.",
        },
        {
          isCorrect: false,
          label:
            "A family media plan should set boundaries for children, adults should also have boundaries for media use.",
        },
        {
          isCorrect: false,
          label:
            "A family media plan should set boundaries for children; therefore, adults should also have boundaries for media use.",
        },
        {
          isCorrect: true,
          label:
            "A family media plan should set boundaries for children, but adults should also have boundaries for media use.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Rencana media keluarga perlu menetapkan batas bagi anak, karena orang dewasa juga perlu memiliki batas penggunaan media.",
        },
        {
          isCorrect: false,
          label:
            "Rencana media keluarga perlu menetapkan batas bagi anak, ketika orang dewasa juga perlu memiliki batas penggunaan media.",
        },
        {
          isCorrect: false,
          label:
            "Rencana media keluarga perlu menetapkan batas bagi anak, orang dewasa juga perlu memiliki batas penggunaan media.",
        },
        {
          isCorrect: false,
          label:
            "Rencana media keluarga perlu menetapkan batas bagi anak; oleh karena itu, orang dewasa juga perlu memiliki batas penggunaan media.",
        },
        {
          isCorrect: true,
          label:
            "Rencana media keluarga perlu menetapkan batas bagi anak, tetapi orang dewasa juga perlu memiliki batas penggunaan media.",
        },
      ],
    },
  },
};

export default item;
