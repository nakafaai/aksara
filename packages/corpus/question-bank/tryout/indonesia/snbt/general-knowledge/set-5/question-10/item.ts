import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Schriftliche Dokumente beweisen, dass mündliche Aussagen historisch wertlos sind.",
        },
        {
          isCorrect: false,
          label:
            "Das Archiv sollte die sicherste Aussage wählen und abweichende Aufnahmen löschen.",
        },
        {
          isCorrect: false,
          label:
            "Die Eröffnungsfeier fand Monate nach dem Umzug einiger Klassen statt.",
        },
        {
          isCorrect: true,
          label:
            "Die derzeit beste Deutung bleibt korrigierbar, weil historische Quellen die Vergangenheit nicht vollkommen abbilden.",
        },
        {
          isCorrect: false,
          label:
            "Verantwortliche historische Rekonstruktion vergleicht Quellen, erklärt Perspektiven und bewahrt Originale zur erneuten Prüfung.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Written documents prove that oral testimony has no historical value.",
        },
        {
          isCorrect: false,
          label:
            "The archive should choose the most confident witness and delete inconsistent recordings.",
        },
        {
          isCorrect: false,
          label:
            "The opening ceremony took place months after some classes moved.",
        },
        {
          isCorrect: true,
          label:
            "The best current interpretation remains open to correction because historical sources do not record the past perfectly.",
        },
        {
          isCorrect: false,
          label:
            "Responsible historical reconstruction compares sources, explains viewpoints, and preserves originals for reassessment.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Dokumen tertulis membuktikan bahwa kesaksian lisan tidak memiliki nilai sejarah.",
        },
        {
          isCorrect: false,
          label:
            "Arsip harus memilih narasumber yang paling yakin dan menghapus rekaman yang tidak sesuai.",
        },
        {
          isCorrect: false,
          label:
            "Upacara peresmian berlangsung beberapa bulan setelah sebagian kelas pindah.",
        },
        {
          isCorrect: true,
          label:
            "Tafsir terbaik saat ini tetap terbuka untuk koreksi karena sumber sejarah tidak merekam masa lalu secara sempurna.",
        },
        {
          isCorrect: false,
          label:
            "Rekonstruksi sejarah yang bertanggung jawab membandingkan sumber, menjelaskan sudut pandang, dan mempertahankan bahan asli untuk penilaian ulang.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
