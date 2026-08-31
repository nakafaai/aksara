import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Inklusive Beteiligung verlangt den Abbau tatsächlicher Hindernisse und die Prüfung der Repräsentation, nicht nur eine offene Einladung.",
        },
        {
          isCorrect: false,
          label:
            "Einige Organisatoren schlagen vor, dass alle Einwohner ihre Meinung nur über ein Onlineformular einreichen.",
        },
        {
          isCorrect: true,
          label:
            "Bewohner der Hügel mussten vor der Entscheidung gehen, und für die gehörlose Person gab es keine Gebärdensprachdolmetscherin.",
        },
        {
          isCorrect: false,
          label:
            "Die endgültige Entscheidung wird Auswahl, Einwände und Einfluss der Beiträge festhalten.",
        },
        {
          isCorrect: false,
          label:
            "Eine Beratung ist nur gültig, wenn jeder Vorschlag angenommen wird.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Inclusive participation requires reducing practical barriers and examining representation, not merely issuing an open invitation.",
        },
        {
          isCorrect: false,
          label:
            "Some organisers propose that every resident simply submit opinions through an online form.",
        },
        {
          isCorrect: true,
          label:
            "Hill residents had to leave before the decision and the Deaf participant had no sign-language interpreter.",
        },
        {
          isCorrect: false,
          label:
            "The final decision will record the choice, objections, and the influence of contributions.",
        },
        {
          isCorrect: false,
          label:
            "A consultation is valid only if every resident proposal is ultimately accepted.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Partisipasi yang inklusif menuntut pengurangan hambatan nyata dan pemeriksaan keterwakilan, bukan sekadar undangan terbuka.",
        },
        {
          isCorrect: false,
          label:
            "Sebagian panitia mengusulkan agar semua warga cukup menyampaikan pendapat melalui formulir daring.",
        },
        {
          isCorrect: true,
          label:
            "Warga perbukitan harus pergi sebelum keputusan dan peserta Tuli tidak mendapat juru bahasa isyarat.",
        },
        {
          isCorrect: false,
          label:
            "Keputusan akhir akan mencatat pilihan, keberatan, dan pengaruh masukan.",
        },
        {
          isCorrect: false,
          label:
            "Musyawarah hanya sah jika setiap usulan warga akhirnya diterima.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
