import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Die Genauigkeit der Nachricht hängt von erhaltener Absicht und Handlung ab, nicht von Wortgleichheit.",
        },
        {
          isCorrect: false,
          label:
            "Eine im zweiten Test erfolgreiche Übersetzung kann sicher überall unverändert eingesetzt werden.",
        },
        {
          isCorrect: false,
          label:
            "Eine Übersetzung muss jedem Ausgangswort folgen, auch wenn Bewohner die Handlung missverstehen.",
        },
        {
          isCorrect: false,
          label:
            "Das Team stellte in der neuen Nachricht die Handlung vor die Begründung.",
        },
        {
          isCorrect: false,
          label:
            "Eine Notfallnachricht muss Bedeutung und Handlung in verständlicher Sprache bewahren, statt nur die amtliche Wortfolge zu kopieren.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Message accuracy depends on preserving intent and action, not on word-for-word sameness.",
        },
        {
          isCorrect: false,
          label:
            "A translation that passes the second test can certainly be used unchanged in every region.",
        },
        {
          isCorrect: false,
          label:
            "A translation must follow every source word even when residents misunderstand the required action.",
        },
        {
          isCorrect: false,
          label:
            "The team placed the action before the reason in the revised message.",
        },
        {
          isCorrect: false,
          label:
            "An emergency message must preserve meaning and action in language residents understand, not merely copy official word order.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Ketepatan pesan dinilai dari terjaganya maksud dan tindakan, bukan dari kesamaan kata demi kata.",
        },
        {
          isCorrect: false,
          label:
            "Satu terjemahan yang lulus uji kedua pasti dapat digunakan tanpa perubahan di seluruh daerah.",
        },
        {
          isCorrect: false,
          label:
            "Terjemahan harus mengikuti setiap kata sumber meskipun warga salah memahami tindakan yang diminta.",
        },
        {
          isCorrect: false,
          label:
            "Tim menempatkan tindakan sebelum alasan dalam susunan pesan baru.",
        },
        {
          isCorrect: false,
          label:
            "Pesan darurat perlu mempertahankan makna dan tindakan melalui bahasa yang dipahami warga, bukan sekadar menyalin urutan kata resmi.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
