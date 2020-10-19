const chromaticScaleUp = new Map<string, string>(
  Object.entries({
    H: "C",
    C: "C#",
    "C#": "D",
    Db: "D",
    D: "D#",
    "D#": "E",
    Eb: "E",
    E: "F",
    F: "F#",
    "F#": "G",
    Gb: "G",
    G: "G#",
    "G#": "A",
    Ab: "A",
    A: "A#",
    "A#": "H",
    B: "H",
    h: "c",
    c: "c#",
    "c#": "d",
    db: "d",
    d: "d#",
    "d#": "e",
    eb: "e",
    e: "f",
    f: "f#",
    "f#": "g",
    gb: "g",
    g: "g#",
    "g#": "a",
    ab: "a",
    a: "a#",
    "a#": "h",
    b: "h",
  })
);
const chromaticScaleDown = new Map<string, string>(
  Object.entries({
    C: "H",
    H: "B",
    B: "A",
    "A#": "A",
    A: "Ab",
    Ab: "G",
    "G#": "G",
    G: "Gb",
    "F#": "F",
    Gb: "F",
    F: "E",
    E: "Eb",
    Eb: "D",
    "D#": "D",
    D: "Db",
    Db: "C",
    "C#": "C",
    c: "h",
    h: "b",
    b: "a",
    "a#": "a",
    a: "ab",
    ab: "g",
    "g#": "g",
    g: "gb",
    "f#": "f",
    gb: "f",
    f: "e",
    e: "eb",
    eb: "d",
    "d#": "d",
    d: "db",
    db: "c",
    "c#": "c",
  })
);

const lookup = (
  map: Map<string, string>,
  current: string,
  semitones: number
): string => {
  if (semitones === 0) {
    return current;
  }
  if (semitones > 0) {
    return lookup(map, map.get(current)!, semitones - 1);
  }
  return lookup(map, map.get(current)!, semitones + 1);
};

const separateAdditions = (chord: string): string[] => {
  if (chord.length >= 2 && (chord[1] === "#" || chord[1] === "b")) {
    return [chord.substr(0, 2), chord.substr(2)];
  }
  return [chord[0], chord.substr(1)];
};

export default function transpose(chord: string, semitones: number): string {
  if (semitones === 0) return chord;
  let lookupTable = semitones > 0 ? chromaticScaleUp : chromaticScaleDown;
  const chordLookup = (separatedChord: string[]) => {
    return [
      lookup(lookupTable, separatedChord[0], semitones),
      separatedChord[1],
    ];
  };

  if (chord.includes("/")) {
    return chord
      .split("/")
      .map((v) => chordLookup(separateAdditions(v)))
      .map((v) => v.join(""))
      .join("/");
  }

  return chordLookup(separateAdditions(chord)).join("");
}
