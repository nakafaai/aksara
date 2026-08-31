import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "frühere Ergebnisse ohne neue Messung verwenden",
        },
        {
          isCorrect: true,
          label:
            "einheitliche Kriterien und Verfahren anwenden, damit Ergebnisse vergleichbar sind",
        },
        {
          isCorrect: false,
          label:
            "das Messgerät wechseln, sobald ein Wert nicht zur Erwartung passt",
        },
        {
          isCorrect: false,
          label: "alle Werte vor der Mittelwertbildung angleichen",
        },
        {
          isCorrect: false,
          label: "Teilnehmende zu einheitlichen Antworten verpflichten",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "using earlier results without making new measurements",
        },
        {
          isCorrect: true,
          label:
            "applying consistent criteria and procedures so that results can be compared",
        },
        {
          isCorrect: false,
          label:
            "changing the instrument whenever a value does not fit expectations",
        },
        {
          isCorrect: false,
          label: "making all values equal before calculating a mean",
        },
        {
          isCorrect: false,
          label:
            "restricting participants so that they produce uniform answers",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "menggunakan hasil lama tanpa melakukan pengukuran baru",
        },
        {
          isCorrect: true,
          label:
            "memakai kriteria dan prosedur yang konsisten agar hasil dapat dibandingkan",
        },
        {
          isCorrect: false,
          label: "mengubah alat ukur setiap kali nilai tidak sesuai harapan",
        },
        {
          isCorrect: false,
          label: "menyamakan semua nilai sebelum menghitung rata-rata",
        },
        {
          isCorrect: false,
          label: "membatasi peserta agar menghasilkan jawaban seragam",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
