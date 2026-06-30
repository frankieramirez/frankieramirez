const bound = new WeakSet<HTMLElement>();

export function bindPointerSpotlight(
  selector: string,
  options?: { restX?: string; restY?: string; trackAngle?: boolean },
) {
  const { restX = "50%", restY = "50%", trackAngle = false } = options ?? {};
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  document.querySelectorAll<HTMLElement>(selector).forEach((element) => {
    if (bound.has(element)) return;
    bound.add(element);

    const setPointer = (event: PointerEvent) => {
      const rect = element.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      element.style.setProperty("--pointer-x", `${x}%`);
      element.style.setProperty("--pointer-y", `${y}%`);

      if (trackAngle) {
        const px = event.clientX - rect.left - rect.width / 2;
        const py = event.clientY - rect.top - rect.height / 2;
        const angle = Math.atan2(py, px) * (180 / Math.PI) + 90;
        element.style.setProperty("--pointer-angle", `${angle}deg`);
      }
    };

    element.addEventListener("pointerenter", () => {
      element.style.setProperty("--spotlight-opacity", "1");
      element.dataset.lit = "true";
    });
    element.addEventListener("pointermove", setPointer);
    element.addEventListener("pointerleave", () => {
      element.style.setProperty("--spotlight-opacity", "0");
      element.style.setProperty("--pointer-x", restX);
      element.style.setProperty("--pointer-y", restY);
      if (trackAngle) {
        element.style.setProperty("--pointer-angle", "0deg");
      }
      delete element.dataset.lit;
    });
  });
}

export function initPointerSpotlights() {
  bindPointerSpotlight(".operating-model[data-spotlight]", {
    restX: "72%",
    restY: "18%",
  });
  bindPointerSpotlight(".ledger-row[data-spotlight]", {
    restX: "12%",
    restY: "50%",
    trackAngle: true,
  });
  bindPointerSpotlight(".judgment-item[data-spotlight]", {
    restX: "18%",
    restY: "50%",
    trackAngle: true,
  });
}