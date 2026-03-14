export function bordir({
  matchUtilities,
  theme,
}: {
  matchUtilities: any;
  theme: any;
}) {
  const colors = theme("colors");
  const widths = theme("bordirWidth") || { default: "2" };

  matchUtilities(
    {
      bordir: (value: any) => {
        let colorKey, widthKey;
        if (typeof value === "string" && value.includes("/")) {
          [colorKey, widthKey] = value.split("/");
        } else {
          colorKey = value;
          widthKey = "default"; // fallback
        }

        // Ambil warna dari theme
        let colorValue;
        if (typeof colorKey === "string" && colorKey.includes("-")) {
          const [color, shade] = colorKey.split("-");
          colorValue = colors[color]?.[shade];
        } else {
          colorValue = colors[colorKey]?.DEFAULT || colors[colorKey];
        }

        if (!colorValue) return {};

        const strokeWidth = widths[widthKey] || widths.default || "2.5";
        const offset = Number(strokeWidth) / 2 + 1;
        const doubleOffset = offset * 2;

        const encodedColor = encodeURIComponent(colorValue);
        const svg = `<svg stroke='${encodedColor}' stroke-width='${strokeWidth}' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><rect x='${offset}px' y='${offset}px' width='calc(100% - ${doubleOffset}px)' height='calc(100% - ${doubleOffset}px)' fill='none' rx='10' ry='10' stroke-dasharray='12,8' stroke-dashoffset='0' stroke-linecap='square'/></svg>`;

        return {
          "background-image": `url("data:image/svg+xml,${svg}")`,
          "border-radius": "10px",
        };
      },
    },
    {
      values: (() => {
        const result: any = {};
        if (!colors) return result;
        for (const [colorName, colorVal] of Object.entries(colors)) {
          if (typeof colorVal === "object" && colorVal !== null) {
            for (const [shade, hex] of Object.entries(colorVal)) {
              const key = `${colorName}-${shade}`;
              result[key] = key; // tanpa width
              for (const widthKey of Object.keys(widths)) {
                result[`${key}/${widthKey}`] = `${key}/${widthKey}`;
              }
            }
          } else {
            result[colorName] = colorName;
            if (widths) {
              for (const widthKey of Object.keys(widths)) {
                result[`${colorName}/${widthKey}`] = `${colorName}/${widthKey}`;
              }
            }
          }
        }
        return result;
      })(),
    },
  );
}
