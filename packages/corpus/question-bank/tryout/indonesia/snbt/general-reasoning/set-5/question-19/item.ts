import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Jede Gesellschaft verändert sich, und die Ursachen sozialen Wandels können innerhalb oder außerhalb der Gesellschaft liegen",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Sozialer Wandel wird ausschließlich durch Beziehungen zwischen Einzelpersonen verursacht",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Kontakt von außen ist die einzige Ursache sozialen Wandels",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Forschende sollten alle Veränderungen untersuchen, ohne zuerst eine zentrale Veränderung zu bestimmen",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Eine Gesellschaft verändert sich nur unter dem Einfluss einer anderen Gesellschaft",
            },
          ],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Every society changes, and the sources of social change can be internal or external",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Social change is caused only by relationships between individuals",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "External contact is the only source of social change",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Researchers should study every change without identifying a primary one",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "A society changes only when another society influences it",
            },
          ],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Setiap masyarakat berubah, dan sumber perubahan sosial dapat berasal dari dalam maupun luar masyarakat",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Perubahan sosial hanya disebabkan oleh hubungan antarindividu",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Kontak dari luar merupakan satu-satunya sumber perubahan sosial",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Peneliti harus mengkaji semua perubahan tanpa menentukan perubahan utama",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Masyarakat hanya berubah ketika dipengaruhi oleh masyarakat lain",
            },
          ],
        },
      ],
    },
  },
};

export default item;
