import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Weitere Analysen bestätigen, dass Spuren mehrerer Zeiten wesentlich zur Nutzungsgeschichte gehören.",
        },
        {
          isCorrect: false,
          label:
            "Nutzer sind sich uneinig, ob moderne Ergänzungen farblich abgesetzt werden sollen, erkennen aber weiterhin die älteren Bauteile.",
        },
        {
          isCorrect: false,
          label:
            "Jedes neue Teil wird dokumentiert, damit Veränderungen erkennbar bleiben.",
        },
        {
          isCorrect: false,
          label: "Die älteste Farbe wurde nur in wenigen Räumen gefunden.",
        },
        {
          isCorrect: true,
          label:
            "Neue Prüfungen zeigen, dass sämtliches vermeintlich altes Material aus einer undokumentierten modernen Renovierung stammt.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Additional analysis confirms that traces from several periods are central to the hall's history of use.",
        },
        {
          isCorrect: false,
          label:
            "Users disagree about whether modern additions should be marked in a contrasting colour, but they still identify the older building elements.",
        },
        {
          isCorrect: false,
          label: "Every new part will be recorded so changes remain legible.",
        },
        {
          isCorrect: false,
          label: "The oldest paint was found in only a few rooms.",
        },
        {
          isCorrect: true,
          label:
            "New testing shows that all supposedly old material came from an undocumented modern renovation.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Analisis tambahan memastikan jejak dari beberapa masa memang menjadi bagian penting riwayat penggunaan balai.",
        },
        {
          isCorrect: false,
          label:
            "Pengguna berbeda pendapat tentang perlunya penanda warna pada tambahan modern, tetapi tetap dapat mengenali unsur bangunan yang lebih tua.",
        },
        {
          isCorrect: false,
          label:
            "Setiap bagian baru akan dicatat agar perubahan tetap terbaca.",
        },
        {
          isCorrect: false,
          label: "Cat tertua hanya ditemukan di beberapa ruang.",
        },
        {
          isCorrect: true,
          label:
            "Pemeriksaan baru menunjukkan semua bahan yang dianggap lama ternyata dipasang pada renovasi modern yang tidak terdokumentasi.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
