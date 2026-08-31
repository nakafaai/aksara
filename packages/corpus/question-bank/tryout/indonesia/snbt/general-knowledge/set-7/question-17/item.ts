import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Eine verantwortliche Bearbeitung darf die Form ändern, wenn Quellen, Änderungen und Vielfalt nachvollziehbar bleiben.",
        },
        {
          isCorrect: false,
          label:
            "Einige Darsteller wollen jeden alten Satz beibehalten, damit die Aufführung als treu gilt.",
        },
        {
          isCorrect: false,
          label:
            "Die Gruppe wird Quellen und dramaturgische Änderungen im Programm nennen.",
        },
        {
          isCorrect: true,
          label:
            "Drei mündliche Aufnahmen unterscheiden sich bei Figuren, Ablauf und Ende.",
        },
        {
          isCorrect: false,
          label:
            "Jede Änderung einer Bearbeitung schadet zwangsläufig der Tradition.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "A responsible adaptation may change a story's form while keeping its sources, changes, and diversity traceable.",
        },
        {
          isCorrect: false,
          label:
            "Some performers want to retain every old line so the production will be considered faithful.",
        },
        {
          isCorrect: false,
          label:
            "The group will identify sources and dramatic changes in the programme notes.",
        },
        {
          isCorrect: true,
          label:
            "Three oral recordings differ in characters, sequence, and ending.",
        },
        {
          isCorrect: false,
          label: "Every change in an adaptation necessarily damages tradition.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Adaptasi yang bertanggung jawab dapat mengubah bentuk cerita selama sumber, perubahan, dan keragamannya tetap dapat ditelusuri.",
        },
        {
          isCorrect: false,
          label:
            "Sebagian pemain ingin mempertahankan seluruh dialog lama agar pertunjukan dianggap setia.",
        },
        {
          isCorrect: false,
          label:
            "Kelompok akan mencantumkan sumber dan perubahan dramatik dalam catatan program.",
        },
        {
          isCorrect: true,
          label:
            "Tiga rekaman lisan berbeda dalam tokoh, urutan peristiwa, dan akhir.",
        },
        {
          isCorrect: false,
          label: "Setiap perubahan dalam adaptasi pasti merusak tradisi.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
