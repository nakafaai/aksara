import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Das Team wird den Versuch mit dem Ausfüllbeispiel erneut wiederholen, um belastbarere Belege als zuvor zu erhalten.",
        },
        {
          isCorrect: true,
          label:
            "Das Team wird den Versuch mit dem Ausfüllbeispiel wiederholen, um belastbarere Belege zu erhalten.",
        },
        {
          isCorrect: false,
          label:
            "Um belastbarere Belege zu erhalten, wird der Versuch mit dem Ausfüllbeispiel vom Team erneut wiederholt werden.",
        },
        {
          isCorrect: false,
          label:
            "Das Team wird eine Tätigkeit durchführen, nämlich die Wiederholung des Versuchs mit dem Ausfüllbeispiel, um belastbarere Belege zu erhalten.",
        },
        {
          isCorrect: false,
          label:
            "Das Team wird den Versuch wiederholen, um belastbarere Belege zu dem Ausfüllbeispiel zu erhalten, das es bereits getestet hat.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The team will repeat the test of the timing example again to obtain evidence that is stronger than before.",
        },
        {
          isCorrect: true,
          label:
            "The team will repeat the test of the timing example to obtain stronger evidence.",
        },
        {
          isCorrect: false,
          label:
            "To obtain stronger evidence, the test of the timing example will be repeated again by the team.",
        },
        {
          isCorrect: false,
          label:
            "The team will carry out the activity of repeating the test of the timing example to obtain stronger evidence.",
        },
        {
          isCorrect: false,
          label:
            "The team will repeat the test to obtain stronger evidence about the timing example that it has already tested.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Tim akan mengulang kembali uji contoh pencatatan waktu suara untuk memperoleh bukti yang lebih kuat daripada sebelumnya.",
        },
        {
          isCorrect: true,
          label:
            "Tim akan mengulang uji contoh pencatatan waktu suara untuk memperoleh bukti yang lebih kuat.",
        },
        {
          isCorrect: false,
          label:
            "Untuk memperoleh bukti yang lebih kuat, uji contoh pencatatan waktu suara akan diulang kembali oleh tim.",
        },
        {
          isCorrect: false,
          label:
            "Tim akan melakukan kegiatan berupa pengulangan uji contoh pencatatan waktu suara demi memperoleh bukti yang lebih kuat.",
        },
        {
          isCorrect: false,
          label:
            "Tim akan mengulang uji untuk memperoleh bukti yang lebih kuat tentang contoh pencatatan waktu suara yang telah diuji sebelumnya.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
