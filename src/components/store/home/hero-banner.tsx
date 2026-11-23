import React from "react";

export default function HeroBanner() {
  return (
    <section className="w-full overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/banners/woolcraft-hero.jpg"
        alt="Handmade Wool Crafts With Love"
        className="w-full h-auto object-cover block"
        loading="eager"
      />
    </section>
  );
}
