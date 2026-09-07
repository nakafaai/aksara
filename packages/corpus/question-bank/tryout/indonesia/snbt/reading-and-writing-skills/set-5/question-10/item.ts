import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Mit einem geänderten Maß für die Übereinstimmung wird das Team Beispielfotos bei mehr Baumarten prüfen.",
        },
        {
          isCorrect: true,
          label:
            "Mit demselben Maß für die Übereinstimmung wird das Team Beispielfotos bei mehr Baumarten prüfen.",
        },
        {
          isCorrect: false,
          label:
            "Das Team wird nur die Termine mit der höchsten Übereinstimmung wiederholen.",
        },
        {
          isCorrect: false,
          label:
            "Das Team wird Beispielfotos ohne weitere Prüfung dauerhaft einführen.",
        },
        {
          isCorrect: false,
          label:
            "Das Team wird Beispielfotos nur bei den bereits vertretenen Baumarten prüfen.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Using a revised measure of observer agreement, the team will test sample photographs with more tree species.",
        },
        {
          isCorrect: true,
          label:
            "Using the same measure of observer agreement, the team will test sample photographs with more tree species.",
        },
        {
          isCorrect: false,
          label:
            "The team will repeat only the sessions with the highest observer agreement.",
        },
        {
          isCorrect: false,
          label:
            "The team will adopt sample photographs permanently without further testing.",
        },
        {
          isCorrect: false,
          label:
            "The team will test sample photographs only with the species already represented.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Dengan ukuran kesepakatan yang diubah, tim akan menguji contoh foto pada lebih banyak jenis pohon.",
        },
        {
          isCorrect: true,
          label:
            "Dengan ukuran kesepakatan yang sama, tim akan menguji contoh foto pada lebih banyak jenis pohon.",
        },
        {
          isCorrect: false,
          label:
            "Tim akan mengulang hanya sesi yang menghasilkan kesepakatan tertinggi.",
        },
        {
          isCorrect: false,
          label:
            "Tim akan menerapkan contoh foto secara permanen tanpa pengujian lanjutan.",
        },
        {
          isCorrect: false,
          label:
            "Tim akan menguji contoh foto hanya pada jenis pohon yang sudah terwakili.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
