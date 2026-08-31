import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Zufällige Feldprüfungen zeigen, dass die nach Besuchsintensität bereinigte Karte die Setzlingsdichte gut vorhersagt.",
        },
        {
          isCorrect: false,
          label:
            "Kennzeichnungen für Freiwillige erhöhen die Zahl der Meldungen entlang beliebter Wege, ohne die selten besuchten Flächen zusätzlich abzudecken.",
        },
        {
          isCorrect: true,
          label:
            "Zufallsprüfungen zeigen, dass Besuchsmöglichkeiten und Klassifikationsgenauigkeit von Anfang an überall identisch waren.",
        },
        {
          isCorrect: false,
          label:
            "Die öffentliche Karte wird Meldungen, Beobachtungsintensität und Validierung trennen.",
        },
        {
          isCorrect: false,
          label: "Bei Flutaufnahmen blieb die Übereinstimmung geringer.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Random field surveys find that the visit-adjusted map predicts seedling density well.",
        },
        {
          isCorrect: false,
          label:
            "Volunteer badges increase the number of reports along popular paths without adding coverage in rarely visited areas.",
        },
        {
          isCorrect: true,
          label:
            "Random surveys show that visit opportunity and classification accuracy were identical at every site from the beginning.",
        },
        {
          isCorrect: false,
          label:
            "The public map will separate reports, observation intensity, and validation.",
        },
        {
          isCorrect: false,
          label: "Agreement remained lower for high-tide photographs.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Survei lapangan acak menemukan bahwa peta yang telah disesuaikan dengan intensitas kunjungan memprediksi kepadatan bibit dengan baik.",
        },
        {
          isCorrect: false,
          label:
            "Tanda pengenal relawan meningkatkan jumlah laporan di jalur populer tanpa menambah cakupan pada area yang jarang dikunjungi.",
        },
        {
          isCorrect: true,
          label:
            "Survei acak menunjukkan peluang kunjungan dan ketepatan klasifikasi sama di semua lokasi sejak pencatatan dimulai.",
        },
        {
          isCorrect: false,
          label:
            "Peta publik akan memisahkan laporan, intensitas pengamatan, dan validasi.",
        },
        {
          isCorrect: false,
          label: "Kesepakatan pada foto saat air pasang tetap lebih rendah.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
