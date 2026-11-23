"use client";

import React, { useState, useEffect } from "react";

interface OfferCountdownProps {
  initialDays?: number;
  initialHours?: number;
  initialMinutes?: number;
  initialSeconds?: number;
}

export default function OfferCountdown({
  initialDays = 4,
  initialHours = 23,
  initialMinutes = 50,
  initialSeconds = 21,
}: OfferCountdownProps) {
  const totalInitial =
    initialDays * 86400 +
    initialHours * 3600 +
    initialMinutes * 60 +
    initialSeconds;

  const [timeLeft, setTimeLeft] = useState(totalInitial);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const days = Math.floor(timeLeft / 86400);
  const hours = Math.floor((timeLeft % 86400) / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  const pad = (num: number) => num.toString().padStart(2, "0");

  if (!mounted) {
    return (
      <p className="text-[11px] sm:text-xs font-semibold text-[#8b3a62]">
        Special offer will end in:{" "}
        <span className="font-bold">
          {initialDays} days {pad(initialHours)}:{pad(initialMinutes)}:
          {pad(initialSeconds)}
        </span>
      </p>
    );
  }

  return (
    <p className="text-[11px] sm:text-xs font-semibold text-[#8b3a62]">
      Special offer will end in:{" "}
      <span className="font-bold">
        {days} days {pad(hours)}:{pad(minutes)}:{pad(seconds)}
      </span>
    </p>
  );
}
