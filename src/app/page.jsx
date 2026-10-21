import "@/components/home/home.css";
import Nav from "@/components/home/Nav";
import RevealObserver from "@/components/home/RevealObserver";
import {
  Hero, Splitsing, AltijdAan, Binnenwereld, Lessen, Bedrijven,
  Klaver, Community, Lidmaatschappen, Kennismaken, Oprichters, Footer,
} from "@/components/home/sections";

/* Volgorde van de homepage. Een sectie verplaatsen of weglaten?
   Verschuif of verwijder de regel hieronder. */
export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Splitsing />
        <AltijdAan />
        <Binnenwereld />
        <Lessen />
        <Bedrijven />
        <Klaver />
        <Community />
        <Lidmaatschappen />
        <Kennismaken />
        <Oprichters />
      </main>
      <Footer />
      <RevealObserver />
    </>
  );
}
