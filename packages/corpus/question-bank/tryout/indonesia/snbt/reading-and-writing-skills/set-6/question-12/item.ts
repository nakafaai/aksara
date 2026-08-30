import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "am Montag prüfte das Team ein Beispiel zur Erfassung der Geräuschdauer im Kontext Lärmprotokoll im Wohngebiet.",
        },
        {
          isCorrect: false,
          label:
            "Am montag prüfte das Team ein Beispiel zur Erfassung der Geräuschdauer im Kontext Lärmprotokoll im Wohngebiet.",
        },
        {
          isCorrect: false,
          label:
            "Am Montag prüfte Das Team ein Beispiel zur Erfassung der Geräuschdauer im Kontext Lärmprotokoll im Wohngebiet.",
        },
        {
          isCorrect: false,
          label:
            "Am Montag, prüfte das Team ein Beispiel zur Erfassung der Geräuschdauer im Kontext Lärmprotokoll im Wohngebiet",
        },
        {
          isCorrect: true,
          label:
            "Am Montag prüfte das Team ein Beispiel zur Erfassung der Geräuschdauer im folgenden Kontext: Lärmprotokoll im Wohngebiet.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "on Monday, the team tested an example showing how to record sound duration in this setting (neighbourhood noise log).",
        },
        {
          isCorrect: false,
          label:
            "On monday, the team tested an example showing how to record sound duration in this setting (neighbourhood noise log).",
        },
        {
          isCorrect: false,
          label:
            "On Monday, The team tested an example showing how to record sound duration in this setting (neighbourhood noise log).",
        },
        {
          isCorrect: false,
          label:
            "On Monday the team tested an example showing how to record sound duration in this setting (neighbourhood noise log)",
        },
        {
          isCorrect: true,
          label:
            "On Monday, the team tested an example showing how to record sound duration in this setting (neighbourhood noise log).",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "pada Senin, tim menguji contoh cara mencatat durasi suara di pencatatan kebisingan lingkungan.",
        },
        {
          isCorrect: false,
          label:
            "Pada senin, tim menguji contoh cara mencatat durasi suara di pencatatan kebisingan lingkungan.",
        },
        {
          isCorrect: false,
          label:
            "Pada Senin, Tim menguji contoh cara mencatat durasi suara di pencatatan kebisingan lingkungan.",
        },
        {
          isCorrect: false,
          label:
            "Pada Senin tim menguji contoh cara mencatat durasi suara di pencatatan kebisingan lingkungan",
        },
        {
          isCorrect: true,
          label:
            "Pada Senin, tim menguji contoh cara mencatat durasi suara di pencatatan kebisingan lingkungan.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
