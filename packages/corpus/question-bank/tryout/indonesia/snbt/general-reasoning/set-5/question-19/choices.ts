import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label:
        "Jede Gesellschaft verändert sich, und die Ursachen sozialen Wandels können innerhalb oder außerhalb der Gesellschaft liegen",
      value: true,
    },
    {
      label:
        "Sozialer Wandel wird ausschließlich durch Beziehungen zwischen Einzelpersonen verursacht",
      value: false,
    },
    {
      label: "Kontakt von außen ist die einzige Ursache sozialen Wandels",
      value: false,
    },
    {
      label:
        "Forschende sollten alle Veränderungen untersuchen, ohne zuerst eine zentrale Veränderung zu bestimmen",
      value: false,
    },
    {
      label:
        "Eine Gesellschaft verändert sich nur unter dem Einfluss einer anderen Gesellschaft",
      value: false,
    },
  ],
  en: [
    {
      label:
        "Every society changes, and the sources of social change can be internal or external",
      value: true,
    },
    {
      label:
        "Social change is caused only by relationships between individuals",
      value: false,
    },
    {
      label: "External contact is the only source of social change",
      value: false,
    },
    {
      label:
        "Researchers should study every change without identifying a primary one",
      value: false,
    },
    {
      label: "A society changes only when another society influences it",
      value: false,
    },
  ],
  id: [
    {
      label:
        "Setiap masyarakat berubah, dan sumber perubahan sosial dapat berasal dari dalam maupun luar masyarakat",
      value: true,
    },
    {
      label: "Perubahan sosial hanya disebabkan oleh hubungan antarindividu",
      value: false,
    },
    {
      label: "Kontak dari luar merupakan satu-satunya sumber perubahan sosial",
      value: false,
    },
    {
      label:
        "Peneliti harus mengkaji semua perubahan tanpa menentukan perubahan utama",
      value: false,
    },
    {
      label: "Masyarakat hanya berubah ketika dipengaruhi oleh masyarakat lain",
      value: false,
    },
  ],
};

export default choices;
