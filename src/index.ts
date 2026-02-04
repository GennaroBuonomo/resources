type Person = {
  readonly id: number,  // 'readonly' lo rende non modificabile
  readonly name: string,  // 'readonly' lo rende non modificabile
  birth_year: number,
  death_year?: number,  // Il '?' lo rende opzionale
  biography: string,
  image: string
};

type ActressNationality =
  | "American"
  | "British"
  | "Australian"
  | "Israeli-American"
  | "South African"
  | "French"
  | "Indian"
  | "Israeli"
  | "Spanish"
  | "South Korean"
  | "Chinese"

type Actress = Person & {
  most_famous_movies: [string, string, string],
  awards: string,
  nationality: ActressNationality
}