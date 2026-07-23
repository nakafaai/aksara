import { Stream } from "effect";

import { quranSurah1 } from "#corpus/quran/surah/1";
import { quranSurah2 } from "#corpus/quran/surah/2";
import { quranSurah3 } from "#corpus/quran/surah/3";
import { quranSurah4 } from "#corpus/quran/surah/4";
import { quranSurah5 } from "#corpus/quran/surah/5";
import { quranSurah6 } from "#corpus/quran/surah/6";
import { quranSurah7 } from "#corpus/quran/surah/7";
import { quranSurah8 } from "#corpus/quran/surah/8";
import { quranSurah9 } from "#corpus/quran/surah/9";
import { quranSurah10 } from "#corpus/quran/surah/10";
import { quranSurah11 } from "#corpus/quran/surah/11";
import { quranSurah12 } from "#corpus/quran/surah/12";
import { quranSurah13 } from "#corpus/quran/surah/13";
import { quranSurah14 } from "#corpus/quran/surah/14";
import { quranSurah15 } from "#corpus/quran/surah/15";
import { quranSurah16 } from "#corpus/quran/surah/16";
import { quranSurah17 } from "#corpus/quran/surah/17";
import { quranSurah18 } from "#corpus/quran/surah/18";
import { quranSurah19 } from "#corpus/quran/surah/19";
import { quranSurah20 } from "#corpus/quran/surah/20";
import { quranSurah21 } from "#corpus/quran/surah/21";
import { quranSurah22 } from "#corpus/quran/surah/22";
import { quranSurah23 } from "#corpus/quran/surah/23";
import { quranSurah24 } from "#corpus/quran/surah/24";
import { quranSurah25 } from "#corpus/quran/surah/25";
import { quranSurah26 } from "#corpus/quran/surah/26";
import { quranSurah27 } from "#corpus/quran/surah/27";
import { quranSurah28 } from "#corpus/quran/surah/28";
import { quranSurah29 } from "#corpus/quran/surah/29";
import { quranSurah30 } from "#corpus/quran/surah/30";
import { quranSurah31 } from "#corpus/quran/surah/31";
import { quranSurah32 } from "#corpus/quran/surah/32";
import { quranSurah33 } from "#corpus/quran/surah/33";
import { quranSurah34 } from "#corpus/quran/surah/34";
import { quranSurah35 } from "#corpus/quran/surah/35";
import { quranSurah36 } from "#corpus/quran/surah/36";
import { quranSurah37 } from "#corpus/quran/surah/37";
import { quranSurah38 } from "#corpus/quran/surah/38";
import { quranSurah39 } from "#corpus/quran/surah/39";
import { quranSurah40 } from "#corpus/quran/surah/40";
import { quranSurah41 } from "#corpus/quran/surah/41";
import { quranSurah42 } from "#corpus/quran/surah/42";
import { quranSurah43 } from "#corpus/quran/surah/43";
import { quranSurah44 } from "#corpus/quran/surah/44";
import { quranSurah45 } from "#corpus/quran/surah/45";
import { quranSurah46 } from "#corpus/quran/surah/46";
import { quranSurah47 } from "#corpus/quran/surah/47";
import { quranSurah48 } from "#corpus/quran/surah/48";
import { quranSurah49 } from "#corpus/quran/surah/49";
import { quranSurah50 } from "#corpus/quran/surah/50";
import { quranSurah51 } from "#corpus/quran/surah/51";
import { quranSurah52 } from "#corpus/quran/surah/52";
import { quranSurah53 } from "#corpus/quran/surah/53";
import { quranSurah54 } from "#corpus/quran/surah/54";
import { quranSurah55 } from "#corpus/quran/surah/55";
import { quranSurah56 } from "#corpus/quran/surah/56";
import { quranSurah57 } from "#corpus/quran/surah/57";
import { quranSurah58 } from "#corpus/quran/surah/58";
import { quranSurah59 } from "#corpus/quran/surah/59";
import { quranSurah60 } from "#corpus/quran/surah/60";
import { quranSurah61 } from "#corpus/quran/surah/61";
import { quranSurah62 } from "#corpus/quran/surah/62";
import { quranSurah63 } from "#corpus/quran/surah/63";
import { quranSurah64 } from "#corpus/quran/surah/64";
import { quranSurah65 } from "#corpus/quran/surah/65";
import { quranSurah66 } from "#corpus/quran/surah/66";
import { quranSurah67 } from "#corpus/quran/surah/67";
import { quranSurah68 } from "#corpus/quran/surah/68";
import { quranSurah69 } from "#corpus/quran/surah/69";
import { quranSurah70 } from "#corpus/quran/surah/70";
import { quranSurah71 } from "#corpus/quran/surah/71";
import { quranSurah72 } from "#corpus/quran/surah/72";
import { quranSurah73 } from "#corpus/quran/surah/73";
import { quranSurah74 } from "#corpus/quran/surah/74";
import { quranSurah75 } from "#corpus/quran/surah/75";
import { quranSurah76 } from "#corpus/quran/surah/76";
import { quranSurah77 } from "#corpus/quran/surah/77";
import { quranSurah78 } from "#corpus/quran/surah/78";
import { quranSurah79 } from "#corpus/quran/surah/79";
import { quranSurah80 } from "#corpus/quran/surah/80";
import { quranSurah81 } from "#corpus/quran/surah/81";
import { quranSurah82 } from "#corpus/quran/surah/82";
import { quranSurah83 } from "#corpus/quran/surah/83";
import { quranSurah84 } from "#corpus/quran/surah/84";
import { quranSurah85 } from "#corpus/quran/surah/85";
import { quranSurah86 } from "#corpus/quran/surah/86";
import { quranSurah87 } from "#corpus/quran/surah/87";
import { quranSurah88 } from "#corpus/quran/surah/88";
import { quranSurah89 } from "#corpus/quran/surah/89";
import { quranSurah90 } from "#corpus/quran/surah/90";
import { quranSurah91 } from "#corpus/quran/surah/91";
import { quranSurah92 } from "#corpus/quran/surah/92";
import { quranSurah93 } from "#corpus/quran/surah/93";
import { quranSurah94 } from "#corpus/quran/surah/94";
import { quranSurah95 } from "#corpus/quran/surah/95";
import { quranSurah96 } from "#corpus/quran/surah/96";
import { quranSurah97 } from "#corpus/quran/surah/97";
import { quranSurah98 } from "#corpus/quran/surah/98";
import { quranSurah99 } from "#corpus/quran/surah/99";
import { quranSurah100 } from "#corpus/quran/surah/100";
import { quranSurah101 } from "#corpus/quran/surah/101";
import { quranSurah102 } from "#corpus/quran/surah/102";
import { quranSurah103 } from "#corpus/quran/surah/103";
import { quranSurah104 } from "#corpus/quran/surah/104";
import { quranSurah105 } from "#corpus/quran/surah/105";
import { quranSurah106 } from "#corpus/quran/surah/106";
import { quranSurah107 } from "#corpus/quran/surah/107";
import { quranSurah108 } from "#corpus/quran/surah/108";
import { quranSurah109 } from "#corpus/quran/surah/109";
import { quranSurah110 } from "#corpus/quran/surah/110";
import { quranSurah111 } from "#corpus/quran/surah/111";
import { quranSurah112 } from "#corpus/quran/surah/112";
import { quranSurah113 } from "#corpus/quran/surah/113";
import { quranSurah114 } from "#corpus/quran/surah/114";

const quranSurahSources: readonly unknown[] = [
  quranSurah1,
  quranSurah2,
  quranSurah3,
  quranSurah4,
  quranSurah5,
  quranSurah6,
  quranSurah7,
  quranSurah8,
  quranSurah9,
  quranSurah10,
  quranSurah11,
  quranSurah12,
  quranSurah13,
  quranSurah14,
  quranSurah15,
  quranSurah16,
  quranSurah17,
  quranSurah18,
  quranSurah19,
  quranSurah20,
  quranSurah21,
  quranSurah22,
  quranSurah23,
  quranSurah24,
  quranSurah25,
  quranSurah26,
  quranSurah27,
  quranSurah28,
  quranSurah29,
  quranSurah30,
  quranSurah31,
  quranSurah32,
  quranSurah33,
  quranSurah34,
  quranSurah35,
  quranSurah36,
  quranSurah37,
  quranSurah38,
  quranSurah39,
  quranSurah40,
  quranSurah41,
  quranSurah42,
  quranSurah43,
  quranSurah44,
  quranSurah45,
  quranSurah46,
  quranSurah47,
  quranSurah48,
  quranSurah49,
  quranSurah50,
  quranSurah51,
  quranSurah52,
  quranSurah53,
  quranSurah54,
  quranSurah55,
  quranSurah56,
  quranSurah57,
  quranSurah58,
  quranSurah59,
  quranSurah60,
  quranSurah61,
  quranSurah62,
  quranSurah63,
  quranSurah64,
  quranSurah65,
  quranSurah66,
  quranSurah67,
  quranSurah68,
  quranSurah69,
  quranSurah70,
  quranSurah71,
  quranSurah72,
  quranSurah73,
  quranSurah74,
  quranSurah75,
  quranSurah76,
  quranSurah77,
  quranSurah78,
  quranSurah79,
  quranSurah80,
  quranSurah81,
  quranSurah82,
  quranSurah83,
  quranSurah84,
  quranSurah85,
  quranSurah86,
  quranSurah87,
  quranSurah88,
  quranSurah89,
  quranSurah90,
  quranSurah91,
  quranSurah92,
  quranSurah93,
  quranSurah94,
  quranSurah95,
  quranSurah96,
  quranSurah97,
  quranSurah98,
  quranSurah99,
  quranSurah100,
  quranSurah101,
  quranSurah102,
  quranSurah103,
  quranSurah104,
  quranSurah105,
  quranSurah106,
  quranSurah107,
  quranSurah108,
  quranSurah109,
  quranSurah110,
  quranSurah111,
  quranSurah112,
  quranSurah113,
  quranSurah114,
];

/** Exposes reviewed Quran data as independently consumable surah sources. */
export const quranSurahSourceStream = Stream.fromIterable(quranSurahSources);
