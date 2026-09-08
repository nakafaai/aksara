import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "am Montag prüfte das Team das Ausfüllbeispiel im Lärmformular.",
        },
        {
          isCorrect: true,
          label:
            "Am Montag prüfte das Team das Ausfüllbeispiel im Lärmformular.",
        },
        {
          isCorrect: false,
          label:
            "Am montag prüfte das Team das Ausfüllbeispiel im Lärmformular.",
        },
        {
          isCorrect: false,
          label:
            "Am Montag prüfte Das Team das Ausfüllbeispiel im Lärmformular.",
        },
        {
          isCorrect: false,
          label:
            "Am Montag, prüfte das Team das Ausfüllbeispiel im Lärmformular",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "on Monday, the team tested the timing example on the noise-report form.",
        },
        {
          isCorrect: true,
          label:
            "On Monday, the team tested the timing example on the noise-report form.",
        },
        {
          isCorrect: false,
          label:
            "On monday, the team tested the timing example on the noise-report form.",
        },
        {
          isCorrect: false,
          label:
            "On Monday, The team tested the timing example on the noise-report form.",
        },
        {
          isCorrect: false,
          label:
            "On Monday the team tested the timing example on the noise-report form",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "pada Senin, tim menguji contoh pencatatan waktu pada formulir kebisingan.",
        },
        {
          isCorrect: true,
          label:
            "Pada Senin, tim menguji contoh pencatatan waktu pada formulir kebisingan.",
        },
        {
          isCorrect: false,
          label:
            "Pada senin, tim menguji contoh pencatatan waktu pada formulir kebisingan.",
        },
        {
          isCorrect: false,
          label:
            "Pada Senin, Tim menguji contoh pencatatan waktu pada formulir kebisingan.",
        },
        {
          isCorrect: false,
          label:
            "Pada Senin tim menguji contoh pencatatan waktu pada formulir kebisingan",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
