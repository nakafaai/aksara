import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Sozialer Wandel wird ausschließlich durch Beziehungen zwischen Einzelpersonen verursacht",
        },
        {
          isCorrect: false,
          label: "Kontakt von außen ist die einzige Ursache sozialen Wandels",
        },
        {
          isCorrect: true,
          label:
            "Jede Gesellschaft verändert sich, und die Ursachen sozialen Wandels können innerhalb oder außerhalb der Gesellschaft liegen",
        },
        {
          isCorrect: false,
          label:
            "Forschende sollten alle Veränderungen untersuchen, ohne zuerst eine zentrale Veränderung zu bestimmen",
        },
        {
          isCorrect: false,
          label:
            "Eine Gesellschaft verändert sich nur unter dem Einfluss einer anderen Gesellschaft",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Social change is caused only by relationships between individuals",
        },
        {
          isCorrect: false,
          label: "External contact is the only source of social change",
        },
        {
          isCorrect: true,
          label:
            "Every society changes, and the sources of social change can be internal or external",
        },
        {
          isCorrect: false,
          label:
            "Researchers should study every change without identifying a primary one",
        },
        {
          isCorrect: false,
          label: "A society changes only when another society influences it",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Perubahan sosial hanya disebabkan oleh hubungan antarindividu",
        },
        {
          isCorrect: false,
          label:
            "Kontak dari luar merupakan satu-satunya sumber perubahan sosial",
        },
        {
          isCorrect: true,
          label:
            "Setiap masyarakat berubah, dan sumber perubahan sosial dapat berasal dari dalam maupun luar masyarakat",
        },
        {
          isCorrect: false,
          label:
            "Peneliti harus mengkaji semua perubahan tanpa menentukan perubahan utama",
        },
        {
          isCorrect: false,
          label:
            "Masyarakat hanya berubah ketika dipengaruhi oleh masyarakat lain",
        },
      ],
    },
  },
};

export default item;
