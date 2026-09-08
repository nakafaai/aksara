import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Das Team änderte nur einen Faktor: die Ergänzung eines Beispiels zur Zeiterfassung.",
        },
        {
          isCorrect: false,
          label:
            "Das Team änderte nur ein Faktor: die Ergänzung eines Beispiels zur Zeiterfassung.",
        },
        {
          isCorrect: false,
          label:
            "Das Team änderte nur einem Faktor: die Ergänzung eines Beispiels zur Zeiterfassung.",
        },
        {
          isCorrect: false,
          label:
            "Das Team änderte lediglich nur einen Faktor: die Ergänzung eines Beispiels zur Zeiterfassung.",
        },
        {
          isCorrect: false,
          label:
            "Das Team änderte nur einen Faktoren: die Ergänzung eines Beispiels zur Zeiterfassung.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "The team changed only one factor: adding an example of how to record sound timing.",
        },
        {
          isCorrect: false,
          label:
            "The team changed only one factors: adding an example of how to record sound timing.",
        },
        {
          isCorrect: false,
          label:
            "The team changed merely only one factor: adding an example of how to record sound timing.",
        },
        {
          isCorrect: false,
          label:
            "The team changed only one factor, namely: adding an example of how to record sound timing.",
        },
        {
          isCorrect: false,
          label:
            "The team changed only one factor; namely adding an example of how to record sound timing.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Tim mengubah satu faktor saja, yaitu penambahan contoh pencatatan waktu suara.",
        },
        {
          isCorrect: false,
          label:
            "Tim merubah satu faktor saja, yaitu penambahan contoh pencatatan waktu suara.",
        },
        {
          isCorrect: false,
          label:
            "Tim mengrubah satu faktor saja, yaitu penambahan contoh pencatatan waktu suara.",
        },
        {
          isCorrect: false,
          label:
            "Tim hanya mengubah satu faktor saja, yaitu penambahan contoh pencatatan waktu suara.",
        },
        {
          isCorrect: false,
          label:
            "Tim mengubah terhadap satu faktor saja, yaitu penambahan contoh pencatatan waktu suara.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
