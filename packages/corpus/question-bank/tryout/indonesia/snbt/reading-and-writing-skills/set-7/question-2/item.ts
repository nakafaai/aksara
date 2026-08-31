import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Ergebnisse entfernt, die nicht zur Erwartung passten",
        },
        {
          isCorrect: false,
          label: "alle Daten wegen der kurzen Versuchsdauer verworfen",
        },
        {
          isCorrect: false,
          label: "den Bericht gekürzt, damit er weniger Wörter enthielt",
        },
        {
          isCorrect: false,
          label: "die Messung bis zur dauerhaften Einführung verschoben",
        },
        {
          isCorrect: true,
          label:
            "den Geltungsbereich der Aussage auf die vorhandenen Versuchsbedingungen beschränkt",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "removed results that did not fit expectations",
        },
        {
          isCorrect: false,
          label: "rejected all data because the trial was brief",
        },
        {
          isCorrect: false,
          label: "shortened the report so that it used fewer words",
        },
        {
          isCorrect: false,
          label: "postponed measurement until the change became permanent",
        },
        {
          isCorrect: true,
          label:
            "restricted the scope of the claim to the available trial conditions",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "menghapus hasil yang tidak sesuai dengan harapan",
        },
        {
          isCorrect: false,
          label: "menolak seluruh data karena masa uji singkat",
        },
        {
          isCorrect: false,
          label: "meringkas laporan agar jumlah katanya lebih sedikit",
        },
        {
          isCorrect: false,
          label: "menunda pengukuran sampai perubahan diterapkan tetap",
        },
        {
          isCorrect: true,
          label: "menahan jangkauan klaim pada kondisi uji yang tersedia",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
