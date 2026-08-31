import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
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
          isCorrect: true,
          label:
            "Eine andere Wortwahl und Reihenfolge kann die Sicherheit erhöhen, obwohl der sachliche Inhalt gleich bleibt.",
        },
        {
          isCorrect: false,
          label:
            "Jede Fassung wird vor dem Einsatz erneut mit Bewohnern getestet.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
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
          isCorrect: true,
          label:
            "Changing word choice and information order can improve safety even when the factual content is unchanged.",
        },
        {
          isCorrect: false,
          label: "Each version will be tested again with residents before use.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
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
          isCorrect: true,
          label:
            "Perubahan urutan dan pilihan kata dapat meningkatkan keselamatan meskipun isi faktual pesannya tidak berubah.",
        },
        {
          isCorrect: false,
          label:
            "Setiap versi akan diuji lagi bersama warga sebelum digunakan.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
