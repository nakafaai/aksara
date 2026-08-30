import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Ein Familien-Medienplan sollte Kindern Grenzen setzen, weil die gleichen Grenzen auch für Erwachsene gelten sollten.",
        },
        {
          isCorrect: false,
          label:
            "Ein Familien-Medienplan sollte Kindern Grenzen setzen, obwohl die gleichen Grenzen auch für Erwachsene gelten sollten.",
        },
        {
          isCorrect: true,
          label:
            "Ein Familien-Medienplan sollte Kindern Grenzen setzen, aber die gleichen Grenzen sollten auch für Erwachsene gelten.",
        },
        {
          isCorrect: false,
          label:
            "Ein Familien-Medienplan sollte Kindern Grenzen setzen, die gleichen Grenzen sollten auch für Erwachsene gelten.",
        },
        {
          isCorrect: false,
          label:
            "Ein Familien-Medienplan sollte Kindern Grenzen setzen; deshalb sollten die gleichen Grenzen auch für Erwachsene gelten.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "A family media plan should set boundaries for children, because the same boundaries should also apply to adults.",
        },
        {
          isCorrect: false,
          label:
            "A family media plan should set boundaries for children, although the same boundaries should also apply to adults.",
        },
        {
          isCorrect: true,
          label:
            "A family media plan should set boundaries for children, but the same boundaries should also apply to adults.",
        },
        {
          isCorrect: false,
          label:
            "A family media plan should set boundaries for children, the same boundaries should also apply to adults.",
        },
        {
          isCorrect: false,
          label:
            "A family media plan should set boundaries for children; therefore, the same boundaries should also apply to adults.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Rencana media keluarga perlu menetapkan batas bagi anak, karena batas yang sama juga perlu berlaku bagi orang dewasa.",
        },
        {
          isCorrect: false,
          label:
            "Rencana media keluarga perlu menetapkan batas bagi anak, meskipun batas yang sama juga perlu berlaku bagi orang dewasa.",
        },
        {
          isCorrect: true,
          label:
            "Rencana media keluarga perlu menetapkan batas bagi anak, tetapi batas yang sama juga perlu berlaku bagi orang dewasa.",
        },
        {
          isCorrect: false,
          label:
            "Rencana media keluarga perlu menetapkan batas bagi anak, batas yang sama juga perlu berlaku bagi orang dewasa.",
        },
        {
          isCorrect: false,
          label:
            "Rencana media keluarga perlu menetapkan batas bagi anak; oleh karena itu, batas yang sama juga perlu berlaku bagi orang dewasa.",
        },
      ],
    },
  },
};

export default item;
