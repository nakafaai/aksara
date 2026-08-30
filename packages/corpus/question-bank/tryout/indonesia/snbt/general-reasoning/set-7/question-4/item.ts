import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Arins Arbeitssitzung läuft ohne Unterbrechung weiter.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Arins Zugangsausweis bleibt während der Überprüfung aktiv.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Arins Zugangsausweis wird bis zum Abschluss der Überprüfung gesperrt.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Der Zugangsausweis der Aufsichtsperson wird gesperrt.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Der Laserschneider wird dauerhaft aus dem Labor entfernt.",
            },
          ],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Arin's session continues without interruption.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Arin's access badge remains active during the review.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Arin's access badge is suspended pending review.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "The supervisor's access badge is suspended.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "The laser cutter is permanently removed from the laboratory.",
            },
          ],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Sesi Arin berlanjut tanpa dihentikan." },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Kartu akses Arin tetap aktif selama peninjauan.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Kartu akses Arin ditangguhkan sampai peninjauan selesai.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Kartu akses pengawas ditangguhkan." }],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Mesin pemotong laser dikeluarkan secara permanen dari laboratorium.",
            },
          ],
        },
      ],
    },
  },
};

export default item;
