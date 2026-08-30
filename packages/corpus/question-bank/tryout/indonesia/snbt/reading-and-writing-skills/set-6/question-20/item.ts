import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "eine Wirksamkeitsanalyse zur geprüften Änderung im Kontext „Lärmprotokoll im Wohngebiet“",
        },
        {
          isCorrect: true,
          label:
            "Das Team verglich 32, 22 und 24, begrenzte die Aussage auf den untersuchten Kontext (Lärmprotokoll im Wohngebiet) und plante eine längere Wiederholung.",
        },
        {
          isCorrect: false,
          label:
            "Am Montag prüfte das Team ein Beispiel zur Erfassung der Geräuschdauer im folgenden Kontext: Lärmprotokoll im Wohngebiet.",
        },
        {
          isCorrect: false,
          label:
            "die Folgestudie des Teams im untersuchten Kontext (Lärmprotokoll im Wohngebiet)",
        },
        {
          isCorrect: false,
          label:
            "Die Nutzenden im untersuchten Kontext (Lärmprotokoll im Wohngebiet) gaben kurze Rückmeldungen.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "an analysis of the effectiveness of an example showing how to record sound duration in this setting (neighbourhood noise log)",
        },
        {
          isCorrect: true,
          label:
            "The team compared 32, 22, and 24, limited its claim to this setting (neighbourhood noise log), and planned a longer repetition.",
        },
        {
          isCorrect: false,
          label:
            "On Monday, the team tested an example showing how to record sound duration in this setting (neighbourhood noise log).",
        },
        {
          isCorrect: false,
          label:
            "the team's follow-up study of an example showing how to record sound duration in this setting (neighbourhood noise log)",
        },
        {
          isCorrect: false,
          label:
            "Users in this setting (neighbourhood noise log) provided brief comments.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "analisis efektivitas contoh cara mencatat durasi suara di pencatatan kebisingan lingkungan",
        },
        {
          isCorrect: true,
          label:
            "Tim membandingkan 32, 22, dan 24, membatasi klaim pada pencatatan kebisingan lingkungan, serta merencanakan pengulangan yang lebih panjang.",
        },
        {
          isCorrect: false,
          label:
            "Pada Senin, tim menguji contoh cara mencatat durasi suara di pencatatan kebisingan lingkungan.",
        },
        {
          isCorrect: false,
          label:
            "kerja sama tim dalam uji contoh cara mencatat durasi suara di pencatatan kebisingan lingkungan",
        },
        {
          isCorrect: false,
          label:
            "Para pengguna di pencatatan kebisingan lingkungan memberikan komentar singkat.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
