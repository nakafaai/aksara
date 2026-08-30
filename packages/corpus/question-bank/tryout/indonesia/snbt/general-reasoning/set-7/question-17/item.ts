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
              text: "Miras Bericht gelangt in die Warteschlange für die endgültige Entscheidung.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Miras Bericht hat die Vollständigkeitsprüfung nicht bestanden.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Miras Antrag wurde bereits genehmigt." },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Die fachliche Prüfung wird bei Miras Bericht übersprungen.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Jeder Bericht in der endgültigen Warteschlange wird automatisch genehmigt.",
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
              text: "Mira's report enters the final decision queue.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Mira's report failed the completeness check.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Mira's application has already been approved.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "The analyst review is skipped for Mira's report.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Every report in the final queue is automatically approved.",
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
              text: "Laporan Mira masuk ke antrean keputusan akhir.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Laporan Mira tidak lulus pemeriksaan kelengkapan.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Pengajuan Mira sudah disetujui." }],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Penelaahan analis dilewati untuk laporan Mira.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Setiap laporan dalam antrean akhir disetujui secara otomatis.",
            },
          ],
        },
      ],
    },
  },
};

export default item;
