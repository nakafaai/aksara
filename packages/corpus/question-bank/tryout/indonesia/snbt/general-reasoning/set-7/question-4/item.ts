import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Arins Arbeitssitzung läuft ohne Unterbrechung weiter.",
        },
        {
          isCorrect: true,
          label:
            "Arins Zugangsausweis wird bis zum Abschluss der Überprüfung gesperrt.",
        },
        {
          isCorrect: false,
          label: "Arins Zugangsausweis bleibt während der Überprüfung aktiv.",
        },
        {
          isCorrect: false,
          label: "Der Zugangsausweis der Aufsichtsperson wird gesperrt.",
        },
        {
          isCorrect: false,
          label: "Der Laserschneider wird dauerhaft aus dem Labor entfernt.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Arin's session continues without interruption.",
        },
        {
          isCorrect: true,
          label: "Arin's access badge is suspended pending review.",
        },
        {
          isCorrect: false,
          label: "Arin's access badge remains active during the review.",
        },
        {
          isCorrect: false,
          label: "The supervisor's access badge is suspended.",
        },
        {
          isCorrect: false,
          label: "The laser cutter is permanently removed from the laboratory.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Sesi Arin berlanjut tanpa dihentikan.",
        },
        {
          isCorrect: true,
          label: "Kartu akses Arin ditangguhkan sampai peninjauan selesai.",
        },
        {
          isCorrect: false,
          label: "Kartu akses Arin tetap aktif selama peninjauan.",
        },
        {
          isCorrect: false,
          label: "Kartu akses pengawas ditangguhkan.",
        },
        {
          isCorrect: false,
          label:
            "Mesin pemotong laser dikeluarkan secara permanen dari laboratorium.",
        },
      ],
    },
  },
};

export default item;
