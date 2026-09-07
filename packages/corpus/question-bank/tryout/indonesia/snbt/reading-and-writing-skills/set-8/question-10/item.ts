import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Das Team wird Fragen ordnen und Verständnis prüfen und dabei die Gruppengrößenvorgaben ändern.",
        },
        {
          isCorrect: true,
          label:
            "Das Team wird Fragetypen ordnen und Verständnis prüfen und dabei dieselben Gruppengrößenvorgaben beibehalten.",
        },
        {
          isCorrect: false,
          label:
            "Das Team wird nur Termine mit der höchsten Zahl fragender Besuchender wiederholen.",
        },
        {
          isCorrect: false,
          label:
            "Das Team wird die Karten statt weiterer Prüfungen dauerhaft einführen.",
        },
        {
          isCorrect: false,
          label:
            "Das Team wird die Gruppenvorgaben erhalten, ohne Verständnis oder Fragetypen zu untersuchen.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The team will classify questions and assess understanding while changing the group-size rules.",
        },
        {
          isCorrect: true,
          label:
            "The team will classify question types and assess understanding while retaining the group-size rules.",
        },
        {
          isCorrect: false,
          label:
            "The team will repeat only sessions with the highest number of visitors asking questions.",
        },
        {
          isCorrect: false,
          label:
            "The team will adopt the cards permanently instead of conducting further assessment.",
        },
        {
          isCorrect: false,
          label:
            "The team will retain group rules without assessing understanding or classifying questions.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Tim akan mengelompokkan pertanyaan dan menilai pemahaman sambil mengubah aturan ukuran kelompok.",
        },
        {
          isCorrect: true,
          label:
            "Tim akan mengelompokkan jenis pertanyaan dan menilai pemahaman sambil mempertahankan aturan ukuran kelompok.",
        },
        {
          isCorrect: false,
          label:
            "Tim akan mengulang hanya sesi dengan jumlah pengunjung yang bertanya paling tinggi.",
        },
        {
          isCorrect: false,
          label:
            "Tim akan menerapkan kartu permanen sebagai pengganti penilaian lanjutan.",
        },
        {
          isCorrect: false,
          label:
            "Tim akan mempertahankan aturan kelompok tanpa menilai pemahaman atau mengelompokkan pertanyaan.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
